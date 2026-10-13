import { useCallback, useRef, useState } from 'react';

export function useToast(duration = 2200) {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback(
    (text: string) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      setMessage(text);
      timer.current = setTimeout(() => setMessage(null), duration);
    },
    [duration],
  );

  return { message, show };
}
