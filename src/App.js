import React, { Fragment, useState, useReducer, useCallback, useEffect, useLayoutEffect } from 'react';
import styled from "styled-components";
import { ArrowDropDown } from 'styled-icons/material';
import TaskGrid from "./components/TasksFrame";
import CompletedTask from "./components/CompletedTask";
import CurrentTask from "./components/CurrentTask";
import appReducer, { initialState } from "./reducer";
import GroupLabel from "./components/GroupLabel";
import GroupColor from './components/GroupColor';
import TextInput from "./components/TextInput";
import TextAreaInput from "./components/TextArea";
import CurrentGroupColor from "./components/CurrentGroupColor";
import {addTask as addTaskToDb} from "./database";
import { useQuery } from "./hooks/useQuery";

const Root = styled.div`
  min-height: 100vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.color.background};
  background: ${ props => props.theme.color.backgroundGradient };
  font-family: ${ props => props.theme.fontFamily.default };
  font-size: ${ props => props.theme.fontSize.default };
`;

const TasksFrame = styled(TaskGrid)`
  min-height: 50vh;
  width: 100%;
  margin: 0 auto ${ props => props.theme.spacing(4) }px auto;
`;

const CurrentGroupInput = styled(TextInput)`
  grid-column: 1;
  font-size: 1.5rem;
  text-align: right;
  justify-self: right;
`;


const Divider = styled.hr`
  color: ${ props => props.theme.color.divider };
  width: 75%;
  margin: 0 auto calc(50vh - ${ props => props.theme.spacing(4) + 2 }px) auto;
`;

const randomColor = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);

  return `rgba(${red}, ${green}, ${blue}, 1)`
};

export default function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const { tasks, groups } = state;

  const completedTasks = tasks.slice(0, tasks.length - 1);
  const currentTask = tasks[tasks.length - 1];

  const [currentGroupColor, setCurrentGroupColor] = useState();
  const handleCurrentGroupColorClick = useCallback(
    () => { setCurrentGroupColor(randomColor()) },
    [setCurrentGroupColor]
  );

  const [currentGroupTitle, setCurrentGroupTitle] = useState('');
  const handleCurrentGroupTitleChange = useCallback(
    event => {
      const { value } = event.target;
      setCurrentGroupTitle(value);

      const group = groups.find(g => g.title === value);
      if (group)
        setCurrentGroupColor(group.color);

      if (!value)
        setCurrentGroupColor(null);
    },
    [setCurrentGroupTitle]
  );

  const groupIndexes = completedTasks.reduce(
    (result, task, idx, source) => {
      if (!result.length) {
        result.push([idx, idx]);
        return result;
      }

      const lastTaskIndex = result[result.length - 1][1];
      const lastTask = source[lastTaskIndex];
      const lastGroupId = lastTask.groupId;

      if (task.groupId === lastGroupId)
        result[result.length - 1][1] = idx;
      else
        result.push([idx, idx]);

      return result;
    },
    []
  );

  const addTask = useCallback(
    task => {
      dispatch({
        type: 'ADD_TASK',
        payload: { task }
      });
    },
    []
  );

  const editTask = useCallback(
    task => {
      dispatch({
        type: 'EDIT_TASK',
        payload: { task }
      });
    },
    [],
  );

  const addGroup = useCallback(
    group => {
      dispatch({
        type: 'ADD_GROUP',
        payload: { group }
      });
    },
    []
  );

  const editGroup = useCallback(
    group => {
      dispatch({
        type: 'EDIT_GROUP',
        payload: { group }
      });
    },
    []
  );

  const completeCurrentTask = useCallback(
    () => {
      let group;

      if (currentGroupTitle)
        group = groups.find(g => g.title === currentGroupTitle);
      else
        group = groups[0];

      if (!group) {
        group = {
          id: groups.length,
          title: currentGroupTitle,
          color: currentGroupColor || randomColor(),
        };
        addGroup(group);
      } else {
        editGroup({
          ...group,
          color: currentGroupColor
        });
      }

      editTask({
        ...currentTask,
        groupId: group.id,
        end: new Date(),
      });

      addTask({
        start: new Date(),
      });
    },
    [currentTask, editTask, addTask]
  );

  useLayoutEffect(
    () => { window.scrollTo(0, document.body.scrollHeight) },
    [tasks.length]
  );

  return (
    <Root>
      <TasksFrame>
        <div/>
        <div/>
        <div/>
        {groupIndexes.map(indexes => {
          const task = tasks[indexes[0]];
          const group = groups.find(g => g.id === task.groupId);

          return (
            <Fragment>
              <GroupLabel group={group} indexes={indexes}/>
              <GroupColor group={group} indexes={indexes}/>
            </Fragment>
          )
        })}
        {completedTasks.map((task, idx) => (
          <CompletedTask
            index={idx + 1}
            task={task}
            onChange={editTask}
          />
        ))}
        <CurrentGroupInput
          value={currentGroupTitle}
          placeholder={'Pet Stuff'}
          onChange={handleCurrentGroupTitleChange}
        />
        <CurrentGroupColor
          color={currentGroupColor}
          onClick={currentGroupTitle ? handleCurrentGroupColorClick : undefined}
        />
        <CurrentTask
          task={currentTask}
          onChange={editTask}
          onComplete={completeCurrentTask}
        />
      </TasksFrame>
      <Divider/>
    </Root>
  );
}

