import styled from "styled-components";

export const ButtonFrame = styled.div`
  grid-column: start / end;
  display: flex;
  justify-content: center;
`;

export const Button = styled.button`
  background: none;
  border: none;
  padding: 0;
  font-size: ${ props => props.theme.fontSize.small };
  text-transform: uppercase;
  color: ${ props => props.theme.color.textSecondary };
  cursor: pointer;
`;
