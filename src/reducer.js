import { saveState, loadState } from "./storage";
import { addTask } from "./database";

export const initialState = loadState() || {
  tasks: [
    {
      id: 0,
      start: new Date(),
    }
  ],
  groups: [
    {
      id: 0,
    }
  ]
};

export default function appReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_TASK': {
      const { tasks } = state;
      const { task: newTask } = payload;
      const newState = {
        ...state,
        tasks: tasks.concat([{
          id: tasks.length,
          ...newTask,
        }]),
      };

      saveState(newState);
      return newState;
    }

    case 'EDIT_TASK': {
      const { tasks } = state;
      const { task: thisTask } = payload;
      const { id } = thisTask;
      const index = tasks.findIndex(t => t.id === id);
      if (index < 0)
        throw new Error('Task not found: id=' + id);

      const newTasks = tasks.slice();
      newTasks.splice(index, 1, thisTask);

      const newState = {
        ...state,
        tasks: newTasks,
      };

      saveState(newState);
      return newState;
    }

    case 'ADD_GROUP': {
      const { groups } = state;
      const { group: newGroup } = payload;

      const newState = {
        ...state,
        groups: groups.concat([{
          id: groups.length,
          ...newGroup,
        }])
      };

      saveState(newState);
      return newState;
    }

    case 'EDIT_GROUP': {
      const { groups } = state;
      const { group: thisGroup } = payload;
      const { id } = thisGroup;

      const index = groups.findIndex(g => g.id === id);
      if (index < 0)
        throw new Error('Group not found: id=' + id);

      const newGroups = groups.slice();
      groups.splice(index, 1, thisGroup);

      const newState = {
        ...state,
        groups: newGroups,
      };

      saveState(newState);
      return newState;
    }

    default:
      throw new Error('Invalid action type: ' + type);
  }
}