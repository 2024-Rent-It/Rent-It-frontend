import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';

const Email = () => {
  const [email, setEmail] = useState('');

  const handleResetPasswordPress = () => {
    if (!validateEmail(email)) {
      Alert.alert('유효하지 않은 이메일 형식입니다.');
      return;
    }
    // 임시 비밀번호 발급 요청 로직 작성
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
        style={styles.input}
        placeholder="이메일 입력"
        value={email}
        onChangeText={setEmail}
      />
      <Pressable style={styles.button} onPress={handleResetPasswordPress}>
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
    marginBottom: '6%',
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
    marginBottom: '63%',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  title: {
    fontSize: '37%',
    fontWeight: 'bold',
    marginBottom: '2%',
    marginRight: '33%',
  },
  subtitle: {
    fontSize: '25%',
    fontWeight: 'bold',
    marginBottom: '10%',
    marginRight: '22%',
  },
  info: {
    fontSize: '18%',
    marginBottom: '15%',
  },
});

export default Email;