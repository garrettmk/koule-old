import React, { Fragment, useCallback } from 'react';
import styled from 'styled-components';
import Text from "../Text";
import Divider from "../Divider";

const ButtonFrame = styled.div`
  grid-column: start / end;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: ${ props => props.theme.fontSize.small };
  text-transform: uppercase;
  color: ${ props => props.theme.color.textSecondary };
  cursor: pointer;
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
      <ButtonFrame>
        <Button onClick={handleResetStart}>
          Reset
        </Button>

        <Button>
          End
        </Button>

        <Button style={{ justifySelf: 'start' }}>Description</Button>
      </ButtonFrame>
    </Fragment>
  );
}