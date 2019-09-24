import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import { get } from 'lodash';
import * as Styled from './styled';

const GroupDescription = forwardRef(
  ({ group, onUpdate, onSubmit, ...otherProps }, ref) => {
    const groupDescription = get(group, 'description') || '';

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
        if (key === 'Enter' && currentDescription && onSubmit)
          onSubmit({ description: currentDescription })
      },
      [currentDescription, onSubmit]
    );

    const handleFocusOut = useCallback(
      () => {
        if (onUpdate && groupDescription !== currentDescription)
          onUpdate({ description: currentDescription })
      },
      [onUpdate, currentDescription, groupDescription]
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