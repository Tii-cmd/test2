export const VEHICLE_PRESETS = {
  'Compact City': { accel: 10, maxSpeed: 40, grip: 7, brake: 12, steer: 1.35, mass: 1180 },
  Sedan: { accel: 11, maxSpeed: 48, grip: 8, brake: 13, steer: 1.3, mass: 1380 },
  SUV: { accel: 9, maxSpeed: 42, grip: 8.5, brake: 11.5, steer: 1.15, mass: 1780 },
  Pickup: { accel: 8.5, maxSpeed: 38, grip: 8, brake: 11, steer: 1.1, mass: 1890 },
  Sports: { accel: 15, maxSpeed: 62, grip: 11, brake: 15, steer: 1.5, mass: 1320 },
  Classic: { accel: 9.8, maxSpeed: 44, grip: 7.5, brake: 10.5, steer: 1.22, mass: 1490 }
};

export const CUSTOMIZATION_DEFAULTS = {
  paint: '#2f6fff',
  wheelPreset: 'Street',
  headlightIntensity: 2,
  tirePreset: 'Balanced',
  suspensionHeight: 'Standard'
};
