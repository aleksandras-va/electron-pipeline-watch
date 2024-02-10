import React, { createContext } from 'react';

interface ContextData {
  registeredIds: string[];
}

const defaultValues: ContextData = { registeredIds: [] };

export const AppContext: React.Context<ContextData> = createContext(defaultValues);
