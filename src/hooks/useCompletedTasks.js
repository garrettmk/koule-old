import React, { useMemo } from 'react';
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

export const GET_ALL_COMPLETED_TASKS = gql`
  query getAllCompletedTasks {
    tasks(where: {end: {_is_null: false}}, order_by: {start: asc}) {
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
  const { loading, error, data } = useQuery(GET_COMPLETED_TASKS);

  const completedTasks = data ? data.tasks : DEFAULT_COMPLETED_TASKS;
  return { loading, error, completedTasks };
}
