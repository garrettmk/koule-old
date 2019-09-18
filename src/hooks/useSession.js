import React, { useContext } from 'react';
import { SessionContext } from "../components/Auth";

export function useSession() {
  return useContext(SessionContext);
}