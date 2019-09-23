import React, { useState, useCallback, useEffect, forwardRef } from 'react';
import { get } from 'lodash';
import * as Styled from './styled';

const TaskDescription = forwardRef(
  ({ task, onSubmit, ...otherProps }, ref) => {
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
        onSubmit && setCurrentDescription(value);
      },
      [setCurrentDescription]
    );

    const handleFocusOut = useCallback(
      () => {
        if (onSubmit && taskDescription !== currentDescription)
          onSubmit({ description: currentDescription })
      },
      [onSubmit, currentDescription, taskDescription]
    );

    return (
      <Styled.DescriptionInput
        ref={ref}
        placeholder={'Task description'}
        value={currentDescription}
        onChange={handleChange}
        onBlur={handleFocusOut}
        {...otherProps}
      />
    );
  }
);

export default TaskDescription;