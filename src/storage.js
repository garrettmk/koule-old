export function saveState(state) {
  const value = JSON.stringify(state);
  window.localStorage.setItem('state', value);
}

export function loadState() {
  const value = window.localStorage.getItem('state');
  const state = JSON.parse(value);

  if (state)
    state.tasks.forEach((task, idx) => {
      state.tasks[idx].end = new Date(task.end);
      state.tasks[idx].start = new Date(task.start);
    });

  return state;
}