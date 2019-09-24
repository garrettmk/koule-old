import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import { get } from 'lodash';
import * as Styled from './styled';

const TaskDescription = forwardRef(
  ({ task, onUpdate, onSubmit, ...otherProps }, ref) => {
    const taskDescription = get(task, 'description') || '';

    // Allow the user to edit the username and submit by hitting enter
    const [currentDescription, setCurrentDescription] = useState(taskDescription);

    useEffect(
      () => { setCurrentDescription(taskDescription) },
      [taskDescription]
    );

    const handleChange = useCallback(
      event => {
        const { value } = event.target;
        if (onUpdate || onSubmit)
          setCurrentDescription(value);
      },
      [setCurrentDescription, onUpdate, onSubmit]
    );

    const handleKeyDown = useCallback(
      event => {
        const { key } = event;
        if (key === 'Enter' && currentDescription && onSubmit) {
          event.preventDefault();
          onSubmit({ description: currentDescription })
        }
      },
      [currentDescription, onSubmit]
    );

    const handleFocusOut = useCallback(
      () => {
        if (onUpdate && taskDescription !== currentDescription)
          onUpdate({ description: currentDescription })
      },
      [onUpdate, currentDescription, taskDescription]
    );

    return (
      <Styled.DescriptionInput
        ref={ref}
        placeholder={'Task description'}
        value={currentDescription}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleFocusOut}
        {...otherProps}
      />
    );
  }
);

export default TaskDescription;