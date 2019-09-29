import { useState, useEffect, useCallback, useRef } from 'react';

export function useMediaQuery(queryString) {
  const mediaQueryList = useRef(window.matchMedia(queryString));
  const [isMatch, setIsMatch] = useState(mediaQueryList.matches);

  const handleChangeEvent = useCallback(
    event => setIsMatch(event.matches),
    [setIsMatch]
  );

  useEffect(
    () => {
      mediaQueryList.current.addEventListener('change', handleChangeEvent);
      return () => mediaQueryList.current.removeEventListener(handleChangeEvent);
    },
    [mediaQueryList.current, handleChangeEvent]
  );

  return isMatch;
}