import React from 'react';
import { useCurrentTask, useUpdateTask } from "../../hooks";
import CursorComponent from "./component";

export default function Cursor() {
  const { currentTask } = useCurrentTask();
  const { updateTask } = useUpdateTask(currentTask);

  return (
    <CursorComponent
      onUpdate={updateTask}
    />
  );
}