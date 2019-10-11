import React, {useLayoutEffect, useState, useCallback, useEffect} from 'react';
import styled from "styled-components";
import TasksFrame from "./components/TasksFrame";
import Cursor from "./containers/Cursor";
import CompletedTasks from "./containers/CompletedTasks";
import {useTasks} from "./hooks";

const Root = styled.div`
  min-height: 100vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.color.background};
  background: ${ props => props.theme.color.backgroundGradient };
  font-family: ${ props => props.theme.fontFamily.default };
  font-size: ${ props => props.theme.fontSize.default };
`;

const StyledTaskFrame = styled(TasksFrame)`
  margin: auto;
  margin-top: ${ props => props.theme.spacing(4) }px;
  margin-bottom: calc(50vh - ${ props => props.theme.spacing(4) + 2 }px);
  max-width: 900px;
`;

export default function App() {
  const { tasks } = useTasks();

  // Keep the window scrolled to the bottom if new tasks are added
  useLayoutEffect(
    () => { window.scrollTo(0, document.body.scrollHeight) },
    [tasks.length]
  );

  // Select the selected task with the arrow keys
  const [currentIndex, setCurrentIndex] = useState(tasks.length - 1);
  const handleKeyDown = useCallback(
    event => {
      const { key } = event;

      if (key === 'ArrowUp')
        setCurrentIndex(Math.max(0, currentIndex - 1));
      else if (key === 'ArrowDown')
        setCurrentIndex(Math.min(tasks.length - 1, currentIndex + 1));
    },
    [currentIndex, tasks]
  );

  useEffect(
    () => setCurrentIndex(tasks.length - 1),
    [tasks && tasks.length]
  );

  const tasksBeforeCursor = tasks.slice(0, currentIndex);
  const currentTask = tasks[currentIndex];
  const tasksAfterCursor = tasks.slice(currentIndex + 1, tasks.length);

  return (
    <Root onKeyDown={handleKeyDown}>
      <StyledTaskFrame>
        <CompletedTasks tasks={tasksBeforeCursor}/>
        <Cursor task={currentTask}/>
        <CompletedTasks tasks={tasksAfterCursor}/>
      </StyledTaskFrame>
    </Root>
  );
}

