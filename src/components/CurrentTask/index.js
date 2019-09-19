import React, { useCallback } from 'react';
import { useCurrentTask, useGroups } from "../../hooks";
import { useCompleteTask, useCompleteWithNewGroup } from "../../hooks";
import CurrentTaskComponent from "./component";

export default function CurrentTask() {
  const { groups } = useGroups();
  const { currentTask } = useCurrentTask();
  const { completeTask } = useCompleteTask();
  const { completeWithNewGroup } = useCompleteWithNewGroup();

  const handleSubmit = useCallback(
    ({ groupDescription, groupColor, taskDescription }) => {
      const group = groups.find(g => g.description === groupDescription);

      if (groupDescription && !group)
        completeWithNewGroup({
          description: taskDescription,
          groupDescription,
          groupColor,
        });
      else
        completeTask({
          description: taskDescription,
          groupId: group ? group.id : null,
        });
    },
    [groups, completeWithNewGroup, completeTask]
  );

  return (
    <CurrentTaskComponent
      groups={groups}
      currentTask={currentTask}
      onSubmit={handleSubmit}
    />
  );
}