import React from 'react';
import styled from "styled-components";
import Text from "../Text";

const Root = styled.div`
  grid-column: 1;
  grid-row-start: ${ props => props.indexes[0] + 2 };
  grid-row-end: ${ props => props.indexes[1] + 3 };
  align-self: stretch;
  justify-self: right;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const Label = styled(Text)`
  white-space: nowrap;
`;

export default function GroupLabel({ group, ...otherProps}) {
  return (
    <Root {...otherProps}>
      <Label>{ group ? group.title : ''}</Label>
    </Root>
  );
}