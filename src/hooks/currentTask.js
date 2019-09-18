import React, { useCallback } from 'react';
import gql from "graphql-tag";
import cuid from 'cuid';
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_COMPLETED_TASKS } from "./completedTasks";
import { GET_GROUPS } from "./groups";


export const GET_CURRENT_TASK = gql`
  query getCurrentTask {
    tasks(where: {end: {_is_null: true}}, limit: 1) {
      id
      group_id
      start
      end
      description
    }
  }
`;

export const COMPLETE_TASK = gql`
  mutation completeWithNoGroup($description: String!, $groupId: String, $nextId: String!) {
    update_tasks(where: {end: {_is_null: true}}, _set: {end: "now()", description: $description, group_id: $groupId}) {
      returning {
        id
        group_id
        end
        description
      }
    }
    
    insert_tasks(objects: {id: $nextId, group_id: $groupId}) {
      returning {
        id
        group_id
        start
        end
        description
      }
    }
  }
`;

export const COMPLETE_WITH_NEW_GROUP = gql`
  mutation completeWithNewGroup($description: String!, $groupDescription: String!, $groupId: String!, $nextId: String!) {
    insert_groups(objects: {id: $groupId, description: $groupDescription}) {
      returning {
        id
        description
        color
      }
    }
    
    update_tasks(where: {end: {_is_null: true}}, _set: {end: "now()", description: $description, group_id: $groupId}) {
      returning {
        id
        group_id
        end
        description
      }
    }
    
    insert_tasks(objects: {id: $nextId, group_id: $groupId}) {
      returning {
        id
        group_id
        start
        end
        description
      }
    }
  }
`;

export function useCompleteTaskWithNewGroup() {
  const [mutate, result] = useMutation(COMPLETE_WITH_NEW_GROUP);
  const completeWithNewGroup = useCallback(
    ({ description, groupDescription, groupId = cuid(), nextId = cuid() }) =>
      mutate({
        variables: { description, groupDescription, groupId, nextId },
        update: (proxy, { data: { insert_groups, update_tasks, insert_tasks }}) => {
          const newGroup = insert_groups.returning[0];
          const currentTaskUpdate = update_tasks.returning[0];
          const nextTask = insert_tasks.returning[0];

          const { groups } = proxy.readQuery({ query: GET_GROUPS });
          const { tasks: [currentTask] } = proxy.readQuery({ query: GET_CURRENT_TASK });
          const { tasks: completedTasks } = proxy.readQuery({ query: GET_COMPLETED_TASKS });

          proxy.writeQuery({
            query: GET_GROUPS,
            data: { groups: groups.concat([newGroup]) }
          });

          proxy.writeQuery({
            query: GET_COMPLETED_TASKS,
            data: { tasks: completedTasks.concat([{ ...currentTask, ...currentTaskUpdate }]) }
          });

          proxy.writeQuery({
            query: GET_CURRENT_TASK,
            data: { tasks: [nextTask] },
          });
        }
      }),
    [mutate]
  );

  return { completeWithNewGroup, ...result };
}

export function useCompleteTask() {
  const [mutate, result] = useMutation(COMPLETE_TASK);
  const completeTask = useCallback(
    ({ description, groupId = null, nextId = cuid() }) =>
      mutate({
        variables: { description, groupId, nextId },
        optimisticResponse: {
          update_tasks: {
            __typename: 'tasks',
            returning: [
              {
                __typename: 'tasks',
                id: '',
                group_id: groupId,
                end: new Date().toISOString(),
                description,
              }
            ]
          },
          insert_tasks: {
            __typename: 'tasks',
            returning: [
              {
                __typename: 'tasks',
                id: '',
                group_id: groupId,
                start: new Date().toISOString(),
                end: null,
                description: null
              }
            ]
          }
        },
        update: (proxy, { data: { update_tasks, insert_tasks } }) => {
          const currentTaskUpdate = update_tasks.returning[0];
          const nextTask = insert_tasks.returning[0];

          const { tasks: [currentTask] } = proxy.readQuery({ query: GET_CURRENT_TASK });
          const { tasks: completedTasks } = proxy.readQuery({ query: GET_COMPLETED_TASKS });

          proxy.writeQuery({
            query: GET_COMPLETED_TASKS,
            data: { tasks: completedTasks.concat([{ ...currentTask, ...currentTaskUpdate }]) }
          });

          proxy.writeQuery({
            query: GET_CURRENT_TASK,
            data: { tasks: [nextTask] },
          });
        }
      })
    ,
    [mutate]
  );

  return { completeTask, ...result };
}

export function useCurrentTask() {
  const { loading, error, data } = useQuery(GET_CURRENT_TASK);
  const currentTask = data ? data.tasks[0] : undefined;

  return { loading, error, currentTask };
}