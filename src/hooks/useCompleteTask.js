import React, { useCallback } from 'react';
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import cuid from "cuid";
import { GET_CURRENT_TASK } from "./useCurrentTask";
import { GET_COMPLETED_TASKS } from "./useCompletedTasks";

export const COMPLETE_TASK = gql`
  mutation completeWithNoGroup($description: String!, $groupId: String, $nextId: String!) {
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


export function useCompleteTask() {
  const [mutate, result] = useMutation(COMPLETE_TASK);
  const completeTask = useCallback(
    ({ description, groupId = null, nextId = cuid() }) =>
      mutate({
        variables: { description, groupId, nextId },
        optimisticResponse: {
          update_tasks: {
            __typename: 'tasks',
            returning: [
              {
                __typename: 'tasks',
                id: '',
                group_id: groupId,
                end: new Date().toISOString(),
                description,
              }
            ]
          },
          insert_tasks: {
            __typename: 'tasks',
            returning: [
              {
                __typename: 'tasks',
                id: '',
                group_id: groupId,
                start: new Date().toISOString(),
                end: null,
                description: null
              }
            ]
          }
        },
        update: (proxy, { data: { update_tasks, insert_tasks } }) => {
          const currentTaskUpdate = update_tasks.returning[0];
          const nextTask = insert_tasks.returning[0];

          const { tasks: [currentTask] } = proxy.readQuery({ query: GET_CURRENT_TASK });
          const { tasks: completedTasks } = proxy.readQuery({ query: GET_COMPLETED_TASKS });

          proxy.writeQuery({
            query: GET_COMPLETED_TASKS,
            data: { tasks: completedTasks.concat([{ ...currentTask, ...currentTaskUpdate }]) }
          });

          proxy.writeQuery({
            query: GET_CURRENT_TASK,
            data: { tasks: [nextTask] },
          });
        }
      })
    ,
    [mutate]
  );

  return { completeTask, ...result };
}

