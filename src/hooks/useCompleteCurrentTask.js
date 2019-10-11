import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import cuid from 'cuid';
import { useMutation } from "@apollo/react-hooks";
import { GET_GROUPS } from "./useGroups";
import { GET_CURRENT_TASK } from "./useCurrentTask";
import { GET_CURRENT_GROUP } from "./useCurrentGroup";
import { GET_TASKS } from "./useTasks";
import {defaultDataIdFromObject} from "apollo-cache-inmemory";

export const COMPLETE_CURRENT_TASK = gql`
  mutation completeCurrentTask(
    $id: String!,
    $nextId: String!,
    $nextGroupDescription: String,
    $nextGroupColor: String
  ) {
    update_tasks(
      where: { id: { _eq: $id } },
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
      }
    }
  }
`;

export function useCompleteCurrentTask(task) {
  const [mutate, result] = useMutation(COMPLETE_CURRENT_TASK, {
    onError: error => console.log(error),
  });
  const completeCurrentTask = useCallback(
    ({ id = task.id, nextGroupDescription, nextGroupColor, nextId = cuid() } = {}) =>
      mutate({
        variables: { id, nextGroupDescription, nextGroupColor, nextId },
        // update: (proxy, { data: { update_tasks, insert_tasks } }) => {
        //   const taskUpdate = update_tasks.returning[0];
        //   const newTask = insert_tasks.returning[0];
        //   const newGroup = {
        //     __typename: 'groups',
        //     id: nextId,
        //     description: nextGroupDescription,
        //     color: nextGroupColor
        //   };
        //
        //   // Add the new group
        //   const { groups } = proxy.readQuery({ query: GET_GROUPS });
        //   proxy.writeQuery({
        //     query: GET_GROUPS,
        //     data: { groups: groups.concat([newGroup]) }
        //   });
        //
        //   proxy.writeQuery({
        //     query: GET_CURRENT_GROUP,
        //     data: {
        //       tasks: {
        //         __typename: 'tasks',
        //         id: newTask.id,
        //         group: newGroup
        //       }
        //     }
        //   });
        //
        //   // Add the new task
        //   proxy.writeQuery({
        //     query: GET_CURRENT_TASK,
        //     data: { tasks: [newTask] }
        //   });
        //
        //   // Update the current task and add it to completedTasks
        //   const currentTask = proxy.readFragment({
        //     id: defaultDataIdFromObject(task),
        //     fragment: gql`
        //       fragment currentTask on tasks {
        //         __typename
        //         id
        //         group_id
        //         start
        //         end
        //         description
        //       }
        //     `,
        //   });
        //
        //   const { tasks: completedTasks } = proxy.readQuery({ query: GET_TASKS });
        //   proxy.writeQuery({
        //     query: GET_TASKS,
        //     data: { tasks: completedTasks.concat([{ ...currentTask, ...taskUpdate }]) }
        //   });
        // }
      }),
    [mutate, task]
  );

  return { completeCurrentTask, ...result };
}