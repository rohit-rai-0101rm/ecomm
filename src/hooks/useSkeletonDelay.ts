import { useEffect, useState } from 'react';

export function useSkeletonDelay(duration = 600): boolean {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return loading;
}
