import React from 'react';
import styled from "styled-components";

const Divider = styled.hr`
  grid-column: start / end;
  border: 1px solid ${ props => props.theme.color.divider };
  width: 75%;
`;

export default Divider;