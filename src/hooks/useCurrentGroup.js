import gql from "graphql-tag";
import {useQuery, useSubscription} from "@apollo/react-hooks";

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
export const SUBSCRIBE_CURRENT_GROUP = gql`
  subscription subscribeCurrentGroup {
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

export function useCurrentGroup() {
  const { loading, error, data } = useSubscription(SUBSCRIBE_CURRENT_GROUP);
  const currentGroup = data && data.tasks[0]
    ? data.tasks[0].group
    : undefined;

  return { loading, error, currentGroup };
}