import React, { Fragment, useMemo } from 'react';
import { differenceInMinutes, isSameDay } from 'date-fns';
import { get } from 'lodash';
import DateDivider from "../../components/DateDivider";
import GroupedTasks from "../GroupedTasks";

const DEFAULT_TASKS = [];
const DEFAULT_GROUPS = [];

export default function CompletedTasksComponent({
  completedTasks = DEFAULT_TASKS,
  groups = DEFAULT_GROUPS,
}) {

  // Chunk completedTasks into consecutive groups with the same group_id
  const groupedTasks = useMemo(
    () => completedTasks.reduce(
      (result, task, idx, source) => {
        if (!result.length)
          return [[task]];

        const lastTask = source[idx - 1];
        const isSameAsLastGroup = task.group_id === lastTask.group_id;
        const isSoonEnough = differenceInMinutes(new Date(task.start), new Date(lastTask.end)) < 10;

        if (isSameAsLastGroup && isSoonEnough)
          result[result.length - 1].push(task);
        else
          result.push([task]);

        return result;
      },
      []
    ),
    [completedTasks, groups]
  );

  return groupedTasks.map((current, idx) => {
    const thisTask = current[0];
    const thisGroup = groups.find(g => g.id === current[0].group_id);
    const lastTask = get(groupedTasks[idx - 1], '[0]');
    const isNewDay = thisTask && lastTask && !isSameDay(new Date(thisTask.start), new Date(lastTask.start));
    const key = (thisGroup ? thisGroup.id : '') + thisTask.id;

    if (isNewDay)
      return (
        <Fragment key={key}>
          <DateDivider
            date={thisTask.start}
          />
          <GroupedTasks
            group={thisGroup}
            tasks={current}
          />
        </Fragment>
      );
    else
      return (
        <GroupedTasks
          key={key}
          group={thisGroup}
          tasks={current}
        />
      );
  });
}