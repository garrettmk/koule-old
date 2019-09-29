import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";
import { GET_GROUPS } from "./useGroups";

export const DELETE_GROUP = gql`
  mutation deleteGroup($id: String!) {
    delete_groups(
      where: {id: { _eq: $id}},
    ) {
      returning {
        id
      }
    }
  }
`;

const DEFAULT_GROUP = {};
export function useDeleteGroup(group = DEFAULT_GROUP) {
  const [mutate, result] = useMutation(DELETE_GROUP);
  const deleteGroup = useCallback(
    ({ id = group.id }) => mutate({
      variables: { id },
      // update: updateCache,
    }),
    [mutate, group]
  );

  return { deleteGroup, ...result };
}

export function updateCache(proxy, { data: { delete_groups } }) {
  const deletedGroup = delete_groups.returning[0];
  if (!deletedGroup)
    return;


  const { groups } = proxy.readQuery({ query: GET_GROUPS });
  proxy.writeQuery({
    query: GET_GROUPS,
    data: { groups: groups.filter(g => g.id !== deletedGroup.id) }
  });
}