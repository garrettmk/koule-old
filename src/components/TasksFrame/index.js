import React from 'react';
import styled from 'styled-components';

const TaskGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr auto auto 2fr;
  grid-auto-rows: auto;
  grid-row-gap: ${ props => props.theme.spacing(2) }px;
  grid-column-gap: ${ props => props.theme.spacing(4) }px;
  align-items: end;
  
  min-height: 50vh;
  width: 100%;
  margin: 0 auto ${ props => props.theme.spacing(4) }px auto;
`;

export default TaskGrid;