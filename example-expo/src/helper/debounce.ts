import { useCallback, useRef } from 'react';

export const useCreateDebounce = (wait = 400, leading = false) => {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const func = useRef<Function | null>(null);

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = null;
  };

  return (newFunction: Function, scope?: Function, args?: Array<object>) => {
    if (leading) {
      func.current = newFunction;

      if (timer.current === null) {
        func.current.apply(scope, args);
      }

      clearTimer();
      timer.current = setTimeout(() => clearTimer(), wait);
    } else {
      clearTimer();
      func.current = newFunction;

      timer.current = setTimeout(() => {
        if (func.current) {
          func.current.apply(scope, args);
        }
        clearTimer();
      }, wait);
    }
  };
};

export const useDebounceFunc = (
  func: (...args: any[]) => void,
  delay = 1000,
  leading = false,
) => {
  const debounce = useCreateDebounce(delay, leading);
  return useCallback((...args: any[]) => debounce(() => func(...args)), [debounce, func]);
};
