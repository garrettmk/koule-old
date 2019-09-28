import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";

export const SET_TASK_DESCRIPTION = gql`
  mutation setTaskDescription($id: String!, $description: String) {
    update_tasks(
      where: {id: { _eq: $id}},
      _set: {description: $description}
    ) {
      returning {
        id
        description
      }
    }
  }
`;

const DEFAULT_TASK = {};
export function useSetTaskDescription(task = DEFAULT_TASK) {
  const [mutate, result] = useMutation(SET_TASK_DESCRIPTION);
  const setTaskDescription = useCallback(
    ({ id = task.id, description }) => mutate({
      variables: { id, description },
      update: updateCache,
    }),
    [mutate, task]
  );

  return { setTaskDescription, ...result };
}

export function updateCache(proxy, { data: { update_tasks } }) {
  const taskUpdate = update_tasks.returning[0];

  proxy.writeFragment({
    id: defaultDataIdFromObject(taskUpdate),
    fragment: gql`
      fragment taskDescription on tasks {
        __typename
        description
      }
    `,
    data: taskUpdate
  });
}