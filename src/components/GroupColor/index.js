import React from 'react';
import styled from "styled-components";
import Text from "../Text";

const GroupColor = styled.div`
  grid-column: 2;
  grid-row-start: ${ props => props.indexes[0] + 2 };
  grid-row-end: ${ props => props.indexes[1] + 3 };
  align-self: stretch;
  width: ${ props => props.theme.spacing(1 / 2) }px;
  border-radius: ${ props => props.theme.spacing(1) }px;
  border: 2px solid ${ props => props.group.color ? props.group.color : props.theme.color.textDisabled };
  background-color: ${ props => props.group.title ? props.group.color : 'none' };
`;

export default GroupColor;