import React from "react";
import * as Styled from './styled';

const DEFAULT_TASK = {};

export default function TaskStart({
  task = DEFAULT_TASK,
  ...props
}) {
  let formattedTime = '--:--';

  if (task.start)
    formattedTime = new Date(task.start).toTimeString()
      .split(':')
      .slice(0, 2)
      .join(':');

  return (
    <Styled.Text {...props}>
      {formattedTime}
    </Styled.Text>
  );
};
