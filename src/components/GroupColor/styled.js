import React from 'react';
import styled from "styled-components";

export const Color = styled.div`
  grid-column: 2;
  grid-row: ${ props => props.span ? `auto / span ${props.span}` : 'auto' };
  align-self: stretch;
  width: ${ props => props.theme.spacing(1 / 2) }px;
  border-radius: ${ props => props.theme.spacing(1) }px;
  border: 2px solid ${ props => props.color || props.theme.color.textDisabled };
  background-color: ${ props => props.color || 'none' };
`;