import React from "react";
import styled from "styled-components";
import Text from "../Text";

const TimeText = styled(Text)`
  min-width: 3.5rem;
  cursor: default;
  text-align: right;
  font-size: 1.2rem;
  color: ${ props => props.theme.color.textSecondary };
  transition: color ${ props => props.theme.duration.shortest }ms, background-color ${ props => props.theme.duration.shortest }ms;
  
  &:hover, &:focus {
    color: ${ props => props.theme.color.textPrimary };
  }
`;

export default function TaskTime({ time, ...props }) {
  let formattedTime = '--:--';

  if (time)
    formattedTime = new Date(time).toTimeString()
      .split(':')
      .slice(0, 2)
      .join(':');

  return (
    <TimeText {...props}>
      {formattedTime}
    </TimeText>
  );
};
