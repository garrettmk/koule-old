import React, { useState, useCallback, useMemo, useEffect } from 'react';
import GroupColor from "../GroupColor";
import { useUpdateGroup } from "../../hooks";
import {randomColor} from "../../utilities/color";
import { debounce } from 'lodash';

export default function CompletedGroupColor({ group, ...otherProps }) {
  const { color, description } = group || {};
  const [currentColor, setCurrentColor] = useState(color);
  useEffect(() => { setCurrentColor(color); }, [group]);

  const { updateGroup } = useUpdateGroup(group);
  const debouncedUpdateGroup = useCallback(
    debounce(updateGroup, 1000),
    [updateGroup]
  );

  const handleClick = useCallback(
    () => {
      if (description) {
        const newColor = randomColor();
        setCurrentColor(newColor);
        debouncedUpdateGroup({ color: newColor });
      }
    },
    [setCurrentColor, description]
  );

  const memoGroup = useMemo(
    () => ({
      ...group,
      color: currentColor,
    }),
    [currentColor, group]
  );

  return (
    <GroupColor
      group={memoGroup}
      onClick={handleClick}
      {...otherProps}
    />
  )
}