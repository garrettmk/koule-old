import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce, get } from "lodash";
import * as Styled from './styled';
import { randomColor } from "../../utilities/color";

export default function GroupColor({
  group,
  onSubmit,
  ...otherProps
}) {
  const description = get(group, 'description');
  const color = get(group, 'color');

  // Allow the user to change the color by clicking
  const [currentColor, setCurrentColor] = useState(color);

  useEffect(
    () => { setCurrentColor(color) },
    [group]
  );

  const debouncedOnSubmit = useMemo(
    () => onSubmit ? debounce(onSubmit, 1000) : onSubmit,
    [onSubmit]
  );

  const handleClick = useCallback(
    () => {
      if (description) {
        const newColor = randomColor();
        setCurrentColor(newColor);
        debouncedOnSubmit && debouncedOnSubmit({ color: newColor });
      }
    },
    [group]
  );

  return (
    <Styled.Color
      color={description ? currentColor : ''}
      onClick={handleClick}
      {...otherProps}
    />
  );
}