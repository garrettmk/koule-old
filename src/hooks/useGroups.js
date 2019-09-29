import { useEffect } from 'react';
import gql from "graphql-tag";
import {useQuery, useSubscription} from "@apollo/react-hooks";

export const GET_GROUPS = gql`
  query getGroups {
    groups {
      id
      description
      color
    }
  }
`;

export const SUBSCRIBE_GROUPS = gql`
  subscription subscribeGroups {
    groups {
      id
      description
      color
    }
  }
`;

const DEFAULT_GROUPS = [];

export function useGroups() {
  const { loading, error, data } = useSubscription(SUBSCRIBE_GROUPS);

  // useEffect(
  //   () => subscribeToMore && subscribeToMore({
  //     document: SUBSCRIBE_GROUPS,
  //     updateQuery: (prev, { subscriptionData }) => {
  //       if (!subscriptionData.data) return prev;
  //       const { newCurrentTask } = subscriptionData;
  //       return {
  //         ...prev,
  //         groups: [...prev, newCurrentTask]
  //       };
  //     }
  //   }),
  //   [subscribeToMore]
  // );

  const groups = data ? data.groups : DEFAULT_GROUPS;
  return { loading, error, groups };
}