import React, { Fragment, useState, useCallback, useEffect, useRef } from 'react';
import GroupDescription from "../../components/GroupDescription";
import GroupColor from "../../components/GroupColor";
import TaskStart from '../../components/TaskStart';
import TaskDuration from '../../components/TaskDuration';
import TaskDescription from "../../components/TaskDescription";
import Divider from "../../components/Divider";
import * as Styled from './styled';


export default function CurrentTaskComponent({
  currentTask = {},
  currentGroup = {},
  onSubmit,
  onUpdateTask,
  onUpdateGroup,
}) {
  // We need refs for each element so we can direct focus
  const groupDescriptionRef = useRef(null);
  const taskDescriptionRef = useRef(null);
  const completeButtonRef = useRef(null);

  // Allow the user to reset the task's start time
  const handleResetStart = useCallback(
    () => onUpdateTask({ start: new Date().toISOString() }),
    [onUpdateTask]
  );

  return (
    <Fragment>
      <GroupDescription
        ref={groupDescriptionRef}
        group={currentGroup}
        onSubmit={onUpdateGroup}
        size={'big'}
      />
      <GroupColor
        group={currentGroup}
        onSubmit={onUpdateGroup}
      />
      <TaskStart
        task={currentTask}
        size={'big'}
      />
      <TaskDuration
        task={currentTask}
        size={'big'}
      />
      <TaskDescription
        ref={taskDescriptionRef}
        task={currentTask}
        onSubmit={onUpdateTask}
        size={'big'}
      />
      <Divider/>
      <Styled.ButtonFrame>
        <Styled.Button onClick={handleResetStart}>
          Reset
        </Styled.Button>
        <Styled.Button
          ref={completeButtonRef}
          onClick={onSubmit}
        >
          Complete & New
        </Styled.Button>
      </Styled.ButtonFrame>
    </Fragment>
  );
}