import React, {Fragment} from 'react';
import { formatDistance } from 'date-fns';
import GroupDescription from "../../components/GroupDescription";
import GroupColor from "../../components/GroupColor";
import TaskStart from "../../components/TaskStart";
import TaskDuration from "../../components/TaskDuration";
import TaskDescription from "../../components/TaskDescription";
import { useUpdateGroup, useUpdateTask } from '../../hooks';

export default function GroupedTasks({
  group,
  tasks = [],
}) {
  const { updateGroup } = useUpdateGroup(group);
  const { updateTask } = useUpdateTask();

  const secondary = tasks.length > 1
    ? formatDistance(new Date(tasks[tasks.length - 1].end), new Date(tasks[0].start))
    : '';

  return (
    <Fragment>
      <GroupDescription
        group={group}
        onSubmit={updateGroup}
        span={tasks.length}
      />
      <GroupColor
        group={group}
        onSubmit={updateGroup}
        span={tasks.length}
      />
      {tasks.map(task => (
        <Fragment key={task.id}>
          <TaskStart task={task}/>
          <TaskDuration task={task}/>
          <TaskDescription
            task={task}
            onSubmit={updates => updateTask({
              ...task,
              ...updates
            })}
          />
        </Fragment>
      ))}
    </Fragment>
  );
}