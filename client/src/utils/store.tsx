import React, { createContext, useReducer, ReactNode } from 'react';
import { reducer, initialState } from './reducer';

type StoreContextType = {
    state: typeof initialState;
    dispatch: React.Dispatch<any>;
};

export const StoreContext = createContext<StoreContextType | undefined>(undefined);

type StoreProviderProps = {
    children: ReactNode;
};

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};
