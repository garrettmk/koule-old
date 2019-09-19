import React, { Fragment, useMemo } from 'react';
import GroupLabel from "../GroupLabel";
import CompletedGroupColor from "../CompletedGroupColor";
import CompletedTask from "../CompletedTask";

const DEFAULT_TASKS = [];
const DEFAULT_GROUPS = [];

export default function CompletedTasksComponent({
  completedTasks = DEFAULT_TASKS,
  groups = DEFAULT_GROUPS,
}) {
  const groupIndexes = useMemo(
    () => completedTasks.reduce(
      (result, task, idx, source) => {
        if (!result.length) {
          result.push([idx, idx]);
          return result;
        }

        const lastTaskIndex = result[result.length - 1][1];
        const lastTask = source[lastTaskIndex];
        const lastGroupId = lastTask.group_id;

        if (task.group_id === lastGroupId)
          result[result.length - 1][1] = idx;
        else
          result.push([idx, idx]);

        return result;
      },
      []
    ),
    [completedTasks]
  );

  return groupIndexes
    .map(indexes => {
      const task = completedTasks[indexes[0]];
      const group = groups.find(g => g.id === task.group_id);

      return (
        <Fragment>
          <GroupLabel group={group} indexes={indexes}/>
          <CompletedGroupColor group={group} indexes={indexes}/>
        </Fragment>
      )
    })
    .concat(completedTasks.map(
      (task, idx) => (
        <CompletedTask
          index={idx + 1}
          task={task}
        />
      )
    ));
}