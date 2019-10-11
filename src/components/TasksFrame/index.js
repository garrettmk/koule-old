import React from 'react';
import styled from 'styled-components';

const TaskGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  
  @media (max-width: 400px) {
    grid-template-columns: [start group-color-start] 
                            auto
                            [group-color-end group-desc-start task-duration-start]
                            auto
                            [task-duration-end task-desc-start]
                            1fr
                            [task-desc-end end];
  }
  
  @media (min-width: 400px) {
    grid-template-columns: [start group-desc-start] 
                            1fr 
                            [group-desc-end group-color-start]
                            auto
                            [group-color-end task-duration-start] 
                            auto
                            [task-duration-end task-desc-start]
                            2fr
                            [task-desc-end end];
  }
  grid-auto-rows: auto;
  grid-auto-flow: dense;
  grid-row-gap: ${ props => props.theme.spacing(2) }px;
  grid-column-gap: ${ props => props.theme.spacing(4) }px;
  align-items: end;
  
  min-height: 50vh;
  width: 100%;
  margin: 0 auto ${ props => props.theme.spacing(4) }px auto;
`;

const Filler = styled.div`
  grid-column: start / end;
`;

export default function TasksFrame({ children, ...otherProps }) {
  return (
    <TaskGrid {...otherProps}>
      <Filler/>
      {children}
    </TaskGrid>
  );
}