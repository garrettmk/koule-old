import React, {Fragment} from 'react';
import { formatDistance } from 'date-fns';
import GroupDescription from "../../components/GroupDescription";
import GroupColor from "../../components/GroupColor";
import TaskStart from "../../components/TaskStart";
import TaskDuration from "../../components/TaskDuration";
import TaskDescription from "../../components/TaskDescription";
import { useSetGroupDescription, useSetGroupColor, useSetTaskDescription } from '../../hooks';
import { SmallText } from "../../components/Text";

export default function GroupedTasks({
  group,
  tasks = [],
}) {
  const { setGroupDescription } = useSetGroupDescription(group);
  const { setGroupColor } = useSetGroupColor(group);
  const { setTaskDescription } = useSetTaskDescription();

  const secondary = tasks.length > 1
    ? formatDistance(new Date(tasks[tasks.length - 1].end), new Date(tasks[0].start))
    : '';

  return (
    <Fragment>
      <GroupDescription
        group={group}
        onUpdate={setGroupDescription}
        onSubmit={setGroupDescription}
        span={tasks.length}
        secondaryText={secondary}
      />
      <GroupColor
        group={group}
        onSubmit={setGroupColor}
        span={tasks.length}
      />
      {tasks.map(task => (
        <Fragment key={task.id}>
          {/*<TaskStart*/}
          {/*  task={task}*/}
          {/*  size={'medium'}*/}
          {/*/>*/}
          <TaskDuration
            task={task}
            size={'medium'}
          />
          <TaskDescription
            task={task}
            size={'medium'}
            onUpdate={updates => setTaskDescription({ ...task, ...updates })}
            onSubmit={updates => setTaskDescription({ ...task, ...updates })}
          />
        </Fragment>
      ))}
    </Fragment>
  );
}