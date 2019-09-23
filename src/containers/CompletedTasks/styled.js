import styled from "styled-components";

export const LoadMoreButton = styled.button`
  grid-column: start / end;
  justify-self: center;
  background: none;
  border: none;
  padding: ${ props => props.theme.spacing(2) }px;
  font-size: ${ props => props.theme.fontSize.small };
  text-transform: uppercase;
  color: ${ props => props.theme.color.textSecondary };
  cursor: pointer;
  &:after {
    content: "Load more...";
  }
`;