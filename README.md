# Open World Driving Prototype (Three.js + Rapier + Vite)

A browser-playable 3D driving game prototype designed for GitHub Pages deployment.

## Features

- Three.js physically based rendering (PBR-style materials, fog, dynamic lighting, tone mapping, bloom)
- Rapier 3D rigid-body physics car prototype
- Dynamic day-night cycle with sun/moon movement
- Weather presets: Clear, Cloudy, Light Rain (with wet-road roughness shift + rain particles)
- Six world themes:
  - Modern City
  - Village
  - Countryside
  - Highway
  - Mountain Road
  - Coastal Road
- Multiple drivable vehicle presets:
  - Compact City
  - Sedan
  - SUV
  - Pickup
  - Sports
  - Classic
- Driving systems:
  - Speed-based steering sensitivity
  - Acceleration/brake/handbrake behavior
  - Reset and camera switching
- Gameplay mode manager:
  - Free Drive
  - Time Trial
  - Checkpoint Challenge
  - Night Drive
  - Delivery Mission
- Camera modes:
  - Chase
  - Hood
  - Cockpit
- UI/HUD:
  - Speed, gear/RPM, map, time of day, active mode, active camera
  - Pause, settings, reset button, minimap panel
- AI traffic loop with per-map density and night headlights
- Quality presets:
  - Low / Medium / High / Ultra

---

## Folder Structure

```txt
.
├── assets/
├── public/
├── src/
│   ├── audio/
│   │   └── audioSystem.js
│   ├── core/
│   │   ├── postfx.js
│   │   └── renderer.js
│   ├── maps/
│   │   └── mapFactory.js
│   ├── systems/
│   │   ├── cameraSystem.js
│   │   ├── environmentSystem.js
│   │   ├── gameModeSystem.js
│   │   ├── physics.js
│   │   ├── trafficSystem.js
│   │   └── weatherSystem.js
│   ├── ui/
│   │   └── hud.js
│   ├── utils/
│   │   └── input.js
│   ├── vehicles/
│   │   ├── carController.js
│   │   └── vehicleData.js
│   ├── config.js
│   ├── main.js
│   └── styles.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

### Build

```bash
npm run build
npm run preview
```

---

## Controls

- `W` / `Up`: Throttle
- `S` / `Down`: Brake
- `A` / `Left`: Steer left
- `D` / `Right`: Steer right
- `Space`: Handbrake
- `C`: Cycle camera
- `R`: Reset car
- `P`: Pause simulation

---

## GitHub Pages Deployment

1. Create a GitHub repo and push this project.
2. Install deps:
   ```bash
   npm install
   ```
3. Build and deploy:
   ```bash
   npm run deploy
   ```
4. In GitHub repository settings:
   - Go to **Pages**
   - Set source to **gh-pages** branch root
5. Your game will be available at:
   - `https://<username>.github.io/<repo-name>/`

> Note: `vite.config.js` sets `base: './'` for static hosting compatibility.

---

## Technical Notes

- This prototype focuses on modular architecture and gameplay feel tuning.
- For production fidelity, replace primitive meshes with GLTF assets and compressed textures (KTX2/Basis).
- Add real minimap rendering, spline roads, lane graphs, and mission scripting on top of the current systems.
