import { RefObject, useEffect } from 'react';

type OnClickOutsideCallback = () => void;

const useOnClickOutside = <T extends HTMLElement | null = HTMLElement>(
  ref: RefObject<T> | RefObject<T>[],
  callback: OnClickOutsideCallback,
): void => {
  useEffect(() => {
    const abortController = new AbortController();
    const refs = Array.isArray(ref) ? ref : [ref];

    const handleClick = (event: DocumentEventMap['click' | 'touchend']) => {
      const target = event.target;
      if (!(target instanceof Node) || !target.isConnected) {
        return;
      }

      const isOutside = refs.filter(Boolean).every((currentRef) => {
        return currentRef.current && !currentRef.current.contains(target);
      });

      if (isOutside) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, {
      signal: abortController.signal,
    });

    document.addEventListener('touchend', handleClick, {
      signal: abortController.signal,
    });

    return () => abortController.abort();
  }, [callback, ref]);
};

export default useOnClickOutside;
