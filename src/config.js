export const QUALITY_PRESETS = {
  Low: { pixelRatio: 1, shadows: false, bloom: false, fog: true, maxTraffic: 8 },
  Medium: { pixelRatio: 1.25, shadows: true, bloom: false, fog: true, maxTraffic: 16 },
  High: { pixelRatio: 1.5, shadows: true, bloom: true, fog: true, maxTraffic: 28 },
  Ultra: { pixelRatio: 2, shadows: true, bloom: true, fog: true, maxTraffic: 40 }
};

export const WEATHER_PRESETS = {
  Clear: { cloudiness: 0.1, rain: 0, wetness: 0, fogDensity: 0.0007 },
  Cloudy: { cloudiness: 0.75, rain: 0, wetness: 0.2, fogDensity: 0.0012 },
  'Light rain': { cloudiness: 0.92, rain: 0.6, wetness: 0.9, fogDensity: 0.002 }
};

export const TIME_SEGMENTS = [
  { label: 'Sunrise', hour: 6 },
  { label: 'Morning', hour: 9 },
  { label: 'Noon', hour: 12 },
  { label: 'Afternoon', hour: 16 },
  { label: 'Sunset', hour: 19 },
  { label: 'Dusk', hour: 20.5 },
  { label: 'Night', hour: 22 },
  { label: 'Late Night', hour: 2 }
];

export const GAME_MODES = ['Free Drive', 'Time Trial', 'Checkpoint Challenge', 'Night Drive', 'Delivery Mission'];
