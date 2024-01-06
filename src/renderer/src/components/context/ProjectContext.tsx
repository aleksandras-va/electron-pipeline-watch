import React, { createContext } from 'react';

interface ContextData {
  id: string;
  updates: number;
}

export const ProjectContext: React.Context<ContextData> = createContext({
  id: '0',
  updates: 0,
});
