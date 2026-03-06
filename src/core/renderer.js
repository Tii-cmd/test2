import * as THREE from 'three';

export function createRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer;
}

export function createScene() {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#7cb3ff');
  scene.fog = new THREE.FogExp2('#7cb3ff', 0.001);
  return scene;
}

export function createCamera() {
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2500);
  camera.position.set(0, 5, -10);
  return camera;
}
