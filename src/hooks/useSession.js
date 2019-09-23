import React, { useContext } from 'react';
import { SessionContext } from "../containers/Auth";

export function useSession() {
  return useContext(SessionContext);
}