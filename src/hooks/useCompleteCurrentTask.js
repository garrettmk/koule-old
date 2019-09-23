import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import cuid from 'cuid';
import { useMutation } from "@apollo/react-hooks";
import { GET_GROUPS } from "./useGroups";
import { GET_CURRENT_TASK } from "./useCurrentTask";
import { GET_CURRENT_GROUP } from "./useCurrentGroup";
import { GET_COMPLETED_TASKS } from "./useCompletedTasks";

export const COMPLETE_CURRENT_TASK = gql`
  mutation completeCurrentTask(
    $nextId: String!,
    $nextGroupDescription: String,
    $nextGroupColor: String
  ) {
    update_tasks(
      where: { end: { _is_null: true } },
      _set: { end: "now()" }
    ) {
      returning {
        id
        end
      }
    }
    
    insert_tasks(
      objects: { 
        id: $nextId,
        group: {
          data: {
            id: $nextId,
            description: $nextGroupDescription,
            color: $nextGroupColor,
          }
        }
      }
    ) {
      returning {
        id
        group_id
        start
        end
        description
        group {
          id
          description
          color
        }
      }
    }
  }
`;

export function useCompleteCurrentTask() {
  const [mutate, result] = useMutation(COMPLETE_CURRENT_TASK);
  const completeCurrentTask = useCallback(
    ({ nextGroupDescription, nextGroupColor, nextId = cuid() } = {}) =>
      mutate({
        variables: { nextGroupDescription, nextGroupColor, nextId },
        update: (proxy, { data: { update_tasks, insert_tasks } }) => {
          const taskUpdate = update_tasks.returning[0];
          const newTask = insert_tasks.returning[0];
          const newGroup = newTask.group;

          const { groups } = proxy.readQuery({ query: GET_GROUPS });
          proxy.writeQuery({
            query: GET_GROUPS,
            data: { groups: groups.concat([newGroup]) }
          });

          const { tasks: [currentTask] } = proxy.readQuery({ query: GET_CURRENT_TASK })
          const { tasks: completedTasks } = proxy.readQuery({ query: GET_COMPLETED_TASKS });
          proxy.writeQuery({
            query: GET_COMPLETED_TASKS,
            data: { tasks: completedTasks.concat([{ ...currentTask, ...taskUpdate }]) }
          });

          proxy.writeQuery({
            query: GET_CURRENT_TASK,
            data: { tasks: [newTask] }
          });
        }
      }),
    [mutate]
  );

  return { completeCurrentTask, ...result };
}