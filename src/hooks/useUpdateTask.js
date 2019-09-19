import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";

export const UPDATE_TASK = gql`
  mutation updateTask($id: String!, $description: String!){
    update_tasks(where: {id: {_eq: $id}}, _set: {description: $description}) {
      returning {
        id
        description
      }
    }
  }
`;

export function useUpdateTask(task) {
  const [mutate, result] = useMutation(UPDATE_TASK);
  const updateTask = useCallback(
    ({ description }) => {
      if (!task)
        return;

      return mutate({
        variables: { id: task.id, description },
        update: (proxy, { data: { update_tasks } }) => {
          const taskUpdate = update_tasks.returning[0];
          const { description } = taskUpdate;

          proxy.writeFragment({
            id: defaultDataIdFromObject(task),
            fragment: gql`
              fragment task on tasks {
                description
              }
            `,
            data: { description }
          });
        }
      });
    },
    [mutate, task]
  );

  return { updateTask, ...result };
}