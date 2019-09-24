import styled from "styled-components";
import GroupDescriptionComponent from "../../components/GroupDescription";
import TaskStartComponent from "../../components/TaskStart";
import TaskDurationComponent from "../../components/TaskDuration";
import TaskDescriptionComponent from "../../components/TaskDescription";

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

export const TaskStart = styled(TaskStartComponent)`
  color: ${ props => props.theme.color.textPrimary };
`;

export const TaskDuration = styled(TaskDurationComponent)`
  color: ${ props => props.theme.color.textPrimary };
`;

export const TaskDescription = styled(TaskDescriptionComponent)`
  color: ${ props => props.theme.color.textPrimary };
`;

export const GroupDescription = styled(GroupDescriptionComponent)`
  color: ${ props => props.theme.color.textPrimary };
`;