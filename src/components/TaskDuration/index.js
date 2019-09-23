import React, { useMemo, useState, useEffect } from "react";
import {differenceInMinutes, differenceInSeconds} from "date-fns";
import * as Styled from './styled';

const DEFAULT_TASK = {};

export default function TaskDuration({
  task = DEFAULT_TASK,
  ...props
}) {
  // Show the task duration counting up
  const [endTime, setEndTime] = useState(task.start || new Date().toISOString());
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

      const minutes = differenceInMinutes(leftDate, rightDate);
      const seconds = differenceInSeconds(leftDate, rightDate) - minutes * 60;

      return `${minutes}m ${seconds}s`
    },
    [task, endTime]
  );


  return (
    <Styled.Text {...props}>
      {formattedTime}
    </Styled.Text>
  );
};
