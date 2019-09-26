import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import { get } from 'lodash';
import * as Styled from './styled';

const GroupDescription = forwardRef(
  ({ group, onUpdate, onSubmit, ...otherProps }, ref) => {
    const groupDescription = get(group, 'description') || '';
    const groupColor = get(group, 'color', null);

    // Allow the user to edit the username and submit by hitting enter
    const [currentDescription, setCurrentDescription] = useState(groupDescription);

    useEffect(
      () => { setCurrentDescription(groupDescription) },
      [groupDescription]
    );

    const handleChange = useCallback(
      event => {
        if (onUpdate || onSubmit) {
          const { value } = event.target;
          setCurrentDescription(value);
        }
      },
      [setCurrentDescription, onUpdate, onSubmit]
    );

    const handleKeyDown = useCallback(
      event => {
        const { key } = event;
        if (key === 'Enter' && onSubmit)
          onSubmit({ id: group.id, description: currentDescription });
      },
      [currentDescription, onSubmit, groupColor]
    );

    const handleFocusOut = useCallback(
      () => {
        if (onUpdate && groupDescription !== currentDescription)
          onUpdate({ id: group.id, description: currentDescription });
      },
      [onUpdate, currentDescription, groupDescription, groupColor]
    );

    return (
      <Styled.DescriptionInput
        ref={ref}
        value={currentDescription}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleFocusOut}
        {...otherProps}
      />
    );
  }
);

export default GroupDescription;