import * as THREE from 'three';

export class CameraSystem {
  constructor(camera, car) {
    this.camera = camera;
    this.car = car;
    this.mode = 'Chase';
    this.modes = ['Chase', 'Hood', 'Cockpit'];
  }

  cycleMode() {
    const idx = this.modes.indexOf(this.mode);
    this.mode = this.modes[(idx + 1) % this.modes.length];
  }

  update(dt) {
    const target = this.car.group;
    const back = new THREE.Vector3(0, 3.2, -8);
    const hood = new THREE.Vector3(0, 1.3, 2.2);
    const cockpit = new THREE.Vector3(0, 1.15, 0.25);
    const offset = this.mode === 'Chase' ? back : this.mode === 'Hood' ? hood : cockpit;

    const desired = target.localToWorld(offset.clone());
    this.camera.position.lerp(desired, 1 - Math.exp(-dt * 8));

    const lookTarget = target.localToWorld(new THREE.Vector3(0, 1.1, this.mode === 'Chase' ? 6 : 15));
    this.camera.lookAt(lookTarget);
  }
}
