import React, { Fragment } from 'react';
import styled from "styled-components";
import { format } from 'date-fns';
import { SmallText } from "../Text";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import * as Styled from './styled';

const Label = styled(SmallText)`
  justify-self: end;
  align-self: center;
  margin: ${ props => props.theme.spacing(1) }px 0px;
  
  @media (min-width: 400px) {
    grid-column: group-desc-start / group-desc-end;
  }
`;

const Divider = styled.hr`
  justify-self: stretch;
  align-self: center;
  margin: 0;
  border: 1px solid ${ props => props.theme.color.divider };
  
  @media (min-width: 400px) {
    grid-column: group-color-start / end;
  }
`;


export default function DateDivider({ date, ...otherProps}) {
  const formattedDate = format(new Date(date), 'EEEE, MMMM Lo');
  const isMobile = useMediaQuery('(max-width: 400px)');

  if (isMobile)
    return (
      <Styled.MobileRoot {...otherProps}>
        <Label>
          {formattedDate}
        </Label>
        <Divider/>
      </Styled.MobileRoot>
    );

  return (
    <Fragment>
      <Label {...otherProps}>
        {formattedDate}
      </Label>
      <Divider {...otherProps}/>
    </Fragment>
  );
}