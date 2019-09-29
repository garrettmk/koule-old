import React from 'react';
import styled from "styled-components";
import TextInput from "../TextInput";
import { SmallText } from '../Text';

export const Root = styled.div`
  grid-column: 1;
  grid-row: ${ props => props.span ? `auto / span ${props.span}` : 'auto' };
  justify-self: stretch;
  align-self: center;
  text-align: right;
`;

export const DescriptionInput = styled(TextInput)`
  width: 100%;
  text-align: inherit;
  color: ${ props => props.theme.color.textPrimary };
`;

export const SecondaryText = styled(SmallText)`
  
`;