import React from 'react';
import styled from "styled-components";

const Divider = styled.hr`
  grid-column: start / end;
  width: 100%;
  border: 1px solid ${ props => props.theme.color.divider };
`;

export default Divider;