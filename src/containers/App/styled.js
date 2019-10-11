import styled from "styled-components";
import TasksFrameComponent from "../../components/TasksFrame";

export const Root = styled.div`
  min-height: 100vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.color.background};
  background: ${ props => props.theme.color.backgroundGradient };
  font-family: ${ props => props.theme.fontFamily.default };
  font-size: ${ props => props.theme.fontSize.default };
`;

export const TaskFrame = styled(TasksFrameComponent)`
  margin: auto;
  margin-top: ${ props => props.theme.spacing(4) }px;
  margin-bottom: calc(50vh - ${ props => props.theme.spacing(4) + 2 }px);
  max-width: 900px;
`;