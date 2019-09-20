import React from "react";
import styled from "styled-components";
import Text from "../Text";
import {differenceInMinutes, differenceInSeconds} from "date-fns";

const DurationText = styled(Text)`
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

function formatDistance(left, right) {
  const leftDate = new Date(left);
  const rightDate = new Date(right);

  const minutes = differenceInMinutes(leftDate, rightDate);
  const seconds = differenceInSeconds(leftDate, rightDate) - minutes * 60;

  return `${minutes}m ${seconds}s`
}

export default function TaskDuration({ start, end, ...props }) {
  const formattedTime = start && end
    ? formatDistance(end, start)
    : '--:--';

  return (
    <DurationText {...props}>
      {formattedTime}
    </DurationText>
  );
};
