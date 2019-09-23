import React from 'react';
import styled from "styled-components";
import TextInput from "../TextInput";

export const DescriptionInput = styled(TextInput)`
  grid-column: 1;
  grid-row: ${ props => props.span ? `auto / span ${props.span}` : 'auto' };
  text-align: right;
  justify-self: stretch;
  align-self: center;
  color: ${ props => props.theme.color.textSecondary };
`;