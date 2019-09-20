import React, { Fragment, useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import TaskTime from "../TaskTime";
import TextInput from "../TextInput";
import GroupColor from "../GroupColor";
import {randomColor} from "../../utilities/color";
import TaskDuration from "../TaskDuration";

const GroupInput = styled(TextInput)`
  //grid-column: 1;
  width: 100%;
  font-size: 1.5rem;
  text-align: right;
  justify-self: right;
`;

const Time = styled(TaskTime)`
  //grid-column: 3;
  font-size: 1.5rem;
  color: ${ props => props.active ? props.theme.color.textPrimary : props.theme.color.textDisabled };
  &:hover, &:focus {
    color: ${ props => props.active ? props.theme.color.textPrimary : props.theme.color.textDisabled };
  }
`;

const Duration = styled(TaskDuration)`
  font-size: 1.5rem;
  color: ${ props => props.active ? props.theme.color.textPrimary : props.theme.color.textDisabled };
  &:hover, &:focus {
    color: ${ props => props.active ? props.theme.color.textPrimary : props.theme.color.textDisabled };
  }  
`;

const DescriptionInput = styled(TextInput)`
  //grid-column: 4;
  font-size: 1.5rem;
  color: ${ props => props.theme.color.textPrimary };
`;

export default function CurrentTaskComponent({
  groups = [],
  currentTask = {},
  onSubmit,
}) {
  const { description: currentTaskDescription, start, end } = currentTask;
  const currentGroup = groups.find(g => g.id === currentTask.group_id);
  const currentGroupDescription = currentGroup ? currentGroup.description : '';

  const [groupDescription, setGroupDescription] = useState(currentGroupDescription || '');
  const [groupColor, setGroupColor] = useState();

  const handleGroupDescriptionChange = useCallback(
    event => {
      const { value } = event.target;
      setGroupDescription(value);
      !value && setGroupColor('');
    },
    [setGroupDescription]
  );

  const handleGroupColorClick = useCallback(
    () => {
      if (groupDescription)
        setGroupColor(randomColor());
    },
    [setGroupColor, groupDescription]
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
          groupColor,
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

  const [endTime, setEndTime] = useState(new Date().toISOString());
  useEffect(
    () => {
      const id = setInterval(
        () => setEndTime(new Date().toISOString()),
        1000,
      );

      return () => clearInterval(id);
    }
  );

  return (
    <Fragment>
      <GroupInput
        value={groupDescription}
        placeholder={'Group Description'}
        onChange={handleGroupDescriptionChange}
      />
      <GroupColor
        onClick={handleGroupColorClick}
        group={{ description: groupDescription, color: groupColor }}
      />
      <Time time={start}/>
      <Duration start={start} end={endTime}/>
      <DescriptionInput
        value={taskDescription}
        placeholder={'Task description'}
        onChange={handleTaskDescriptionChange}
        onKeyDown={handleTaskDescriptionKeydown}
      />
    </Fragment>
  );
}