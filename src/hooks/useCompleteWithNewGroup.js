import React, { useCallback } from 'react';
import gql from "graphql-tag";
import cuid from 'cuid';
import { useMutation } from "@apollo/react-hooks";
import { GET_CURRENT_TASK } from "./useCurrentTask";
import { GET_COMPLETED_TASKS } from "./useCompletedTasks";
import { GET_GROUPS } from "./useGroups";

export const COMPLETE_WITH_NEW_GROUP = gql`
  mutation completeWithNewGroup($description: String!, $groupDescription: String!, $groupColor: String, $groupId: String!, $nextId: String!) {
    insert_groups(objects: {id: $groupId, description: $groupDescription, color: $groupColor}) {
      returning {
        id
        description
        color
      }
    }
    
    update_tasks(where: {end: {_is_null: true}}, _set: {end: "now()", description: $description, group_id: $groupId}) {
      returning {
        id
        group_id
        end
        description
      }
    }
    
    insert_tasks(objects: {id: $nextId, group_id: $groupId}) {
      returning {
        id
        group_id
        start
        end
        description
      }
    }
  }
`;

export function useCompleteWithNewGroup() {
  const [mutate, result] = useMutation(COMPLETE_WITH_NEW_GROUP);
  const completeWithNewGroup = useCallback(
    ({ description, groupDescription, groupColor, groupId = cuid(), nextId = cuid() }) =>
      mutate({
        variables: { description, groupDescription, groupColor, groupId, nextId },
        update: (proxy, { data: { insert_groups, update_tasks, insert_tasks }}) => {
          const newGroup = insert_groups.returning[0];
          const currentTaskUpdate = update_tasks.returning[0];
          const nextTask = insert_tasks.returning[0];

          const { groups } = proxy.readQuery({ query: GET_GROUPS });
          const { tasks: [currentTask] } = proxy.readQuery({ query: GET_CURRENT_TASK });
          const { tasks: completedTasks } = proxy.readQuery({ query: GET_COMPLETED_TASKS });

          proxy.writeQuery({
            query: GET_GROUPS,
            data: { groups: groups.concat([newGroup]) }
          });

          proxy.writeQuery({
            query: GET_COMPLETED_TASKS,
            data: { tasks: completedTasks.concat([{ ...currentTask, ...currentTaskUpdate }]) }
          });

          proxy.writeQuery({
            query: GET_CURRENT_TASK,
            data: { tasks: [nextTask] },
          });
        }
      }),
    [mutate]
  );

  return { completeWithNewGroup, ...result };
}
