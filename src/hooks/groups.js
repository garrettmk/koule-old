import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import cuid from 'cuid';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_CURRENT_TASK } from "./currentTask";

export const GET_GROUPS = gql`
  query getGroups {
    groups {
      id
      description
      color
    }
  }
`;

export const GET_CURRENT_GROUP = gql`
  query getCurrentGroup {
    tasks (where: {end: {_is_null: true}}, limit: 1) {
      id
      group {
        id
        description
        color
      }
    }
  }
`;

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


const DEFAULT_GROUPS = [];

export function useGroups() {
  const { loading, error, data } = useQuery(GET_GROUPS);
  const groups = data ? data.groups : DEFAULT_GROUPS;

  return { loading, error, groups };
}

export function useCurrentGroup() {
  const { loading, error, data } = useQuery(GET_CURRENT_GROUP);
  const currentGroup = data && data[0]
    ? data[0].group
    : undefined;

  return { loading, error, currentGroup };
}

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