import React, { Fragment } from 'react';
import styled from "styled-components";
import { format } from 'date-fns';
import { SmallText } from "../Text";

const Label = styled(SmallText)`
  justify-self: end;
  align-self: center;
  margin: ${ props => props.theme.spacing(1) }px 0px;
`;

const Divider = styled.hr`
  grid-column: 2 / end;
  justify-self: stretch;
  align-self: center;
  margin: 0;
  border: 1px solid ${ props => props.theme.color.divider };
`;


export default function DateDivider({ date, ...otherProps}) {
  const formattedDate = format(new Date(date), 'EEEE, MMMM Lo');

  return (
    <Fragment>
      <Label {...otherProps}>
        {formattedDate}
      </Label>
      <Divider {...otherProps}/>
    </Fragment>
  );
}