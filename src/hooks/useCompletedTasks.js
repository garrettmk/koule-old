import React, { useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery } from "@apollo/react-hooks";
import { daysBack } from "../utilities/dates";

export const GET_COMPLETED_TASKS = gql`
  query getCompletedTasks($after: timestamptz!) {
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

export function useCompletedTasks(days = 1) {
  const options = useMemo(
    () => ({ variables: { after: daysBack(days).toISOString() } }),
    [days]
  );

  const { loading, error, data } = useQuery(GET_COMPLETED_TASKS, options);

  const completedTasks = data ? data.tasks : DEFAULT_COMPLETED_TASKS;
  return { loading, error, completedTasks };
}