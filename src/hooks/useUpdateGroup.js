import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";

export const UPDATE_GROUP = gql`
  mutation updateGroup($id: String!, $color: String!) {
    update_groups(where: {id: {_eq: $id}}, _set: {color: $color}) {
      returning {
        id
        color
      }
    }
  }
`;

export function useUpdateGroup(group) {
  const [mutate, result] = useMutation(UPDATE_GROUP);
  const updateGroup = useCallback(
    ({ color }) => {
      if (!group)
        return;

      return mutate({
        variables: { id: group.id, color },
        optimisticResponse: {
          update_groups: {
            __typename: 'groups',
            returning: [
              {
                __typename: 'groups',
                id: group.id,
                color,
              }
            ]
          }
        },
        update: (proxy, { data: { update_groups } }) => {
          const { color } = update_groups.returning[0];

          proxy.writeFragment({
            id: defaultDataIdFromObject(group),
            fragment: gql`
              fragment group on groups {
                color
              }
            `,
            data: { color }
          });
        }
      });
    },
    [mutate, group]
  );

  return { updateGroup, ...result };
}