import React, { createContext, useContext, useState } from 'react';

const SharedStateContext = createContext();

export const SharedStateProvider = ({ children }) => {
    const [sharedState, setSharedState] = useState(false);

    return (
        <SharedStateContext.Provider value={{ sharedState: sharedState, setSharedState }}>
            {children}
        </SharedStateContext.Provider>
    );
};

export const useSharedState = () => {
    const context = useContext(SharedStateContext);
    if (!context) {
        throw new Error('useSharedState must be used within a SharedStateProvider');
    }
    return context;
};