import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
      <UserContext.Provider value={[user,setUser]}>
          {children}
      </UserContext.Provider>
  );
};

export {UserContext, UserContextProvider};

