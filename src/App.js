import React, { useLayoutEffect, useEffect } from 'react';
import styled from "styled-components";
import TasksFrame from "./components/TasksFrame";
import CurrentTask from "./containers/CurrentTask";
import CompletedTasks from "./containers/CompletedTasks";
import { useCompletedTasks} from "./hooks";
import { useMediaQuery } from "./hooks/useMediaQuery";

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
`;

export default function App() {
  // const { completedTasks } = useCompletedTasks();
  // useLayoutEffect(
  //   () => { window.scrollTo(0, document.body.scrollHeight) },
  //   [completedTasks.length]
  // );

  const isMatch = useMediaQuery('(max-width: 1000px)');
  useEffect(() => console.log(isMatch), [isMatch]);

  return (
    <Root>
      <StyledTaskFrame>
        <CompletedTasks/>
        <CurrentTask/>
      </StyledTaskFrame>
    </Root>
  );
}

