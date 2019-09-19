import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";

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

export function useCurrentGroup() {
  const { loading, error, data } = useQuery(GET_CURRENT_GROUP);
  const currentGroup = data && data[0]
    ? data[0].group
    : undefined;

  return { loading, error, currentGroup };
}