import React from 'react';
import {useGroups} from "../../hooks";
import CompletedTasksComponent from "./component";

export default function CompletedTasks({ tasks }) {
  const { groups } = useGroups();

  return (
      <CompletedTasksComponent
        groups={groups}
        completedTasks={tasks}
      />
  );
}