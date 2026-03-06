export function createInput() {
  const state = {
    throttle: 0,
    brake: 0,
    steer: 0,
    handbrake: false,
    pause: false,
    reset: false,
    camera: false
  };

  window.addEventListener('keydown', (e) => {
    if (e.code === 'KeyW' || e.code === 'ArrowUp') state.throttle = 1;
    if (e.code === 'KeyS' || e.code === 'ArrowDown') state.brake = 1;
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') state.steer = -1;
    if (e.code === 'KeyD' || e.code === 'ArrowRight') state.steer = 1;
    if (e.code === 'Space') state.handbrake = true;
    if (e.code === 'KeyP') state.pause = !state.pause;
    if (e.code === 'KeyR') state.reset = true;
    if (e.code === 'KeyC') state.camera = true;
  });

  window.addEventListener('keyup', (e) => {
    if (e.code === 'KeyW' || e.code === 'ArrowUp') state.throttle = 0;
    if (e.code === 'KeyS' || e.code === 'ArrowDown') state.brake = 0;
    if (e.code === 'KeyA' || e.code === 'ArrowLeft') if (state.steer < 0) state.steer = 0;
    if (e.code === 'KeyD' || e.code === 'ArrowRight') if (state.steer > 0) state.steer = 0;
    if (e.code === 'Space') state.handbrake = false;
    if (e.code === 'KeyR') state.reset = false;
    if (e.code === 'KeyC') state.camera = false;
  });

  return state;
}
