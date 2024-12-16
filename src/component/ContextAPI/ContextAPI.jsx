import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
export const ContextSource = createContext();

const ContextAPI = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const token = useSelector((state) => state.Auth.token);
  useEffect(() => {
    if (!token) {
      return setUserInfo(null);
    }
    const userinfo = jwtDecode(token);
    setUserInfo(userinfo);
  }, []);

  const data = { userInfo };
  return (
    <ContextSource.Provider value={data}>{children}</ContextSource.Provider>
  );
};

export default ContextAPI;
