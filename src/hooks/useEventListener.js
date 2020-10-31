import { useEffect } from 'react';

export function useEventListener(type, listener) {
  useEffect(() => {
    document.addEventListener(type, listener);
    return () => document.removeEventListener(type, listener);
  }, [listener]);
}

export function useRuntimeMessageEventListener(listener) {
  useEffect(() => {
    browser.runtime.onMessage.addListener(listener);
    return () => browser.runtime.onMessage.removeListener(listener);
  }, [listener]);
}
