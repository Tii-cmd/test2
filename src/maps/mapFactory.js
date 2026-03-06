import * as THREE from 'three';

const MAPS = {
  'Modern City': { color: '#5f6872', roadLoops: 3, trafficDensity: 1, ambience: 'City hum' },
  Village: { color: '#78846b', roadLoops: 2, trafficDensity: 0.45, ambience: 'Birds and wind' },
  Countryside: { color: '#6d8e58', roadLoops: 2, trafficDensity: 0.35, ambience: 'Open fields' },
  Highway: { color: '#58606a', roadLoops: 1, trafficDensity: 0.8, ambience: 'Fast traffic' },
  'Mountain Road': { color: '#4f5f55', roadLoops: 2, trafficDensity: 0.28, ambience: 'Mountain wind' },
  'Coastal Road': { color: '#5a7f7f', roadLoops: 2, trafficDensity: 0.42, ambience: 'Sea breeze' }
};

export class MapFactory {
  constructor(scene) {
    this.scene = scene;
    this.active = null;
  }

  list() {
    return Object.keys(MAPS);
  }

  load(name = 'Modern City') {
    if (this.active) this.scene.remove(this.active.group);

    const data = MAPS[name];
    const group = new THREE.Group();

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(900, 900, 10, 10),
      new THREE.MeshStandardMaterial({ color: data.color, roughness: 0.95, metalness: 0.05 })
    );
    ground.receiveShadow = true;
    ground.rotation.x = -Math.PI / 2;
    group.add(ground);

    for (let i = 0; i < data.roadLoops; i += 1) {
      const road = new THREE.Mesh(
        new THREE.TorusGeometry(90 + i * 65, 7, 16, 120),
        new THREE.MeshStandardMaterial({ color: '#1f232a', roughness: 0.58, metalness: 0.18 })
      );
      road.rotation.x = -Math.PI / 2;
      road.position.y = 0.02;
      road.receiveShadow = true;
      group.add(road);
    }

    const props = new THREE.InstancedMesh(
      new THREE.CylinderGeometry(0.5, 0.8, 8),
      new THREE.MeshStandardMaterial({ color: '#3f4f34', roughness: 1 }),
      180
    );
    const dummy = new THREE.Object3D();
    for (let i = 0; i < 180; i += 1) {
      dummy.position.set((Math.random() - 0.5) * 760, 4, (Math.random() - 0.5) * 760);
      dummy.updateMatrix();
      props.setMatrixAt(i, dummy.matrix);
    }
    props.castShadow = true;
    group.add(props);

    this.active = {
      name,
      group,
      config: data,
      spawn: { x: 0, y: 2, z: 0 },
      trafficPathRadius: 90
    };
    this.scene.add(group);
    return this.active;
  }
}
