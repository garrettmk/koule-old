import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from "styled-components";
import theme from './theme';
import { createDb, getDatabase, addTask } from "./database";

// let tasks$;
// async function logTasks() {
//   const db = await getDatabase();
//   tasks$ = db.tasks.find().$;
//
//   tasks$.subscribe({
//     next: tasks => console.log('tasks', tasks),
//     error: error => console.log('tasks->error', error),
//     complete: () => console.log('tasks->complete')
//   });
// }
//
// logTasks();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
