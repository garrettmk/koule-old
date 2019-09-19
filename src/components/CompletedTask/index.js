import React from 'react';
import { useUpdateTask } from "../../hooks";
import CompletedTaskComponent from "./component";

export default function CompletedTask({ task, ...otherProps }) {
  const { updateTask } = useUpdateTask(task);

  return (
    <CompletedTaskComponent
      task={task}
      onChange={updateTask}
      {...otherProps}
    />
  );
}