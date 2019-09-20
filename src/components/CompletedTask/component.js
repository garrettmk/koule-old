import React, { Fragment, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import TaskTime from "../TaskTime";
import TaskDuration from "../TaskDuration";
import TextInput from "../TextInput";

const Time = styled(TaskTime)`
  grid-row: ${ props => props.index + 1 };
  //grid-column: 3;
`;

const Duration = styled(TaskDuration)`
  grid-row: ${ props => props.index + 1 };
`;

const Title = styled(TextInput)`
  font-size: 1.2rem;
  color: ${ props => props.theme.color.textSecondary };
  
  grid-row: ${ props => props.index + 1 };
  //grid-column: 4;
`;

export default function CompletedTaskComponent({
  index,
  task,
  onChange,
  ...otherProps
}) {
  const { start, end, description = '' } = task;
  const [currentDescription, setCurrentDescription] = useState(description);
  useEffect(
    () => { setCurrentDescription(description); },
    [task]
  );

  const handleTitleChange = useCallback(
    event => {
      const { value } = event.target;
      setCurrentDescription(value);
    },
    [setCurrentDescription]
  );

  const handleKeyDown = useCallback(
    event => {
      const { key } = event;
      if (key === 'Enter' && currentDescription)
        onChange({
          ...task,
          description: currentDescription
        });
    },
    [currentDescription, onChange]
  );

  return (
    <Fragment>
      <Time index={index} time={start}/>
      <Duration index={index} start={start} end={end}/>
      <Title
        index={index}
        value={currentDescription}
        onChange={handleTitleChange}
        onKeyDown={handleKeyDown}
      />
    </Fragment>
  );
}