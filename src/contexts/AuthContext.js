import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [userNickname, setUserNickname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [userid, setUserID] = useState("");

  const login = (authToken, loginUserNickname, loginUserID,loginUserEmail,loginUserLocation) => {
    setToken(authToken);
    setUserNickname(loginUserNickname);
    setUserID(loginUserID);
    setUserEmail(loginUserEmail);
    setUserLocation(loginUserLocation);
    // console.log(userNickname)
  };

  const logout = () => {
    setToken('');
  };

  useEffect(() => {
    console.log("닉네임 다음으로 변경됨", userNickname); // userNickname 값이 변경될 때마다 로그를 출력
  }, [userNickname]);

  return (
    <AuthContext.Provider value={{ token, userNickname, userEmail,userLocation,setUserNickname,setUserEmail, setUserLocation,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);