import React from 'react';
import styled from "styled-components";
import { format } from 'date-fns';
import Text from "../Text";

const Root = styled.div`
  position: relative;
  grid-column: start / end;
  justify-self: center;
  width: 75%;
  border-top: 1px solid ${ props => props.theme.color.divider };
`;

const Label = styled(Text)`
  position: absolute;
  top: ${ props => props.theme.spacing(1) }px;
  left: 0;
`;

export default function DateDivider({ date, ...otherProps }) {
  const formattedDate = format(new Date(date), 'EEEE, MMMM Lo');

  return (
    <Root {...otherProps}>
      <Label size={'small'} color={'textSecondary'}>{formattedDate}</Label>
    </Root>
  )
}