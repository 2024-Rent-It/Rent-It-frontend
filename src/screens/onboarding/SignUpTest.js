import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Text, TextInput, ScrollView, Pressable, FlatList, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import axios from 'axios';

const SignUpTest = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [userName, setUserName] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [nickName, setNickName] = useState("");
    const [location, setLocation] = useState(null);



    /** 닉네임 중복검사 함수 */
  
    /** 비밀번호 유효성 검사 함수 */
    

    /** 회원가입 백엔드 전달 함수 */
    const signUp = async () => {
        try {
          if (password1 !== password2) {
            Alert.alert('비밀번호 오류', '비밀번호가 일치하지 않습니다.');
            return;
          }

 
          const response = await axios.post('http://localhost:8080/user/signup', {
            username: userName,
            password1: password1,
            password2: password2,
            email: email,
            nickname: nickName,
          },{
            headers: {
              'Content-Type': 'application/json' // JSON 형식으로 요청을 보냄
            }
          });
          
          Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.');
        //   navigation.navigate('')

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
          console.error("데이터 확인",userName, password1,password2, email, nickName)

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
        <View style={{ flex: 1, backgroundColor: '#ECECEC' }}>
            <View style={styles.container}>
                {/* 회원가입 타이틀 */}
                <View style={styles.container_title}>
                    <Text style={styles.h1}>안녕하세요!👋</Text>
                    <Text style={styles.h2}>회원가입에 필요한 정보를 입력해주세요!😍</Text>
                </View>

                <ScrollView showsVerticalScrollIndicator={true}>
                    <View>
                        {/* 아이디 입력 */}
                        <View style={styles.input_field}>
                            <View style={styles.label_fields}>
                                <Text>아이디</Text>
                            </View>
                            <View style={styles.horizon}>
                                <TextInput
                                    style={styles.input}
                                    width={'60%'}
                                    placeholder="아이디 입력"
                                    maxLength={10}
                                    value={userName}
                                    onChangeText={(text) => {
                                        setUserName(text);
                                    }}
                                />
                                <Pressable
                                    style={styles._button}
                                    width={"34%"}
                                    onPress={() => {
                                        checkNickname(userName);
                                    }}
                                >
                                    <Text style={styles.h2}>중복확인</Text>
                                </Pressable>
                            </View>
                        </View>

                        {/* 비밀번호 입력 */}
                        <View style={styles.input_field}>
                            <View style={styles.label_fields}>
                                <Text style={styles.label}>비밀번호</Text>
                            </View>
                            <TextInput
                                style={styles.input }
                                width={'100%'}
                                placeholder="비밀번호 입력"
                                maxLength={15}
                                value={password1}
                                onChangeText={(text) => setPassword1(text)}
                                secureTextEntry={true}
                            />
                        </View>
                        {/* 비밀번호 확인 입력 */}
                        <View style={styles.input_field}>
                            <View style={styles.label_fields}>
                                <Text style={styles.label}>비밀번호 확인</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                width={'100%'}
                                placeholder="확인 비밀번호 입력"
                                maxLength={15}
                                value={password2}
                                onChangeText={(text) => setPassword2(text)}
                                secureTextEntry={true}
                            />
                        </View>

                        {/* 닉네임 입력 */}
                        <View style={styles.input_field}>
                            <View style={styles.label_fields}>
                                <Text>닉네임</Text>
                            </View>
                            <View style={styles.horizon } width={"100%"}>
                                <TextInput
                                    style={styles.input}
                                    width={'60%'}
                                    placeholder="닉네임 입력"
                                    maxLength={10}
                                    value={nickName}
                                    onChangeText={(text) => {
                                        setNickName(text); //console.log(text)
                                    }}
                                />
                                <Pressable
                                    style={styles._button }
                                    width={"34%"}
                                    onPress={() => {
                                        checkNickname(nickName);
                                    }}
                                >
                                    <Text style={styles.h2}>중복확인</Text>
                                </Pressable>
                            </View>
                        </View>

                         {/* 이메일 입력 */}
                         <View style={styles.input_field}>
                            <View style={styles.label_fields}>
                                <Text>이메일</Text>
                            </View>
                            <View style={styles.horizon } width={"100%"}>
                                <TextInput
                                    style={styles.input}
                                    width={'60%'}
                                    placeholder="이메일 입력"
                                    value={email}
                                    onChangeText={(text) => {
                                        setEmail(text); //console.log(text)
                                    }}
                                />
                                <Pressable
                                    style={styles._button }
                                    width={"34%"}
                                    onPress={() => {
                                        checkNickname(email);
                                    }}
                                >
                                    <Text style={styles.h2}>중복확인</Text>
                                </Pressable>
                            </View>
                        </View>

                        {/* 위치 가져오기 */}
                        <View style={styles.input_field}>
                            <View style={styles.label_fields}>
                                <Text>지역 설정</Text>
                            </View>
                            <View style={styles.horizon} width={"100%"}>
                                <Pressable style={styles._button2}  width={'47%'}>
                                    <Text style={styles.loctext}>🔎 내 위치로 검색</Text>
                                </Pressable>
                                <Pressable style={styles._button2}  width={'47%'}>
                                    <Text style={styles.loctext}>🧭 지역 검색</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    {/* 회원가입 버튼 */}
                    <View>
                        <Pressable
                            style={styles._button3} backgroundColor={"#A7C8E7"}
                            onPress={() =>{
                                signUp();
                                navigation.navigate("Root")
                            }
                            //     {
                            //     // signUp();
                                
                            // }
                        }
                        >
                            <Text style={styles.h2}>회원가입</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "10%",
        marginHorizontal: "5%",
    },
    input_field:{
        marginBottom: "5%",
    },
    container_title: {
        marginBottom: "5%",
    },
    h1: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: "5%",
    },
    h2: {
        fontSize: 18,
    },
    h3: {
        fontSize: 14,
    },
    loctext: {
        fontSize: 15,
        fontWeight: "bold",

    },
    innertext: {
        paddingTop: 3,
        paddingBottom: 2,
    },
    error: {
        color: "red",
    },
    label_fields: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
    },
    horizon: {
        flexDirection: "row",
    },
    input: {
        height: 60,
        borderRadius: 16,
        borderColor: "#ffffff",
        borderWidth: 1,
        fontSize: 18,
        paddingHorizontal: 15,
        paddingVertical: 18,
        marginBottom: 10,
        backgroundColor: "#ffffff",
        marginRight: "6%",
    },
    _button: {
        backgroundColor: "#CDCDCD",
        alignItems: "center",
        padding: "5%",
        borderRadius: 16,
        height: 60,
    },
    _button2: {
        backgroundColor: "#A7C8E7",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
        marginRight: "6%",
        // width: 157,
    },
    _button3: {
        backgroundColor: "#A7C8E7",
        alignItems: "center",
        padding: 20,
        borderRadius: 16,
        height: 60,
        marginBottom: "6%",
    },

});

export default SignUpTest;