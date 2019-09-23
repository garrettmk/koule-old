import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useQuery } from "@apollo/react-hooks";
import { startOfDay, subDays } from 'date-fns';

const START_OF_TODAY = startOfDay(new Date()).toISOString();
// const START_OF_TODAY = subDays(new Date(), 5).toISOString();

export const GET_COMPLETED_TASKS = gql`
  query getCompletedTasks($after: timestamptz! = "${START_OF_TODAY}") {
    tasks(where: {_and: {end: {_is_null: false}, start: {_gte: $after}}}, order_by: {start: asc}) {
      id
      group_id
      start
      end
      description
    }
  }
`;

const DEFAULT_COMPLETED_TASKS = [];

export function useCompletedTasks() {
  const { loading, error, data, fetchMore, variables } = useQuery(
    GET_COMPLETED_TASKS,
    { fetchPolicy: 'cache-and-network' }
  );

  const completedTasks = data ? data.tasks : DEFAULT_COMPLETED_TASKS;
  const fetchMoreCompletedTasks = useCallback(
    () => fetchMore({
      variables: {
        after: subDays(new Date(variables.after), 1).toISOString(),
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult)
          return prev;

        return Object.assign({}, prev, {
          tasks: [...fetchMoreResult.tasks, ...prev.tasks]
        });
      }
    }),
    [fetchMore, variables]
  );

  return { loading, error, completedTasks, fetchMoreCompletedTasks };
}
