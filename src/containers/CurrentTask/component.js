import React, { Fragment, useState, useCallback, useEffect, useRef } from 'react';
import GroupColor from "../../components/GroupColor";
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

  const onSubmitGroup = useCallback(
    updates => { onUpdateGroup(updates); taskDescriptionRef.current.focus(); },
    [onUpdateGroup]
  );

  const onSubmitTask = useCallback(
    updates => { onUpdateTask(updates); completeButtonRef.current.focus() },
    [onUpdateTask]
  );

  const onCompleteButtonClick = useCallback(
    () => { onSubmit(); groupDescriptionRef.current.focus() },
    [onSubmit]
  );

  return (
    <Fragment>
      <Styled.GroupDescription
        ref={groupDescriptionRef}
        group={currentGroup}
        onUpdate={onUpdateGroup}
        onSubmit={onSubmitGroup}
        size={'big'}
      />
      <GroupColor
        group={currentGroup}
        onSubmit={onUpdateGroup}
      />
      <Styled.TaskStart
        task={currentTask}
        size={'big'}
      />
      <Styled.TaskDuration
        task={currentTask}
        size={'big'}
      />
      <Styled.TaskDescription
        ref={taskDescriptionRef}
        task={currentTask}
        onUpdate={onUpdateTask}
        onSubmit={onSubmitTask}
        size={'big'}
      />
      <Divider/>
      <Styled.ButtonFrame>
        <Styled.Button onClick={handleResetStart}>
          Reset
        </Styled.Button>
        <Styled.Button
          ref={completeButtonRef}
          onClick={onCompleteButtonClick}
        >
          Complete & New
        </Styled.Button>
      </Styled.ButtonFrame>
    </Fragment>
  );
}