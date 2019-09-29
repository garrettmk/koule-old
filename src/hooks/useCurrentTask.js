import gql from "graphql-tag";
import { useSubscription } from "@apollo/react-hooks";

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

export const SUBSCRIBE_CURRENT_TASK = gql`
  subscription subscribeCurrentTask {
    tasks(where: {end: {_is_null: true}}) {
      id
      group_id
      start
      end
      description
    }
  }
`;

export function useCurrentTask() {
  const { loading, error, data } = useSubscription(SUBSCRIBE_CURRENT_TASK);
  const currentTask = data && data.tasks ? data.tasks[0] : undefined;

  return { loading, error, currentTask };
}