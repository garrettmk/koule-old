import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";

export const SET_GROUP_COLOR = gql`
  mutation setGroupColor($id: String!, $color: String) {
    update_groups(
      where: {id: { _eq: $id}},
      _set: {color: $color}
    ) {
      returning {
        id
        color
      }
    }
  }
`;

const DEFAULT_GROUP = {};
export function useSetGroupColor(group = DEFAULT_GROUP) {
  const [mutate, result] = useMutation(SET_GROUP_COLOR);
  const setGroupColor = useCallback(
    ({ id = group.id, color }) => mutate({
      variables: { id, color },
      update: updateCache,
    }),
    [mutate, group]
  );

  return { setGroupColor, ...result };
}

export function updateCache(proxy, { data: { update_groups } }) {
  const groupUpdate = update_groups.returning[0];

  proxy.writeFragment({
    id: defaultDataIdFromObject(groupUpdate),
    fragment: gql`
      fragment groupColor on groups {
        __typename
        color
      }
    `,
    data: groupUpdate
  });
}