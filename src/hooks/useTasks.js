import React, { useCallback, useRef, useState, useEffect, useMemo } from 'react';
import gql from 'graphql-tag';
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { startOfDay, endOfDay, subDays } from 'date-fns';

const START_OF_TODAY = startOfDay(new Date(0)).toISOString();
const END_OF_TODAY = endOfDay(new Date()).toISOString();

export const GET_TASKS = gql`
  query getTasks($after: timestamptz! = "${START_OF_TODAY}", $before: timestamptz! = "${END_OF_TODAY}") {
    tasks(
      where: {
        _and: [
          { start: { _gte: $after } },
          { start: { _lte: $before } },
        ]
      }, 
      order_by: { start: asc }
    ) {
      id
      group_id
      start
      end
      description
    }
  }
`;

export const SUBSCRIBE_TASKS = gql`
  subscription subscribeTasks($after: timestamptz! = "${START_OF_TODAY}", $before: timestamptz! = "${END_OF_TODAY}") {
    tasks(
      where: {
        _and: [
          { start: { _gte: $after } },
          { start: { _lte: $before } },
        ]
      },
      order_by: { start: asc }
    ) {
      id
      group_id
      start
      end
      description
    }
  }
`;

const DEFAULT_TASKS = [];


export function useTasks() {
  const [variables, setVariables] = useState({
    after: START_OF_TODAY,
    before: END_OF_TODAY,
  });

  const fetchMoreTasks = useCallback(
    () => setVariables({
      after: subDays(new Date(variables.after), 1).toISOString(),
      before: END_OF_TODAY
    }),
    [variables]
  );

  const options = useMemo(
    () => ({
      variables,
      onSubscriptionData: ({ subscriptionData }) => console.log('subscriptionData', subscriptionData)
    }),
    [variables]
  );

  const { loading, error, data } = useSubscription(SUBSCRIBE_TASKS, options);

  const tasks = data ? data.tasks : DEFAULT_TASKS;
  return { loading, error, tasks, fetchMoreTasks }
}


// export function useTasks() {
//   const options = {
//     fetchPolicy: 'cache-and-network',
//     variables: window
//   };
//   const { loading, error, data, fetchMore, variables } = useQuery(GET_TASKS, options);
//   const completedTasks = data ? data.tasks : DEFAULT_COMPLETED_TASKS;
//
//   const window = useRef({ after: START_OF_TODAY, before: END_OF_TODAY });
//   const decreaseWindow = useCallback(
//     () => {
//       window.current = {
//         after: startOfDay(subDays(new Date(window.current.after), 1)).toISOString(),
//         // before: endOfDay(subDays(new Date(window.current.before), 1)).toISOString()
//         before: END_OF_TODAY
//       };
//     },
//     []
//   );
//
//   const fetchMoreCompletedTasks = useCallback(
//     () => {
//       decreaseWindow();
//       return fetchMore({
//         variables: window.current,
//         updateQuery: (prev, { fetchMoreResult }) => {
//           if (!fetchMoreResult)
//             return prev;
//
//           return Object.assign({}, prev, {
//             tasks: [...fetchMoreResult.tasks, ...prev.tasks]
//           });
//         }
//       })
//     },
//     [data, fetchMore, variables]
//   );
//
//   return { loading, error, completedTasks, fetchMoreCompletedTasks };
// }
