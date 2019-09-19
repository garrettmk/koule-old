import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";

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

export function useCurrentTask() {
  const { loading, error, data } = useQuery(GET_CURRENT_TASK);
  const currentTask = data ? data.tasks[0] : undefined;

  return { loading, error, currentTask };
}