import styled from "styled-components";
import TextComponent from "../Text";

export const Text = styled(TextComponent)`
  grid-column: task-duration-start / task-duration-end;
  min-width: 3.5rem;
  cursor: default;
  text-align: right;
  color: ${ props => props.theme.color.textSecondary };
  transition: color ${ props => props.theme.duration.shortest }ms, background-color ${ props => props.theme.duration.shortest }ms;
  
  &:hover, &:focus {
    color: ${ props => props.theme.color.textPrimary };
  }
`;