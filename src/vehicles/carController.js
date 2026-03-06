import * as THREE from 'three';
import { VEHICLE_PRESETS, CUSTOMIZATION_DEFAULTS } from './vehicleData.js';

export class CarController {
  constructor(physics, scene) {
    this.physics = physics;
    this.scene = scene;
    this.controls = { throttle: 0, brake: 0, steer: 0, handbrake: false };
    this.activePresetName = 'Sedan';
    this.customization = { ...CUSTOMIZATION_DEFAULTS };
    this.speedMps = 0;
    this.rpm = 900;
    this.gear = 'D';
    this.createCar();
  }

  createCar() {
    const preset = VEHICLE_PRESETS[this.activePresetName];
    const bodyDesc = this.physics.RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 2, 0).setCanSleep(false);
    this.body = this.physics.world.createRigidBody(bodyDesc);
    const collider = this.physics.RAPIER.ColliderDesc.cuboid(1, 0.4, 2).setMass(preset.mass).setFriction(1.4);
    this.physics.world.createCollider(collider, this.body);

    this.group = new THREE.Group();
    const shell = new THREE.Mesh(
      new THREE.BoxGeometry(2, 0.9, 4.2),
      new THREE.MeshStandardMaterial({ color: this.customization.paint, roughness: 0.28, metalness: 0.55 })
    );
    shell.castShadow = true;
    this.group.add(shell);

    this.headlights = [
      new THREE.SpotLight('#cde7ff', this.customization.headlightIntensity, 65, Math.PI / 8, 0.5),
      new THREE.SpotLight('#cde7ff', this.customization.headlightIntensity, 65, Math.PI / 8, 0.5)
    ];
    this.headlights[0].position.set(-0.6, 0.1, 2.1);
    this.headlights[1].position.set(0.6, 0.1, 2.1);
    this.headlights.forEach((light) => {
      light.target.position.set(light.position.x, light.position.y - 0.2, 12);
      light.visible = false;
      this.group.add(light, light.target);
    });

    this.scene.add(this.group);
  }

  setPreset(name) {
    this.activePresetName = name;
  }

  setNightLights(enabled) {
    this.headlights.forEach((l) => (l.visible = enabled));
  }

  updateInput(inputState) {
    this.controls = { ...this.controls, ...inputState };
  }

  reset(position = { x: 0, y: 2, z: 0 }) {
    this.body.setTranslation(position, true);
    this.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
    this.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
  }

  update(dt) {
    const preset = VEHICLE_PRESETS[this.activePresetName];
    const forward = this.group.getWorldDirection(new THREE.Vector3()).multiplyScalar(-1);
    const vel = this.body.linvel();
    const velocity = new THREE.Vector3(vel.x, vel.y, vel.z);
    const forwardSpeed = velocity.dot(forward);
    this.speedMps = Math.max(0, forwardSpeed);

    const throttleForce = this.controls.throttle * preset.accel * (1 - Math.min(this.speedMps / preset.maxSpeed, 1));
    const brakeForce = this.controls.brake * preset.brake;
    const driveForce = forward.clone().multiplyScalar((throttleForce - brakeForce) * preset.mass * dt * 0.75);
    this.body.applyImpulse({ x: driveForce.x, y: 0, z: driveForce.z }, true);

    const steerInfluence = THREE.MathUtils.lerp(preset.steer, preset.steer * 0.4, Math.min(this.speedMps / preset.maxSpeed, 1));
    const yawTorque = this.controls.steer * steerInfluence * (this.controls.handbrake ? 1.8 : 1) * 55 * dt;
    this.body.applyTorqueImpulse({ x: 0, y: yawTorque, z: 0 }, true);

    const drag = velocity.multiplyScalar(-0.018 * (this.controls.handbrake ? 2.8 : 1));
    this.body.applyImpulse({ x: drag.x, y: 0, z: drag.z }, true);

    this.rpm = 900 + this.speedMps * 110;
    const t = this.body.translation();
    const r = this.body.rotation();
    this.group.position.set(t.x, t.y, t.z);
    this.group.quaternion.set(r.x, r.y, r.z, r.w);
  }

  hudData() {
    return {
      speedKph: Math.round(this.speedMps * 3.6),
      gear: this.gear,
      rpm: Math.round(this.rpm),
      model: this.activePresetName
    };
  }
}
