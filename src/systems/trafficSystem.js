import * as THREE from 'three';

export class TrafficSystem {
  constructor(scene) {
    this.scene = scene;
    this.cars = [];
    this.group = new THREE.Group();
    scene.add(this.group);
  }

  reset(map, maxCars) {
    this.group.clear();
    this.cars = [];
    const count = Math.floor(maxCars * map.config.trafficDensity);

    for (let i = 0; i < count; i += 1) {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1.6, 0.8, 3.4),
        new THREE.MeshStandardMaterial({ color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5), metalness: 0.5, roughness: 0.35 })
      );
      mesh.castShadow = true;
      const angle = (i / count) * Math.PI * 2;
      this.cars.push({ mesh, angle, speed: 0.12 + Math.random() * 0.12, laneOffset: (Math.random() - 0.5) * 5 });
      this.group.add(mesh);
    }
  }

  setNight(enabled) {
    this.group.children.forEach((m) => {
      if (!m.userData.light) {
        const point = new THREE.PointLight('#d4e6ff', 0.7, 12);
        point.position.set(0, 0.2, 1.8);
        m.add(point);
        m.userData.light = point;
      }
      m.userData.light.visible = enabled;
    });
  }

  update(dt, map, playerPos) {
    const radius = map.trafficPathRadius;
    for (const car of this.cars) {
      car.angle += car.speed * dt;
      const x = Math.cos(car.angle) * (radius + car.laneOffset);
      const z = Math.sin(car.angle) * (radius + car.laneOffset);
      const nextX = Math.cos(car.angle + 0.02) * (radius + car.laneOffset);
      const nextZ = Math.sin(car.angle + 0.02) * (radius + car.laneOffset);
      const avoid = new THREE.Vector3(x, 0, z).distanceTo(playerPos) < 7 ? -0.06 : 0;
      car.angle += avoid * dt;
      car.mesh.position.set(x, 0.6, z);
      car.mesh.lookAt(nextX, 0.6, nextZ);
    }
  }
}
