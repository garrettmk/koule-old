import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce, get } from "lodash";
import * as Styled from './styled';
import { randomColor } from "../../utilities/color";

export default function GroupColor({
  group,
  onSubmit,
  ...otherProps
}) {
  // Allow the user to change the color by clicking
  const [currentColor, setCurrentColor] = useState(get(group, 'color'));

  useEffect(
    () => { setCurrentColor(get(group, 'color')) },
    [group]
  );

  const debouncedOnSubmit = useMemo(
    () => onSubmit ? debounce(onSubmit, 1000) : onSubmit,
    [onSubmit]
  );

  const handleClick = useCallback(
    () => {
      if (group.description) {
        const newColor = randomColor();
        setCurrentColor(newColor);
        debouncedOnSubmit && debouncedOnSubmit({ color: newColor });
      }
    },
    [group]
  );

  return (
    <Styled.Color
      color={currentColor}
      onClick={handleClick}
      {...otherProps}
    />
  );
}