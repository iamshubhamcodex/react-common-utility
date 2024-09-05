import { useEffect, useRef, useState } from "react";

const useDebounce = (value, delay = 500, staleTime = 4000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const currentTime = useRef(Date.now());

  useEffect(() => {
    if (Date.now() - currentTime.current > staleTime) {
      setDebouncedValue(value);
      currentTime.current = Date.now();
    }
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
      currentTime.current = Date.now();
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
export default useDebounce;
