import styled from "styled-components";

const TextInput = styled.input`
  display: block;
  font-family: inherit;
  font-size: ${ props => props.size ? props.theme.fontSize[props.size] : 'inherit' };
  color: ${ props => props.theme.color.textPrimary };
  margin: 0;
  border: none;
  border-radius: ${ props => props.theme.borderRadius }px;
  background-color: transparent;
  padding: 0;
  transition: color ${ props => props.theme.duration.shortest }ms, background-color ${ props => props.theme.duration.shortest }ms;
  
  &:hover, &:focus {
    color: ${ props => props.theme.color.textPrimary };
  }
  
  &:placeholder-shown {
    color: ${ props => props.theme.color.textDisabled };
    transition: none;
  }
`;

export default TextInput;