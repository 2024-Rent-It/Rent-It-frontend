import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // React Navigation의 useNavigation 훅 가져오기
import { useAuth } from '../../contexts/AuthContext'; // AuthContext 파일의 useAuth 훅 가져오기
import { BASE_URL } from '../../constants/api.js';

const LoginScreen = () => {
  const navigation = useNavigation(); // navigation 객체 가져오기
  const [account, setAccount] = useState(''); // 아이디 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const { login } = useAuth();

  const handleForgetPassword = () => {
    navigation.navigate('EmailLogin'); // EmailLogin 화면으로 이동
  };

  const handleLogin = async () => {
    const signInPath = '/sign-in';
    try {
      // const response = await fetch('http://localhost:8080/sign-in', {
        const response = await fetch(`${BASE_URL}${signInPath}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account, password }),
      });
      const responseData = await response.json(); 
      if (response.ok) {
        const { id, nickname, email, location, token } = responseData.data;
        console.log('로그인 정보 확인', responseData.data)
        login(id, token, nickname, email, location); // 로그인 함수 호출하여 토큰 저장
        Alert.alert('로그인 성공', responseData.message);
        navigation.navigate('Root'); // Root 화면으로 이동
      } else {
        Alert.alert('로그인 실패', responseData.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container_title}>
        <Text style={styles.h1}>안녕하세요!👋</Text>
        <Text style={styles.h2}>등록된 정보로 로그인해주세요!😍</Text>
        <Text style={styles.h3}>회원님의 정보는 안전하게 보관됩니다.</Text>
      </View>
      <TextInput
        style={[styles.input, { borderBottomWidth: 0, backgroundColor: '#FFFFFF' }]} // 테두리 없애고 원하는 색상으로 변경
        placeholder="아이디 입력"
        value={account}
        onChangeText={text => setAccount(text)} 
      />
      <TextInput
        style={[styles.input, { borderBottomWidth: 0, backgroundColor: '#FFFFFF' }]} // 테두리 없애고 원하는 색상으로 변경
        placeholder="비밀번호 입력"
        value={password}
        onChangeText={text => setPassword(text)} 
        secureTextEntry={true} // 비밀번호 숨기기
      />
      <Pressable
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>로그인 하기</Text>
      </Pressable>
      <Text style={styles.h4} onPress={handleForgetPassword}>비밀번호를 잊으셨나요?</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ECECEC', // 전체 화면 색상 변경
  },
  container_title:{
    marginTop: 100,
  },
  input: {
    height: 60,
    width: '80%',
    borderRadius: 16,
    borderColor: "#ffffff",
    borderWidth: 1,
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 18,
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  button: {
    height: 60,
    width: '80%',
    fontSize: 18,
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A7C8E7',
    marginTop: 15,
  },
  buttonText: {  
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  h1: {
    fontSize: 33,
    fontWeight: 'bold',
    marginBottom: '2%',
    marginRight: '32%',
  },
  h2: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: '10%',
  },
  h3: {
    fontSize: 17,
    marginBottom: "15%",
    maginLeft: '10',
  },
  h4: {
    fontSize: 15,
    marginTop: "5%",
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;