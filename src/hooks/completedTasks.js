import gql from 'graphql-tag';
import { useQuery } from "@apollo/react-hooks";

export const GET_COMPLETED_TASKS = gql`
  query getCompletedTasks {
    tasks (where: { end: { _is_null: false } }) {
      id
      group_id
      description
      start
      end
    }
  }
`;

const DEFAULT_COMPLETED_TASKS = [];

export function useCompletedTasks() {
  const { loading, error, data } = useQuery(GET_COMPLETED_TASKS);

  const completedTasks = data ? data.tasks : DEFAULT_COMPLETED_TASKS;
  return { loading, error, completedTasks };
}