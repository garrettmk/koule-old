import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from "styled-components";
import AuthWrapper from "./containers/Auth";
import Apollo from "./containers/Apollo";
import theme from './theme';


ReactDOM.render(
  <AuthWrapper>
    <Apollo>
      <ThemeProvider theme={theme}>
        <App/>
      </ThemeProvider>
    </Apollo>
  </AuthWrapper>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
