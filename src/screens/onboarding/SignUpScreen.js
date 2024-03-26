import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [nickName, setNickName] = useState('');

  const handleSignUp = async () => {
    try {
      if (password1 !== password2) {
        Alert.alert('비밀번호 오류', '비밀번호가 일치하지 않습니다.');
        return;
      }

      const response = await axios.post('http://localhost:8080/user/signup', {
        username: username,
        password1: password1,
        password2: password2,
        email: email
      },{
        headers: {
          'Content-Type': 'application/json' // JSON 형식으로 요청을 보냄
        }
      });
      
      Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.');
      // 로그인 화면으로 이동하는 코드 작성
    } catch (error) {
      // 실패한 경우
    console.error('회원가입 요청 실패:', error);

    // Axios 에러 객체에서 세부 정보 추출
    if (error.response) {
      // 서버가 응답한 경우
      console.error('응답 데이터:', error.response.data);
      console.error('응답 상태 코드:', error.response.status);
    } else if (error.request) {
      // 요청이 만들어졌지만 응답을 받지 못한 경우
      console.error('요청이 만들어졌지만 응답을 받지 못했습니다.', error.request);
    } else {
      // 요청을 설정하는 과정에서 오류가 발생한 경우
      console.error('요청 설정 시 오류 발생:', error.message);
    }

    // 추가적인 에러 처리 및 사용자에게 메시지 표시
    Alert.alert('회원가입 실패', '다시 시도해주세요.');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="사용자 아이디"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholder="비밀번호"
        value={password1}
        onChangeText={text => setPassword1(text)}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="비밀번호 확인"
        value={password2}
        onChangeText={text => setPassword2(text)}
        secureTextEntry={true}
      />
      <TextInput
        placeholder="이메일"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="닉네임"
        value={nickName}
        onChangeText={text => setNickName(text)}
      />
      <Button
        title="회원가입"
        onPress={handleSignUp}
      />
    </View>
  );
};

export default SignUpScreen;