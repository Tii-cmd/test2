import { loadRapier } from './rapierLoader.js';

export class PhysicsSystem {
  constructor() {
    this.world = null;
    this.ready = false;
  }

  async init() {
    this.RAPIER = await loadRapier();
    this.world = new this.RAPIER.World({ x: 0, y: -9.81, z: 0 });
    this.ready = true;
  }

  createGroundCollider(size = 500) {
    const body = this.world.createRigidBody(this.RAPIER.RigidBodyDesc.fixed());
    const collider = this.RAPIER.ColliderDesc.cuboid(size, 0.1, size).setFriction(1.8);
    this.world.createCollider(collider, body);
  }

  step(dt) {
    if (!this.ready) return;
    this.world.timestep = dt;
    this.world.step();
  }
}
