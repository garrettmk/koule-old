import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import cuid from 'cuid';
import { useMutation } from "@apollo/react-hooks";
import { GET_CURRENT_TASK } from "./useCurrentTask";
import { GET_GROUPS } from "./useGroups";


export const CREATE_CURRENT_GROUP = gql`
  mutation createCurrentGroup ($id: String!, $description: String!) {
    insert_groups(objects: {id: $id, description: $description, user_id: "garrett" }) {
      returning {
        id
        description
      }
    }
    
    update_tasks(where: {end: {_is_null: true}}, _set: {group_id: $id}) {
      returning {
        id
        group_id
      }
    }
  }
`;

export function useCreateCurrentGroup() {
  const [mutate, result] = useMutation(CREATE_CURRENT_GROUP);
  const createCurrentGroup = useCallback(
    ({ id = cuid(), description }) => mutate({
      variables: { id, description },
      optimisticResponse: {
        insert_groups: {
          __typename: 'groups',
          returning: [
            {
              __typename: 'groups',
              id,
              description,
            }
          ]
        },
        update_tasks: {
          __typename: 'tasks',
          returning: [
            {
              __typename: 'tasks',
              group_id: id
            }
          ]
        }
      },
      update: (cache, { data: { insert_groups, update_tasks }}) => {
        const newCurrentGroup = insert_groups.returning[0];
        const currentTaskUpdate = update_tasks.returning[0];

        const { groups } = cache.readQuery({ query: GET_GROUPS });
        cache.writeQuery({
          query: GET_GROUPS,
          data: { groups: groups.concat([newCurrentGroup]) }
        });

        console.log('here');
        const { tasks: [currentTask] } = cache.readQuery({ query: GET_CURRENT_TASK });

        if (currentTask)
          cache.writeQuery({
            query: GET_CURRENT_TASK,
            data: { tasks: [{ ...currentTask, ...currentTaskUpdate }] },
          });
      }
    }),
    [mutate]
  );

  return { createCurrentGroup, ...result };
}