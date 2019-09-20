import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";

export const UPDATE_TASK = gql`
  mutation updateTask(
    $id: String!, 
    $group_id: String,
    $start: timestamptz,
    $end: timestamptz,
    $description: String
  ){
    update_tasks(
      where: {id: {_eq: $id}}, 
      _set: {
        group_id: $group_id,
        start: $start,
        end: $end,
        description: $description
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

export function useUpdateTask(task) {
  const [mutate, result] = useMutation(UPDATE_TASK);
  const updateTask = useCallback(
    updates => {
      if (!task)
        return;

      const { id, group_id, start, end, description } = { ...task, ...updates };

      return mutate({
        variables: { id, group_id, start, end, description },
        update: (proxy, { data: { update_tasks } }) => {
          const taskUpdate = update_tasks.returning[0];
          const { group_id, start, end, description } = taskUpdate;

          proxy.writeFragment({
            id: defaultDataIdFromObject(task),
            fragment: gql`
              fragment task on tasks {
                group_id
                start
                end
                description
              }
            `,
            data: { group_id, start, end, description }
          });
        }
      });
    },
    [mutate, task]
  );

  return { updateTask, ...result };
}