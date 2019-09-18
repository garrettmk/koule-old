import React, { useState, useMemo, useCallback, useEffect, createContext } from 'react';
import { history } from "../../utilities/history";
import auth0 from "auth0-js";

const DEFAULT_SESSION = {};
export const SessionContext = React.createContext(DEFAULT_SESSION);


export default function AuthWrapper({ children }) {
  const [session, setSession] = useState(null);

  const webAuth = useMemo(
    () => new auth0.WebAuth({
      domain: 'sparkling-hat-5841.auth0.com',
      clientID: 'wXmmNlkWyTEP3NOu02ThlR3ySsdRdTjZ',
      redirectUri: 'https://koule.herokuapp.com/callback',
      audience: 'https://sparkling-hat-5841.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid profile',
    }),
  []
  );

  const login = useCallback(
    () => webAuth.authorize(),
    []
  );

  const logout = useCallback(
    () => {
      localStorage && localStorage.removeItem('isLoggedIn');
      setSession(null);

      webAuth.logout({ return_to: 'https://localhost:3000' });

      history.replace('/');
    },
    []
  );

  const createSession = useCallback(
    ({ expiresIn, accessToken, idToken }) => {
      localStorage && localStorage.setItem('isLoggedIn', true);
      setSession({
        expiresAt: expiresIn * 1000 + new Date().getTime(),
        accessToken,
        idToken
      });

      history.replace('/');
    },
    [setSession]
  );

  const handleAuthentication = useCallback(
    () => webAuth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        createSession(authResult);
      } else if (err) {
        console.error(err);
        logout();
      }
    }),
    [logout]
  );

  const renewSession = useCallback(
    () => webAuth.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        createSession(authResult);
      } else if (err) {
        logout();
        console.error(err);
      }
    }),
    [createSession, logout],
  );

  useEffect(
    () => {
      const location = window.location;
      const isCallbackUrl = location && location.pathname.startsWith('/callback');
      const shouldAuthenticate = location && /access_token|id_token|error/.test(location.hash);
      const isLoggedIn = localStorage && localStorage.getItem('isLoggedIn');

      if (isCallbackUrl && shouldAuthenticate)
        handleAuthentication();
      else if (isLoggedIn)
        renewSession();
      else
        login();
    },
    []
  );

  if (session)
    return (
      <SessionContext.Provider value={session || DEFAULT_SESSION}>
        {children}
      </SessionContext.Provider>
    );
  else
    return <div/>;
}