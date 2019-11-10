import styled from "styled-components";
import { SmallText } from "../Text";

export const Label = styled(SmallText)`
  justify-self: end;
  align-self: center;
  margin: ${ props => props.theme.spacing(1) }px 0px;
  grid-column: group-desc-start / group-desc-end;
  
  @media (max-width: 400px) {
    flex: 0 0 auto;
    margin-right: ${ props => props.theme.spacing(1) }px;
  }
`;

export const Divider = styled.hr`
  justify-self: stretch;
  align-self: center;
  margin: 0;
  border: 1px solid ${ props => props.theme.color.divider };
  grid-column: group-color-start / end;
  
  @media (max-width: 400px) {
    flex: 1 1;
  }
`;

export const MobileRoot = styled.div`
  grid-column: start / end;
  display: flex;
`;