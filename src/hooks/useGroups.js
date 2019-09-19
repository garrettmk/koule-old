import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";

export const GET_GROUPS = gql`
  query getGroups {
    groups {
      id
      description
      color
    }
  }
`;

const DEFAULT_GROUPS = [];

export function useGroups() {
  const { loading, error, data } = useQuery(GET_GROUPS);
  const groups = data ? data.groups : DEFAULT_GROUPS;

  return { loading, error, groups };
}