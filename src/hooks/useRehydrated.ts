import { useEffect, useState } from 'react';
import { persistor } from '../store/store';

export function useRehydrated(): boolean {
  const [ready, setReady] = useState(persistor.getState().bootstrapped);

  useEffect(() => {
    if (persistor.getState().bootstrapped) {
      setReady(true);
      return undefined;
    }
    const unsubscribe = persistor.subscribe(() => {
      if (persistor.getState().bootstrapped) {
        setReady(true);
      }
    });
    return unsubscribe;
  }, []);

  return ready;
}
