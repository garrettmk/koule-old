import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";

export const SET_TASK_GROUP = gql`
  mutation setTaskGroup($id: String!, $group_id: String) {
    update_tasks(
      where: {id: { _eq: $id}},
      _set: {group_id: $group_id}
    ) {
      returning {
        id
        group_id
      }
    }
  }
`;

const DEFAULT_TASK = {};
export function useSetTaskGroup(task = DEFAULT_TASK) {
  const [mutate, result] = useMutation(SET_TASK_GROUP);
  const setTaskGroup = useCallback(
    ({ id = task.id, group_id }) => mutate({
      variables: { id, group_id },
      update: updateCache,
    }),
    [mutate, task]
  );

  return { setTaskGroup, ...result };
}

export function updateCache(proxy, { data: { update_tasks } }) {
  const taskUpdate = update_tasks.returning[0];

  proxy.writeFragment({
    id: defaultDataIdFromObject(taskUpdate),
    fragment: gql`
      fragment task on tasks {
        __typename
        group_id
      }
    `,
    data: taskUpdate
  });
}