import React, { Fragment, useState, useCallback, useEffect, useRef } from 'react';
import GroupColor from "../../components/GroupColor";
import Divider from "../../components/Divider";
import * as Styled from './styled';

export default function CursorComponent({
  task = {},
  group = {},
  onSubmit,
  onUpdateGroupDescription,
  onUpdateGroupColor,
  onResetTaskStart,
  onUpdateTaskDescription,
}) {
  // We need refs for each element so we can direct focus
  const groupDescriptionRef = useRef(null);
  const taskDescriptionRef = useRef(null);
  const completeButtonRef = useRef(null);

  const onSubmitGroupDescription = useCallback(
    updates => {
      // onUpdateGroupDescription(updates);
      taskDescriptionRef.current.focus();
    },
    [onUpdateGroupDescription]
  );

  const onSubmitTaskDescription = useCallback(
    updates => { onUpdateTaskDescription(updates); completeButtonRef.current.focus() },
    [onUpdateTaskDescription]
  );

  const onCompleteButtonClick = useCallback(
    () => { onSubmit(); groupDescriptionRef.current.focus() },
    [onSubmit]
  );

  return (
    <Fragment>
      <Styled.GroupDescription
        ref={groupDescriptionRef}
        group={group}
        onUpdate={onUpdateGroupDescription}
        onSubmit={onSubmitGroupDescription}
        size={'big'}
      />
      <GroupColor
        group={group}
        onSubmit={onUpdateGroupColor}
        span={1}
      />
      <Styled.TaskDuration
        task={task}
        size={'big'}
      />
      <Styled.TaskDescription
        ref={taskDescriptionRef}
        task={task}
        onUpdate={onUpdateTaskDescription}
        onSubmit={onSubmitTaskDescription}
        size={'big'}
      />
      <Divider/>
      <Styled.ButtonFrame>
        <Styled.Button
          onClick={onResetTaskStart}
          style={{ marginRight: 16 }}
        >
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