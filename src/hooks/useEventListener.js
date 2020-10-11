import React from 'react';

export function useEventListener(type, listener) {
  React.useEffect(() => {
    document.addEventListener(type, listener);
    return () => document.removeEventListener(type, listener);
  }, []);
}
