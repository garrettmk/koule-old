import React, { useCallback } from 'react';
import { findLast } from 'lodash';
import {useCurrentTask, useGroups, useCurrentGroup, useSetTaskGroup} from "../../hooks";
import { useDeleteGroup, useSetGroupDescription, useSetGroupColor, useResetTaskStart, useSetTaskDescription, useCompleteCurrentTask } from "../../hooks";
import CurrentTaskComponent from "./component";

export default function CurrentTask() {
  const { groups } = useGroups();
  const { currentTask } = useCurrentTask();
  const { currentGroup } = useCurrentGroup();
  const { setGroupDescription } = useSetGroupDescription(currentGroup);
  const { setGroupColor } = useSetGroupColor(currentGroup);
  const { setTaskGroup } = useSetTaskGroup(currentTask);
  const { resetTaskStart } = useResetTaskStart(currentTask);
  const { setTaskDescription } = useSetTaskDescription(currentTask);
  const { completeCurrentTask } = useCompleteCurrentTask(currentTask);
  const { deleteGroup } = useDeleteGroup(currentGroup);

  const onSubmit = useCallback(
    () => {
      if (!currentTask.description)
        return;

      const matchingGroup = (() => {
        const otherGroups = groups.filter(g => g.id !== currentGroup.id);
        const lastGroup = otherGroups[otherGroups.length - 1];

        if (currentGroup.description)
          return findLast(otherGroups, g => g.description === currentGroup.description);
        else if (lastGroup && !lastGroup.description)
          return lastGroup;
      })();

      if (matchingGroup) {
        setTaskGroup({ group_id: matchingGroup.id });
        completeCurrentTask({
          nextGroupDescription: matchingGroup.description,
          nextGroupColor: matchingGroup.color,
        });
        deleteGroup(currentGroup);
      } else {
        completeCurrentTask({
          nextGroupDescription: currentGroup.description,
          nextGroupColor: currentGroup.color,
        });
      }

    },
    [groups, currentGroup, setTaskGroup, completeCurrentTask]
  );

  return (
    <CurrentTaskComponent
      groups={groups}
      currentTask={currentTask}
      currentGroup={currentGroup}
      onUpdateGroupColor={setGroupColor}
      onUpdateGroupDescription={setGroupDescription}
      onResetTaskStart={resetTaskStart}
      onUpdateTaskDescription={setTaskDescription}
      onSubmit={onSubmit}
    />
  );
}