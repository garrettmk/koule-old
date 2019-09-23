import React, { Fragment } from 'react';
import { useGroups, useCompletedTasks } from "../../hooks";
import CompletedTasksComponent from "./component";
import * as Styled from './styled';

export default function CompletedTasks() {
  const { groups } = useGroups();
  const { completedTasks, fetchMoreCompletedTasks } = useCompletedTasks();

  return (
    <Fragment>
      <Styled.LoadMoreButton onClick={fetchMoreCompletedTasks}/>
      <CompletedTasksComponent
        groups={groups}
        completedTasks={completedTasks}
      />
    </Fragment>
  );
}