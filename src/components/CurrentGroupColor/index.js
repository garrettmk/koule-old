import React from 'react';
import styled from "styled-components";

const CurrentGroupColor = styled.div`
  grid-column: 2;
  align-self: stretch;
  width: ${ props => props.theme.spacing(1 / 2) }px;
  border-radius: ${ props => props.theme.spacing(1) }px;
  border: 2px solid ${ props => props.color ? props.color : props.theme.color.textDisabled };
  background-color: ${ props => props.color ? props.color : 'none' };
  cursor: pointer;
  margin-top: ${ props => props.theme.spacing(2) }px;
`;

export default CurrentGroupColor;