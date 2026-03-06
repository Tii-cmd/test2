import { GAME_MODES, QUALITY_PRESETS, WEATHER_PRESETS } from '../config.js';

export function buildUI(root, onSettings) {
  root.innerHTML = `
    <canvas id="game-canvas"></canvas>
    <div id="hud">
      <div class="panel"><strong>Speed</strong><span id="speed">0 km/h</span></div>
      <div class="panel"><strong>Gear</strong><span id="gear">D</span></div>
      <div class="panel"><strong>Map</strong><span id="map">Modern City</span></div>
      <div class="panel"><strong>Time</strong><span id="time">09:00</span></div>
      <div class="panel"><strong>Mode</strong><span id="mode">Free Drive</span></div>
      <div class="panel"><strong>Camera</strong><span id="camera">Chase</span></div>
    </div>
    <div id="minimap">MINIMAP</div>
    <div id="menu">
      <button id="btn-reset">Reset Car (R)</button>
      <button id="btn-camera">Switch Camera (C)</button>
      <button id="btn-settings">Settings</button>
    </div>
    <div id="settings" class="hidden">
      <h3>Settings</h3>
      <label>Quality <select id="quality">${Object.keys(QUALITY_PRESETS).map((q) => `<option>${q}</option>`).join('')}</select></label>
      <label>Weather <select id="weather">${Object.keys(WEATHER_PRESETS).map((q) => `<option>${q}</option>`).join('')}</select></label>
      <label>Mode <select id="modeSelect">${GAME_MODES.map((m) => `<option>${m}</option>`).join('')}</select></label>
      <label>Paint <input id="paint" type="color" value="#2f6fff"></label>
      <label>Headlight Intensity <input id="headlights" type="range" min="0.2" max="4" step="0.1" value="2"></label>
      <button id="close-settings">Close</button>
    </div>
  `;

  document.getElementById('btn-settings').onclick = () => document.getElementById('settings').classList.remove('hidden');
  document.getElementById('close-settings').onclick = () => document.getElementById('settings').classList.add('hidden');
  document.getElementById('btn-reset').onclick = () => onSettings({ reset: true });
  document.getElementById('btn-camera').onclick = () => onSettings({ camera: true });
  ['quality', 'weather', 'modeSelect', 'paint', 'headlights'].forEach((id) => {
    document.getElementById(id).addEventListener('change', () => {
      onSettings({
        quality: document.getElementById('quality').value,
        weather: document.getElementById('weather').value,
        mode: document.getElementById('modeSelect').value,
        paint: document.getElementById('paint').value,
        headlightIntensity: Number(document.getElementById('headlights').value)
      });
    });
  });
}

export function updateHUD(data) {
  document.getElementById('speed').textContent = `${data.speed} km/h`;
  document.getElementById('gear').textContent = `${data.gear} / ${data.rpm} RPM`;
  document.getElementById('map').textContent = data.map;
  document.getElementById('mode').textContent = data.mode;
  document.getElementById('camera').textContent = data.camera;
  document.getElementById('time').textContent = data.time;
}
