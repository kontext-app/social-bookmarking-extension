import { useEffect } from 'react';

export function useEventListener(
  type: string,
  listener: EventListenerOrEventListenerObject
): void {
  useEffect(() => {
    document.addEventListener(type, listener);
    return () => document.removeEventListener(type, listener);
  }, [listener]);
}
