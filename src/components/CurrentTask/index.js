import React, { Fragment, useCallback } from 'react';
import styled from 'styled-components';
import TaskTime from "../TaskTime";
import TextInput from '../TextInput';

const Time = styled(TaskTime)`
  grid-column: 3;
  
  margin-top: ${ props => props.theme.spacing(2) }px;
  font-size: 1.5rem;
  color: ${ props => props.active ? props.theme.color.textPrimary : props.theme.color.textDisabled };
  &:hover, &:focus {
    color: ${ props => props.active ? props.theme.color.textPrimary : props.theme.color.textDisabled };
  }
`;

const TitleInput = styled(TextInput)`
  grid-column: 4;
  
  font-size: 1.5rem;
  color: ${ props => props.theme.color.textPrimary };
`;



export default function CurrentTask({
  task,
  onChange,
  onComplete,
  ...otherProps
}) {
  const { start, title } = task;

  const handleChange = useCallback(
    event => {
      const { value } = event.target;
      onChange && onChange({
        ...task,
        start: new Date(),
        title: value,
      });
    },
    [task]
  );

  const handleKeydown = useCallback(
    event => {
      const { key } = event;
      if (key === 'Enter' && title)
        onComplete && onComplete(task);
    },
    [onComplete]
  );

  return (
    <Fragment>
      <Time
        time={start}
        active={Boolean(title)}
      />
      <TitleInput
        value={title || ''}
        placeholder={'e.g. walk the dog'}
        onChange={handleChange}
        onKeyDown={handleKeydown}
      />
    </Fragment>
  );
}