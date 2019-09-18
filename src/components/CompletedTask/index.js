import React, { Fragment, useCallback } from 'react';
import styled from 'styled-components';
import TaskTime from "../TaskTime";
import TextInput from "../TextInput";

const Time = styled(TaskTime)`
  grid-row: ${ props => props.index + 1 };
  grid-column: 3;
`;

const Title = styled(TextInput)`
  font-size: 1.2rem;
  color: ${ props => props.theme.color.textSecondary };
  
  grid-row: ${ props => props.index + 1 };
  grid-column: 4;
`;

export default function CompletedTask({
  index,
  task,
  onChange,
  ...otherProps
}) {
  const { id, start, description } = task;

  const handleChange = useCallback(
    event => {
      const { value } = event.target;
      onChange && onChange({
        ...task,
        description: value,
      });
    },
    [task]
  );

  return (
    <Fragment>
      <Time index={index} time={task.start}/>
      <Title
        index={index}
        value={description}
        onChange={handleChange}
      />
    </Fragment>
  );
}