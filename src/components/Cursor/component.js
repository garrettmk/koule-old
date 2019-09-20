import React, { Fragment, useCallback } from 'react';
import styled from 'styled-components';
import Text from "../Text";

const Button = styled.button`
  justify-self: center;
  background: none;
  border: none;
  padding: 0;
  font-size: ${ props => props.theme.fontSize.small };
  //text-decoration: underline;
  text-transform: uppercase;
  color: ${ props => props.theme.color.textSecondary };
  cursor: pointer;
`;

const Divider = styled.hr`
  grid-column: start / end;
  color: ${ props => props.theme.color.divider };
  width: 75%;
`;

export default function CursorComponent({
  onUpdate
}) {

  const handleResetStart = useCallback(
    () => onUpdate({ start: new Date().toISOString() }),
    [onUpdate],
  );

  const handleStartOrPause = useCallback(
    () => {

    }
  )

  return (
    <Fragment>
      <Divider/>
      <span/>
      <span/>
      <Button onClick={handleResetStart}>
        Reset
      </Button>

      <Button>
        End
      </Button>

      <Button style={{ justifySelf: 'start' }}>Description</Button>
    </Fragment>
  );
}