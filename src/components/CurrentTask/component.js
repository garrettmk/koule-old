import React, { Fragment, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import TaskTime from "../TaskTime";
import TextInput from "../TextInput";
import GroupColor from "../GroupColor";

const GroupInput = styled(TextInput)`
  grid-column: 1;
  width: 100%;
  font-size: 1.5rem;
  text-align: right;
  justify-self: right;
`;

const Time = styled(TaskTime)`
  grid-column: 3;
  
  margin-top: ${ props => props.theme.spacing(2) }px;
  font-size: 1.5rem;
  color: ${ props => props.active ? props.theme.color.textPrimary : props.theme.color.textDisabled };
  &:hover, &:focus {
    color: ${ props => props.active ? props.theme.color.textPrimary : props.theme.color.textDisabled };
  }
`;

const DescriptionInput = styled(TextInput)`
  grid-column: 4;
  font-size: 1.5rem;
  color: ${ props => props.theme.color.textPrimary };
`;

export default function CurrentTaskComponent({
  groups = [],
  currentTask = {},
  onSubmit,
}) {
  const { description: currentTaskDescription } = currentTask;
  const currentGroup = groups.find(g => g.id === currentTask.group_id);
  const currentGroupDescription = currentGroup ? currentGroup.description : '';

  const [groupDescription, setGroupDescription] = useState(currentGroupDescription || '');
  const handleGroupDescriptionChange = useCallback(
    event => {
      const { value } = event.target;
      setGroupDescription(value);
    },
    [setGroupDescription]
  );

  const [taskDescription, setTaskDescription] = useState(currentTaskDescription || '');
  const handleTaskDescriptionChange = useCallback(
    event => {
      const { value } = event.target;
      setTaskDescription(value);
    },
    [setTaskDescription]
  );

  const handleTaskDescriptionKeydown = useCallback(
    event => {
      const { key } = event;

      if (key === 'Enter' && taskDescription)
        onSubmit({
          groupDescription,
          taskDescription
        });
    },
    [groupDescription, taskDescription]
  );

  useEffect(
    () => {
      setTaskDescription(currentTaskDescription || '');
      setGroupDescription(currentGroupDescription || '');
    },
    [currentTask]
  );

  return (
    <Fragment>
      <GroupInput
        value={groupDescription}
        placeholder={'Group Description'}
        onChange={handleGroupDescriptionChange}
      />
      <GroupColor/>
      <Time/>
      <DescriptionInput
        value={taskDescription}
        placeholder={'Task description'}
        onChange={handleTaskDescriptionChange}
        onKeyDown={handleTaskDescriptionKeydown}
      />
    </Fragment>
  );
}