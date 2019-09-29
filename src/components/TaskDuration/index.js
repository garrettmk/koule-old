import React, { useMemo, useState, useEffect } from "react";
import {differenceInHours, differenceInMinutes, differenceInSeconds} from "date-fns";
import * as Styled from './styled';

const DEFAULT_TASK = {};

export default function TaskDuration({
  task = DEFAULT_TASK,
  ...props
}) {
  // Show the task duration counting up
  const [endTime, setEndTime] = useState(task.end || new Date().toISOString());
  useEffect(
    () => {
      if (!task.end) {
        const id = setInterval(
          () => setEndTime(new Date().toISOString()),
          1000,
        );

        return () => clearInterval(id);
      } else {
        setEndTime(task.end);
      }
    },
    [task]
  );

  const formattedTime = useMemo(
    () => {
      if (!task.start)
        return '--:--';

      const leftDate = new Date(endTime);
      const rightDate = new Date(task.start);

      const elapsed = new Date(leftDate - rightDate).toISOString().substr(11, 8);
      const trimmedElapsed = elapsed.replace(/^(00:0|00:|0)/, '');

      return trimmedElapsed;
    },
    [task, endTime]
  );


  return (
    <Styled.Text {...props}>
      {formattedTime}
    </Styled.Text>
  );
};
