import React from 'react';
import styled from "styled-components";
import TextInput from "../TextInput";
import { SmallText } from '../Text';

export const Root = styled.div`
  grid-column: group-desc-start / group-desc-end;
  
  @media (min-width: 400px) {
    grid-row: ${ props => props.span ? `auto / span ${props.span}` : 'auto' };
    text-align: right;
  }
  justify-self: stretch;
  align-self: center;
`;

export const DescriptionInput = styled(TextInput)`
  width: 100%;
  color: ${ props => props.theme.color.textPrimary };
  text-align: inherit;
`;

export const SecondaryText = styled(SmallText)`
  
`;