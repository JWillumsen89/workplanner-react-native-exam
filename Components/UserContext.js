import React, { createContext, useState } from 'react';

export const UserContext = createContext({
    userData: null,
    sessionId: null,
    setUserData: () => {},
    setSessionId: () => {},
});

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [sessionId, setSessionId] = useState(null);

    const value = {
        userData,
        sessionId,
        setUserData,
        setSessionId,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
