import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [userNickname, setUserNickname] = useState("");

  const login = (authToken, loginUserNickname) => {
    Alert.alert('로그인 하는 중~~');
    setToken(authToken);
    setUserNickname(loginUserNickname)
    // console.log(userNickname)
    
  };

  const logout = () => {
    setToken('');
  };

  useEffect(() => {
    console.log(userNickname); // userNickname 값이 변경될 때마다 로그를 출력
  }, [userNickname]);

  return (
    <AuthContext.Provider value={{ token, userNickname, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);