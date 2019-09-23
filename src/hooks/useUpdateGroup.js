import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import { defaultDataIdFromObject } from "apollo-cache-inmemory";

export const UPDATE_GROUP = gql`
  mutation updateGroup(
    $id: String!, 
    $description: String!
    $color: String
  ){
    update_groups(
      where: {id: {_eq: $id}}, 
      _set: {
        description: $description,
        color: $color
      }) {
      returning {
        id
        description
        color
      }
    }
  }
`;

export function useUpdateGroup(group) {
  const [mutate, result] = useMutation(UPDATE_GROUP);
  const updateGroup = useCallback(
    updates => {
      if (!group)
        return;

      const { id, description, color } = { ...group, ...updates };

      return mutate({
        variables: { id, description, color },
        update: (proxy, { data: { update_groups } }) => {
          const groupUpdate = update_groups.returning[0];
          const { description, color } = groupUpdate;

          proxy.writeFragment({
            id: defaultDataIdFromObject(group),
            fragment: gql`
              fragment group on groups {
                __typename
                description
                color
              }
            `,
            data: { description, color, __typename: 'groups' }
          });
        }
      });
    },
    [mutate, group]
  );

  return { updateGroup, ...result };
}