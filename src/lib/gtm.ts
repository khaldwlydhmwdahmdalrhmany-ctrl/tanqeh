type GtmEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: GtmEvent[];
  }
}

const containerId = import.meta.env.VITE_GTM_ID?.trim();

export function initializeGtm() {
  if (!containerId || document.getElementById(`gtm-script-${containerId}`)) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    'gtm.start': Date.now(),
    event: 'gtm.js',
  });

  const script = document.createElement('script');
  script.id = `gtm-script-${containerId}`;
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(containerId)}`;
  document.head.appendChild(script);
}

export function pushGtmEvent(event: string, parameters: GtmEvent = {}) {
  if (!containerId) {
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...parameters });
}
