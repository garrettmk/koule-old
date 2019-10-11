import React, { useCallback } from 'react';
import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";

export const DELETE_EMPTY_GROUPS = gql`
  mutation deleteEmptyGroups {
    
  }
`;