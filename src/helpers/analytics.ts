/**
 * Thin wrapper around @quiet-ly/analytics.
 * Provides a backwards-compatible singleton API so existing
 * component imports (`Analytics.event`, `Analytics.pageview`) continue to
 * work without changes.
 */
import { Analytics as QuietlyAnalytics } from "@quiet-ly/analytics";

const endpoint = import.meta.env.VITE_QUIET_LY_ENDPOINT ?? "";
const appId = import.meta.env.VITE_QUIET_LY_APP_ID ?? "portfolio";
const url = typeof window !== "undefined" ? window.location.hostname : "";
const localHosts = "localhost";
const analyticsDisabled = localHosts.includes(url);

export const _analyticsInstance = new QuietlyAnalytics({
  endpoint,
  appId,
});

type EventParams = Record<string, unknown>;

export const Analytics = {
  /** Track a custom event */
  event(name: string, params: EventParams = {}) {
    if (analyticsDisabled) return;
    _analyticsInstance.track(name, params);
  },

  /** Track a custom event */
  track(name: string, params: EventParams = {}) {
    if (analyticsDisabled) return;
    _analyticsInstance.track(name, params);
  },

  /** Track a page view (called from App-level route handler) */
  pageview(path?: string) {
    if (analyticsDisabled) return;
    _analyticsInstance.pageview(path ?? window.location.pathname);
  },

  start() {
    if (analyticsDisabled) return;
    _analyticsInstance.start?.();
  },

  stop() {
    _analyticsInstance.stop?.();
  },
};
