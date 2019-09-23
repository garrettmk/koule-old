import React, { useCallback } from 'react';
import { useCurrentTask, useGroups, useCurrentGroup } from "../../hooks";
import { useUpdateTask, useUpdateGroup, useCompleteCurrentTask } from "../../hooks";
import CurrentTaskComponent from "./component";

export default function CurrentTask() {
  const { groups } = useGroups();
  const { currentTask } = useCurrentTask();
  const { currentGroup } = useCurrentGroup();
  const { updateTask } = useUpdateTask(currentTask);
  const { updateGroup } = useUpdateGroup(currentGroup);
  const { completeCurrentTask } = useCompleteCurrentTask();

  const onSubmit = useCallback(
    () => {
      if (!currentTask.description)
        return;

      const matchingGroup = groups.find(g =>
        g.description === currentGroup.description &&
        g.id !== currentGroup.id
      );

      if (matchingGroup) {
        updateTask({ group_id: matchingGroup.id });
        completeCurrentTask({
          nextGroupDescription: matchingGroup.description,
          nextGroupColor: matchingGroup.color,
        });
      } else {
        completeCurrentTask({
          nextGroupDescription: currentGroup.description,
          nextGroupColor: currentGroup.color,
        });
      }

    },
    [groups, currentGroup, updateTask, completeCurrentTask]
  );

  return (
    <CurrentTaskComponent
      groups={groups}
      currentTask={currentTask}
      currentGroup={currentGroup}
      onUpdateTask={updateTask}
      onUpdateGroup={updateGroup}
      onSubmit={onSubmit}
    />
  );
}