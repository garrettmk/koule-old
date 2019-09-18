import React from 'react';
import { useGroups, useCompletedTasks } from "../../hooks";
import CompletedTasksComponent from "./component";

export default function CompletedTasks() {
  const { groups } = useGroups();
  const { completedTasks } = useCompletedTasks();

  return (
    <CompletedTasksComponent
      groups={groups}
      completedTasks={completedTasks}
    />
  );
}