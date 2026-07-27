/**
 * Google Tag Manager helper.
 *
 * IMPORTANT: The GTM container itself is loaded by the OFFICIAL static snippet
 * placed directly inside index.html (<head> + <noscript> in <body>).
 * We deliberately do NOT inject <script> tags at runtime from JavaScript,
 * because dynamic script injection is one of the strongest heuristics used by
 * Google Ads / Safe Browsing automated scanners to classify a site as
 * "compromised" or "injecting unknown scripts".
 *
 * This file only pushes events into the existing dataLayer.
 */

type GtmEvent = Record<string, unknown>;

declare global {
  interface Window {
    dataLayer?: GtmEvent[];
  }
}

export function pushGtmEvent(event: string, parameters: GtmEvent = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...parameters });
}
