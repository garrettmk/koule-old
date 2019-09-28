import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";

export const SET_GROUP_DESCRIPTION = gql`
  mutation setGroupDescription($id: String!, $description: String) {
    update_groups(
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

const DEFAULT_GROUP = {};
export function useSetGroupDescription(group = DEFAULT_GROUP) {
  const [mutate, result] = useMutation(SET_GROUP_DESCRIPTION);
  const setGroupDescription = useCallback(
    ({ id = group.id, description }) => mutate({
      variables: { id, description },
      update: updateCache,
    }),
    [mutate, group]
  );

  return { setGroupDescription, ...result };
}

export function updateCache(proxy, { data: { update_groups } }) {
  const groupUpdate = update_groups.returning[0];

  proxy.writeFragment({
    id: defaultDataIdFromObject(groupUpdate),
    fragment: gql`
      fragment groupDescription on groups {
        __typename
        description
      }
    `,
    data: groupUpdate
  });
}