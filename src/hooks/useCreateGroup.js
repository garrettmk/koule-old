import React, {useCallback} from 'react';
import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";
import cuid from 'cuid';

export const CREATE_GROUP = gql`
  mutation createGroup($id: String!, $color: String, $description: String) {
    insert_groups(
      objects: {
        id: $id,
        color: $color,
        description: $description
      }
    ) {
      returning {
        id
        color
        description
      }
    }
  }
`;

export function useCreateGroup() {
  const [mutate, result] = useMutation(CREATE_GROUP);
  const createGroup = useCallback(
    ({id = cuid(), color, description}) => mutate({
      variables: {id, color, description},
    }),
    [mutate]
  );

  return {createGroup, ...result};
}