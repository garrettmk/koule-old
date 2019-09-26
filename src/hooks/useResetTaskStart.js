import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";

export const SET_RESET_TASK_START = gql`
  mutation resetTaskStart($id: String!) {
    update_tasks(
      where: {id: { _eq: $id}},
      _set: {start: "now()"}
    ) {
      returning {
        id
        start
      }
    }
  }
`;

const DEFAULT_TASK = {};
export function useResetTaskStart(task = DEFAULT_TASK) {
  const [mutate, result] = useMutation(SET_RESET_TASK_START);
  const resetTaskStart = useCallback(
    ({ id = task.id }) => mutate({
      variables: { id },
      update: updateCache,
    }),
    [mutate, task]
  );

  return { resetTaskStart, ...result };
}

export function updateCache(proxy, { data: { update_tasks } }) {
  const taskUpdate = update_tasks.returning[0];

  proxy.writeFragment({
    id: defaultDataIdFromObject(taskUpdate),
    fragment: gql`
      fragment task on tasks {
        __typename
        start
      }
    `,
    data: taskUpdate
  });
}