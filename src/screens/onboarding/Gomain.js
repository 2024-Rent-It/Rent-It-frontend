import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

const GoMain = () => {
  const handleNavigateHome = () => {

  };

  return (
    <View style={styles.container}>
        <Text style={styles.SideText}>YOU  CAN  RENT  EVERYTHING</Text>
      <Text style={styles.welcomeText}>닉네임님,</Text>
      <Text style={styles.welcomeText2}>렌팃에 오신걸 환영해요!🥰</Text>
      <TouchableOpacity onPress={handleNavigateHome} style={styles.button}>
        <Text style={styles.buttonText}>메인화면으로 가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#284967',
    justifyContent: 'center',
    alignItems: 'center',
  },
    SideText: {
    color: '#A7C8E7',
    fontSize: '18%',
    marginBottom: '20%',
    marginTop: '8%',
    textAlign: 'center',
  },
  welcomeText: {
    color: 'white',
    fontSize: '30%',
    marginBottom: '1%',
    marginTop: '30%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  welcomeText2: {
    color: 'white',
    fontSize: '30%',
    marginBottom: '20%',
    marginTop: '5',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#A7C8E7',
    paddingVertical: '5%', // 버튼의 세로 크기
    paddingHorizontal: '24%', // 버튼의 가로 크기
    borderRadius: '33%',
    marginTop: '35%', 
  },
  buttonText: {
    color: '#284967',
    fontSize: '20%',
    fontWeight: 'bold',
    textAlign: 'center', // 텍스트를 가운데 정렬합니다.
  },
});

export default GoMain;