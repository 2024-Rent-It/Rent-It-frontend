// // React Native에서의 로그인 예제

// import React, { useState } from 'react';
// import { View, TextInput, Button, Alert } from 'react-native';

// const LoginScreen = (navigation) => {
//   const [account, setAccount] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/sign-in', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ account: account, password }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         Alert.alert('로그인 성공', data.message);
//         // 로그인 성공
//         // 토큰을 저장하고 다음 화면으로 이동하는 등의 작업 수행
//       } else {
//         // 로그인 실패
//         Alert.alert('로그인 실패', data.message);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <View>
//       <TextInput
//         placeholder="사용자 이름"
//         value={account}
//         onChangeText={setAccount}
//       />
//       <TextInput
//         placeholder="비밀번호"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <Button title="로그인" onPress={handleLogin} />
//     </View>
//   );
// };

// export default LoginScreen;

import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Text, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // React Navigation의 useNavigation 훅 가져오기
import { useAuth } from '../../contexts/AuthContext'; // AuthContext 파일의 useAuth 훅 가져오기

const LoginScreen = () => {
  const navigation = useNavigation(); // navigation 객체 가져오기
  const [account, setAccount] = useState(''); // 아이디 상태
  const [password, setPassword] = useState(''); // 비밀번호 상태
  const { login } = useAuth();
  const { userNickname } = useAuth();

  // const handleLoginPress = () => {
  //   navigation.navigate('Root'); // LoginPage로 이동
  // };

    const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ account: account, password }),
      });
      const responseData = await response.json(); 
      if (response.ok) {
        // const authToken = data.data.token;
        // const name= data.data.name;
        const { name, token } = responseData.data;

        login(token, name); // 로그인 함수 호출하여 토큰 저장
        Alert.alert('로그인 성공', responseData.message);
        console.log(responseData)
        console.log(name)
        console.log(token)

        // 로그인 성공
        // 토큰을 저장하고 다음 화면으로 이동
        navigation.navigate('Root'); // LoginPage로 이동
      } else {
        // 로그인 실패
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
        onChangeText={text => setAccount(text)} // 아이디 입력 시 상태 업데이트
      />
      <TextInput
        style={[styles.input, { borderBottomWidth: 0, backgroundColor: '#FFFFFF' }]} // 테두리 없애고 원하는 색상으로 변경
        placeholder="비밀번호 입력"
        value={password}
        onChangeText={text => setPassword(text)} // 비밀번호 입력 시 상태 업데이트
        secureTextEntry={true} // 비밀번호 숨기기
      />
      <Pressable
        style={styles.button}
        onPress={handleLogin} // 로그인 버튼을 누를 때 handleLoginPress 함수 호출
      >
        <Text style={styles.buttonText}>로그인 하기</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: 100,
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: "2%",
},
h2: {
    fontSize: 18,
    marginBottom: "5%",
    marginRight: "20%",
},
h3: {
    fontSize: 15,
    marginBottom: "5%",
},
});

export default LoginScreen;
