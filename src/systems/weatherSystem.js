import * as THREE from 'three';

export class WeatherSystem {
  constructor(scene) {
    this.scene = scene;
    this.rainParticles = new THREE.Points(
      new THREE.BufferGeometry(),
      new THREE.PointsMaterial({ color: '#a7c7ff', size: 0.12, transparent: true, opacity: 0.7 })
    );
    const count = 1500;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 320;
      positions[i * 3 + 1] = Math.random() * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 320;
    }
    this.rainParticles.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.rainParticles.visible = false;
    scene.add(this.rainParticles);
  }

  update(dt, rainAmount, wetness) {
    this.rainParticles.visible = rainAmount > 0.01;
    const mat = this.rainParticles.material;
    mat.opacity = rainAmount;

    const pos = this.rainParticles.geometry.attributes.position;
    for (let i = 0; i < pos.count; i += 1) {
      pos.array[i * 3 + 1] -= dt * (15 + rainAmount * 30);
      if (pos.array[i * 3 + 1] < 0) pos.array[i * 3 + 1] = 95;
    }
    pos.needsUpdate = true;

    this.scene.traverse((obj) => {
      if (obj.isMesh && obj.material?.isMeshStandardMaterial) {
        obj.material.roughness = THREE.MathUtils.lerp(obj.material.roughness, 1 - wetness * 0.65, 0.03);
      }
    });
  }
}
