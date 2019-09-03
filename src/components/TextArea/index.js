import React, { useCallback, useLayoutEffect, useRef } from 'react';
import styled from "styled-components";

const TextAreaInput = styled.textarea`
  display: inline;
  vertical-align: bottom;
  white-space: normal;
  font-family: inherit;
  font-size: inherit;
  color: ${ props => props.theme.color.textPrimary };
  background-color: transparent;
  border: none;
  resize: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`;

export default function TextArea(props) {
  const inputRef = useRef(null);
  useLayoutEffect(
    () => { console.log('scrollHeight ', inputRef.current.innerHeight) },
    [inputRef.current]
  );

  const handleInputChange = useCallback(
    event => {
      const { target } = event;

      target.style.height = 'inherit';
      const { height } = target.getBoundingClientRect();
      const { scrollHeight } = target;

      target.style.height = scrollHeight + 'px';
    },
    []
  );

  return (
    <TextAreaInput ref={inputRef} onInput={handleInputChange} rows={1} {...props} />
  )
}