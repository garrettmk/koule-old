import React, {useCallback} from 'react';
import {findLast} from 'lodash';
import {
  useCompleteCurrentTask,
  useDeleteGroup,
  useGroups,
  useResetTaskStart,
  useSetGroupColor,
  useSetGroupDescription,
  useSetTaskDescription,
  useSetTaskGroup
} from "../../hooks";
import CursorComponent from "./component";
import {useCreateGroup} from "../../hooks/useCreateGroup";
import cuid from 'cuid';

// TODO: change deleteGroup into deleteEmptyGroups

export default function Cursor({
  task = {},
}) {
  const { groups } = useGroups();
  const currentGroup = task.group_id ? groups.find(g => g.id === task.group_id) : undefined;

  const { setGroupDescription } = useSetGroupDescription(currentGroup);
  const { setGroupColor } = useSetGroupColor(currentGroup);
  const { setTaskGroup } = useSetTaskGroup(task);
  const { resetTaskStart } = useResetTaskStart(task);
  const { setTaskDescription } = useSetTaskDescription(task);
  const { completeCurrentTask } = useCompleteCurrentTask(task);
  const { deleteGroup } = useDeleteGroup(currentGroup);
  const { createGroup } = useCreateGroup();

  console.log('Cursor');
  // useEffect(
  //   () => console.log('groups'),
  //   [groups]
  // );


  const onSubmit = useCallback(
    () => {
      if (!task.description || task.end)
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

  const handleUpdateGroupDescription = useCallback(
    ({ description }) => {
      if (description === currentGroup.description)
        return;

      // If a group with this description already exists, assign it to the task
      const matchingGroup = groups.find(g =>
        g.description &&
        g.description === description &&
        g.id !== currentGroup.id
      );

      if (matchingGroup)
        return setTaskGroup({ group_id: matchingGroup.id });

      // If a matching group does not exist, create a new group
      const newGroupId = cuid();
      createGroup({ id: newGroupId, description });
      setTaskGroup({ group_id: newGroupId });
    },
    [currentGroup, groups, setTaskGroup, setGroupDescription]
  );

  return (
    <CursorComponent
      groups={groups}
      task={task}
      group={currentGroup}
      onUpdateGroupColor={setGroupColor}
      onUpdateGroupDescription={handleUpdateGroupDescription}
      onResetTaskStart={resetTaskStart}
      onUpdateTaskDescription={setTaskDescription}
      onSubmit={onSubmit}
    />
  );
}