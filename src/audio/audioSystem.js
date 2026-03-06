export class AudioSystem {
  constructor() {
    this.enabled = true;
    this.engineVolume = 0;
    this.windVolume = 0;
    this.rainVolume = 0;
  }

  update({ rpm, speedKph, raining }) {
    this.engineVolume = Math.min(1, rpm / 7000);
    this.windVolume = Math.min(1, speedKph / 180);
    this.rainVolume = raining ? 0.65 : 0;
  }

  hud() {
    return {
      engine: this.engineVolume.toFixed(2),
      wind: this.windVolume.toFixed(2),
      rain: this.rainVolume.toFixed(2)
    };
  }
}
