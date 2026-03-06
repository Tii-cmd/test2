import * as THREE from 'three';
import { createRenderer, createScene, createCamera } from './core/renderer.js';
import { createPostFX } from './core/postfx.js';
import { PhysicsSystem } from './systems/physics.js';
import { CarController } from './vehicles/carController.js';
import { EnvironmentSystem } from './systems/environmentSystem.js';
import { MapFactory } from './maps/mapFactory.js';
import { TrafficSystem } from './systems/trafficSystem.js';
import { CameraSystem } from './systems/cameraSystem.js';
import { buildUI, updateHUD } from './ui/hud.js';
import { createInput } from './utils/input.js';
import { QUALITY_PRESETS } from './config.js';
import { AudioSystem } from './audio/audioSystem.js';
import { GameModeSystem } from './systems/gameModeSystem.js';
import { WeatherSystem } from './systems/weatherSystem.js';

const app = document.getElementById('app');
buildUI(app, applySettings);

const renderer = createRenderer();
app.querySelector('#game-canvas').replaceWith(renderer.domElement);
const scene = createScene();
const camera = createCamera();
const { composer, bloom } = createPostFX(renderer, scene, camera);

const physics = new PhysicsSystem();
const input = createInput();
const clock = new THREE.Clock();

let car;
let map;
let cameraSystem;
let quality = 'High';

const env = new EnvironmentSystem(scene);
const mapFactory = new MapFactory(scene);
const traffic = new TrafficSystem(scene);
const audio = new AudioSystem();
const gameMode = new GameModeSystem();
const weather = new WeatherSystem(scene);

function applySettings(change) {
  if (change.quality && QUALITY_PRESETS[change.quality]) {
    quality = change.quality;
    const q = QUALITY_PRESETS[quality];
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, q.pixelRatio));
    renderer.shadowMap.enabled = q.shadows;
    bloom.enabled = q.bloom;
  }
  if (change.weather) env.setWeather(change.weather);
  if (change.mode) gameMode.setMode(change.mode);
  if (change.paint && car?.group?.children[0]?.material) car.group.children[0].material.color.set(change.paint);
  if (change.headlightIntensity && car) car.headlights.forEach((l) => (l.intensity = change.headlightIntensity));
  if (change.reset && car) car.reset(map.spawn);
  if (change.camera && cameraSystem) cameraSystem.cycleMode();
}

async function init() {
  await physics.init();
  physics.createGroundCollider();
  map = mapFactory.load('Modern City');
  car = new CarController(physics, scene);
  cameraSystem = new CameraSystem(camera, car);
  traffic.reset(map, QUALITY_PRESETS[quality].maxTraffic);
}

function formatTime(hour) {
  const h = Math.floor(hour % 24);
  const m = Math.floor((hour % 1) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 1 / 30);
  if (!physics.ready) return;

  if (!input.pause) {
    if (input.camera) {
      cameraSystem.cycleMode();
      input.camera = false;
    }
    if (input.reset) {
      car.reset(map.spawn);
      input.reset = false;
    }

    car.updateInput(input);
    physics.step(dt);
    car.update(dt);
    const envState = env.update(dt);
    car.setNightLights(envState.isNight);
    traffic.setNight(envState.isNight);
    traffic.update(dt, map, car.group.position);
    cameraSystem.update(dt);
    gameMode.update(dt, envState.hour);
    weather.update(dt, envState.rain, envState.wetness);

    const hudCar = car.hudData();
    audio.update({ rpm: hudCar.rpm, speedKph: hudCar.speedKph, raining: envState.rain > 0.1 });

    updateHUD({
      speed: hudCar.speedKph,
      gear: hudCar.gear,
      rpm: hudCar.rpm,
      map: map.name,
      mode: gameMode.hud().mode,
      camera: cameraSystem.mode,
      time: formatTime(envState.hour)
    });
  }

  composer.render();
}

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  composer.setSize(window.innerWidth, window.innerHeight);
});

init().then(animate);
