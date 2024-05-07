import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [userNickname, setUserNickname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userLocation, setUserLocation] = useState("");
  // const [userid, setUserID] = useState("");

  const login = async(authToken, loginUserNickname, loginUserEmail,loginUserLocation) => {
    setToken(authToken);
    setUserNickname(loginUserNickname);
    // setUserID(loginUserID);
    setUserEmail(loginUserEmail);
    setUserLocation(loginUserLocation);
    console.log("사용자 정보 확인", authToken, loginUserNickname, loginUserEmail,  loginUserLocation);
    try {
      // AsyncStorage에 토큰 및 사용자 정보 저장
      await AsyncStorage.setItem('token', authToken);
      await AsyncStorage.setItem('userNickname', loginUserNickname);
      // await AsyncStorage.setItem('userID', loginUserID);
      await AsyncStorage.setItem('userEmail', loginUserEmail);
      await AsyncStorage.setItem('userLocation', loginUserLocation);
      console.log("모든 정보 저장 완료");

    } catch (error) {
      console.error('Error saving auth data:', error);
    }
    
  };

  const logout = async() => {
    setToken('');
    setUserNickname('');
    setUserEmail('');
    setUserLocation('');
    // setUserID('');
    try {
            // AsyncStorage에서 데이터 삭제
            await AsyncStorage.removeItem('token');
            await AsyncStorage.removeItem('userNickname');
            // await AsyncStorage.removeItem('userID');
            await AsyncStorage.removeItem('userEmail');
            await AsyncStorage.removeItem('userLocation');
      
            // 상태 초기화

          } catch (error) {
            console.error('Error removing auth data:', error);
          }

  };

  useEffect(() => {
  }, [userNickname]);

  return (
    <AuthContext.Provider value={{ token, userNickname, userEmail,userLocation, setUserNickname,setUserEmail, setUserLocation,login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);