import React, { useLayoutEffect, useState, useCallback, useEffect } from 'react';
import {useTasks} from "../../hooks";
import CompletedTasks from "../CompletedTasks";
import Cursor from "../Cursor";
import * as Styled from './styled';

export const AppContext = React.createContext({});

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

  const focusTask = useCallback(
    task => {
      const taskIndex = tasks.findIndex(t => t.id === task.id);
      setCurrentIndex(taskIndex);
    },
    [tasks, setCurrentIndex]
  );

  return (
    <AppContext.Provider value={{ focusTask }}>
      <Styled.Root onKeyDown={handleKeyDown}>
        <Styled.TaskFrame>
          <CompletedTasks tasks={tasksBeforeCursor}/>
          <Cursor task={currentTask}/>
          <CompletedTasks tasks={tasksAfterCursor}/>
        </Styled.TaskFrame>
      </Styled.Root>
    </AppContext.Provider>
  );
}