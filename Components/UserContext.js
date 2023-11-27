import React, { createContext, useState } from 'react';

export const UserContext = createContext({
    userData: null,
    setUserData: () => {},
});

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null); // or some initial value

    const value = { userData, setUserData };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
