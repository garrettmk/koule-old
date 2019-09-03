import React, { useState, useCallback } from 'react';
import styled, { keyframes } from "styled-components";

const doCheckLeft = keyframes`
  from { height: 0; }
  to { height: ${ props => props.size / 2 }px; }
`;

const doUnCheckLeft = keyframes`
  from { height: ${ props => props.size / 2 }px; }
  to { height: 0; }
`;

const doCheckRight = keyframes`
  from { height: 0; }
  to { height: ${ props => props.size }px; }
`;

const doUnCheckRight = keyframes`
  from { height: ${ props => props.size }px; }
  to { height: 0; }
`;

const Root = styled.div`
  position: relative;
  width: ${ props => props.size }px;
  height: ${ props => props.size }px;
  background-color: transparent;
  border-style: solid;
  border-width: ${ props => props.size / 10 }px;
  border-color ${ props => props.color || 'white' };
  border-radius: ${ props => props.theme.borderRadius }px;
  display: inline-block;;
  box-sizing: border-box;
  cursor: pointer;
  transition: opacity ease ${ props => props.theme.duration.short }ms;
  opacity: ${ props => props.checked ? 1 : 0.6 };
`;

const CheckRight = styled.div`
  position: absolute;
  top: ${ props => props.size * .8 }px;
  left: ${ props => props.size * .42 }px;
  width: ${ props => props.size * .2 }px;
  height: ${ props => props.size }px;
  transform: rotate(-135deg);
  animation-name: ${ props => props.checked ? doCheckRight : doUnCheckRight };
  animation-duration: ${ props => props.theme.duration.short / 2 }ms;
  animation-timing-function: ease-in-out;
  animation-delay: ${ props => props.checked ? props.theme.duration.short / 2 : 0 }ms;
  animation-fill-mode: both;
  background-color: ${ props => props.color || 'white' };
  display: inline-block;
  transform-origin: left top;
  border-radius: ${ props => props.theme.borderRadius }px;
  content: ' ';
`;

const CheckLeft = styled.div`
  position: absolute;
  top: ${ props => props.size * .45 }px;
  left: ${ props => props.size * .05 }px;
  width: ${ props => props.size * .2 }px;
  height: ${ props => props.size / 2 }px;
  transform: rotate(-45deg);
  animation-name: ${ props => props.checked ? doCheckLeft : doUnCheckLeft };
  animation-duration: ${ props => props.theme.duration.short / 2 }ms;
  animation-timing-function: ease-in-out;
  animation-delay: ${ props => props.checked ? 0 : props.theme.duration.short / 2 }ms;
  animation-fill-mode: both;
  background-color: ${ props => props.color || 'white' };
  display: inline-block;
  transform-origin: left top;
  border-radius: ${ props => props.theme.borderRadius }px;
  content: ' ';
`;

export default function Checkbox({ size, color, ...props }) {
  const [checked, setChecked] = useState(true);
  const onClick = useCallback(
    () => setChecked(!checked),
    [checked]
  );

  return (
    <Root {...{ size, color, checked, onClick, ...props }}>
      <CheckLeft {...{ size, color, checked }}/>
      <CheckRight {...{ size, color, checked }}/>
    </Root>
  );
}