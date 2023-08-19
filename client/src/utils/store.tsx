import React, { createContext, useReducer, ReactNode } from 'react';
import { reducer, initialState } from './reducer';

export type StoreContextType = {
    state: typeof initialState;
    dispatch: React.Dispatch<any>;
};

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

type StoreProviderProps = {
    children: ReactNode;
};

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
    const savedStateString = localStorage.getItem('appState');
    const savedState = savedStateString ? JSON.parse(savedStateString) : null;

    const appState = savedState || initialState;

    const [state, dispatch] = useReducer(reducer, appState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};
