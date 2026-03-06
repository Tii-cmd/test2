import * as THREE from 'three';
import { WEATHER_PRESETS } from '../config.js';

export class EnvironmentSystem {
  constructor(scene) {
    this.scene = scene;
    this.time = 9;
    this.weather = 'Clear';
    this.daySpeed = 0.5;

    this.sun = new THREE.DirectionalLight('#fff3dd', 2.2);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(2048, 2048);
    this.sun.shadow.camera.left = -120;
    this.sun.shadow.camera.right = 120;
    this.sun.shadow.camera.top = 120;
    this.sun.shadow.camera.bottom = -120;

    this.moon = new THREE.DirectionalLight('#9ab3ff', 0.12);
    this.ambient = new THREE.AmbientLight('#9bb6df', 0.35);
    this.hemi = new THREE.HemisphereLight('#8bc3ff', '#2f3a4a', 0.4);

    scene.add(this.sun, this.moon, this.ambient, this.hemi);
  }

  setWeather(name) {
    if (WEATHER_PRESETS[name]) this.weather = name;
  }

  setTime(hour) {
    this.time = (hour + 24) % 24;
  }

  update(dt) {
    this.time = (this.time + dt * this.daySpeed) % 24;
    const angle = ((this.time / 24) * Math.PI * 2) - Math.PI / 2;
    const sunHeight = Math.sin(angle);

    this.sun.position.set(Math.cos(angle) * 200, sunHeight * 180, Math.sin(angle) * 200);
    this.moon.position.copy(this.sun.position).multiplyScalar(-1);

    this.sun.intensity = THREE.MathUtils.clamp(sunHeight * 2.4, 0, 2.4);
    this.moon.intensity = THREE.MathUtils.clamp(-sunHeight * 0.25, 0, 0.3);

    const skyNight = new THREE.Color('#0a1024');
    const skyDay = new THREE.Color('#7cb3ff');
    this.scene.background = skyNight.clone().lerp(skyDay, THREE.MathUtils.clamp(sunHeight * 1.2, 0, 1));

    const weatherData = WEATHER_PRESETS[this.weather];
    const fogColor = this.scene.background.clone().multiplyScalar(0.85);
    this.scene.fog.color.copy(fogColor);
    this.scene.fog.density = weatherData.fogDensity + weatherData.cloudiness * 0.0006;

    const night = sunHeight < -0.1;
    return { hour: this.time, isNight: night, wetness: weatherData.wetness, rain: weatherData.rain };
  }
}
