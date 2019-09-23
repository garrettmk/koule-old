import styled from "styled-components";

const Text = styled.span`
  font-family: ${ props => props.theme.fontFamily.default };
  font-size: ${ props => props.size ? props.theme.fontSize[props.size] : props.theme.fontSize.default };
  color: ${ props => props.color ? props.theme.color[props.color] : 'inherit' };
  margin: 0;
`;

export default Text;

export const HeroText = styled.p`
  font-family: ${ props => props.theme.fontFamily.default };
  font-size: ${({ theme }) => theme.fontSize.hero };
  color: ${({ theme }) => theme.color.textPrimary };
  margin: 0;
`;

export const BigText = styled.p`
  font-family: ${ props => props.theme.fontFamily.default };
  font-size: ${({ theme }) => theme.fontSize.big };
  color: ${({ theme }) => theme.color.textPrimary };
  margin: 0;
`;

export const SmallText = styled.p`
  font-family: ${ props => props.theme.fontFamily.default };
  font-size: ${({ theme }) => theme.fontSize.small };
  color: ${({ theme }) => theme.color.textSecondary };
  margin: 0;
`;