import { GAME_MODES } from '../config.js';

export class GameModeSystem {
  constructor() {
    this.mode = GAME_MODES[0];
    this.timeTrialRemaining = 120;
    this.checkpointsHit = 0;
    this.deliveryComplete = false;
  }

  setMode(mode) {
    if (GAME_MODES.includes(mode)) {
      this.mode = mode;
      this.timeTrialRemaining = 120;
      this.checkpointsHit = 0;
      this.deliveryComplete = false;
    }
  }

  update(dt, envHour) {
    if (this.mode === 'Time Trial') this.timeTrialRemaining = Math.max(0, this.timeTrialRemaining - dt);
    if (this.mode === 'Night Drive' && envHour < 19 && envHour > 5) this.mode = 'Free Drive';
  }

  hud() {
    return {
      mode: this.mode,
      timeTrial: Math.ceil(this.timeTrialRemaining),
      checkpoints: this.checkpointsHit,
      delivery: this.deliveryComplete ? 'Delivered' : 'In Transit'
    };
  }
}
