import React, { useState} from "react";
import { Alert, StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import axios from 'axios';
import { BASE_URL } from '../../constants/api.js';

const Email = () => {
  const [email, setEmail] = useState('');
  const [isEmailExist, setIsEmailExist] = useState(false);

  const checkEmail = async (email) => {
    const checkEmailPath = '/checkEmail';
    try {
      const response = await axios.get(`${BASE_URL}${checkEmailPath}`, {
        params: {
          memberEmail: email
        }
      });

      // 서버로부터의 응답에 따라 처리
      if (response.data) {
        console.log('이메일이 확인되었습니다.');
        setIsEmailExist(true);
      } else {
        console.log('이메일이 존재하지 않습니다.');
      }
    } catch (error) {
      console.error('이메일 확인 중 오류 발생:', error);
    }
  };

  const handleResetPasswordPress = async(email) => {
    // if (!validateEmail(email)) {
    //   Alert.alert('유효하지 않은 이메일 형식입니다.');
    //   return;
    // }
    if (!isEmailExist) {
      Alert.alert('이메일을 다시 입력해주세요.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8080/sendPwd', null, {
        params: {
            memberEmail: email
          }
        }, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });

      console.log(response)
      if (response.data) {
        Alert.alert('임시 비밀번호가 전송되었습니다.', '해당 비밀번호로 로그인해주세요.');
        navigation.navigate("Onboarding")
        
      } else {
        console.log('에러');
      }
    } catch (error) {
      console.error('이메일 전송 중 오류 발생:', error);
    }
  };


  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>안녕하세요!👋</Text>
      <Text style={styles.subtitle}>이메일을 입력해주세요!😍</Text>
      <Text style={styles.info}>회원님의 이메일로 임시비밀번호를 보내드립니다.</Text>
      <TextInput
        style={[styles.input, { borderBottomWidth: 0, backgroundColor: '#FFFFFF', fontSize: '14%' }]}
        placeholder="이메일 입력"
        value={email}
        onChangeText={setEmail}
      />
      <Pressable style={styles.button} 
      onPress={() => {
        checkEmail(email);
        handleResetPasswordPress(email);
    }}>

        <Text style={styles.buttonText}>임시 비밀번호 발급받기</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECECEC', // 전체 화면 배경 색상 변경
  },
  input: {
    height: '7%',
    width: '80%',
    borderRadius: '16%',
    borderColor: "#ffffff",
    borderWidth: 1,
    fontSize: 18,
    paddingHorizontal: 15,
    paddingVertical: 18,
    marginBottom: 10,
    backgroundColor: "#ffffff",
    marginBottom: '6%',
  },
  button: {
    height: '7%',
    width: '80%',
    borderRadius: '16%',
    paddingHorizontal: 15,
    paddingVertical: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A7C8E7',
    marginBottom: '63%',
  },
  buttonText: {
    fontSize: '16%',
    fontWeight: 'bold',
    color: '#000000',
  },
  title: {
    fontSize: '33%',
    fontWeight: 'bold',
    marginBottom: '2%',
    marginRight: '33%',
  },
  subtitle: {
    fontSize: '22%',
    fontWeight: 'bold',
    marginBottom: '10%',
    marginRight: '22%',
  },
  info: {
    fontSize: '16%',
    marginBottom: '15%',
  },
});

export default Email;