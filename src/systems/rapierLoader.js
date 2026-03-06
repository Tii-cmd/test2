let cached;

export async function loadRapier() {
  if (cached) return cached;
  if (!window.RAPIER) {
    await new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@dimforge/rapier3d-compat@0.14.0/rapier.js';
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }
  await window.RAPIER.init();
  cached = window.RAPIER;
  return cached;
}
