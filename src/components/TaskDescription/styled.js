import React from 'react';
import styled from "styled-components";
import TextInput from "../TextInput";

export const DescriptionInput = styled(TextInput)`
  justify-self: stretch;
  align-self: center;
  color: ${ props => props.theme.color.textSecondary };
`;