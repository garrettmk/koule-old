import React, { useEffect, useState } from 'react';
import { getDatabase } from "../database";

export function useStream(stream, initial, deps = []) {
  const [current, setCurrent] = useState(initial);
  useEffect(
    () => {
      const subscription = stream ? stream.subscribe(setCurrent) : null;
      return () => subscription ? subscription.unsubscribe() : null;
    },
    [stream]
  );

  return current;
}

export function useQuery(collection, query, initial) {
  const [stream, setStream] = useState();
  useEffect(
    () => {
      const getQueryStream = async () => {
        const db = await getDatabase();
        const queryStream = db[collection].find(query).$;

        setStream(queryStream);
      };

      getQueryStream();
    },
    [collection, query]
  );

  return useStream(stream, initial);
}