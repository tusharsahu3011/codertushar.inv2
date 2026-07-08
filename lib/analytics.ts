export const GA_MEASUREMENT_ID = "G-QE3RZQ9D89";

declare global {
  interface Window {
    gtag?: (
      command: "event",
      action: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export function trackEvent(
  event: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  window.gtag?.("event", event, params);
}