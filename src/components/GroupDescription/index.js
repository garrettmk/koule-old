import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import { get } from 'lodash';
import * as Styled from './styled';

const GroupDescription = forwardRef(
  ({ group, onSubmit, ...otherProps }, ref) => {
    const groupDescription = get(group, 'description') || '';

    // Allow the user to edit the username and submit by hitting enter
    const [currentDescription, setCurrentDescription] = useState(groupDescription);

    useEffect(
      () => { setCurrentDescription(groupDescription) },
      [groupDescription]
    );

    const handleChange = useCallback(
      event => {
        if (onSubmit) {
          const { value } = event.target;
          setCurrentDescription(value);
        }
      },
      [setCurrentDescription]
    );

    const handleFocusOut = useCallback(
      () => {
        if (onSubmit && groupDescription !== currentDescription)
        onSubmit && onSubmit({ description: currentDescription })
      },
      [onSubmit, currentDescription, groupDescription]
    );

    return (
      <Styled.DescriptionInput
        ref={ref}
        value={currentDescription}
        onChange={handleChange}
        onBlur={handleFocusOut}
        {...otherProps}
      />
    );
  }
);

export default GroupDescription;