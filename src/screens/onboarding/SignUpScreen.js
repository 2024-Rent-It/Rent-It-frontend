import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View, Text, TextInput, ScrollView, Pressable, FlatList, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext.js'; // AuthContext 파일의 useAuth 훅 가져오기
import { BASE_URL } from '../../constants/api.js';


const SignUpTest = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { login } = useAuth();
    const { city } = route.params || {}; // 동네 정보(city)를 받아옴

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState("");

    const [isAccountDuplicateChecked, setIsAccountDuplicateChecked] = useState(false);
    const [isNicknameDuplicateChecked, setIsNicknameDuplicateChecked] = useState(false);
    const [isEmailDuplicateChecked, setIsEmailDuplicateChecked] = useState(false);



    /** 비밀번호 유효성 검사 함수 */

    /** 아이디 중복 검사 함수 */
    const checkAccount = async (account) => {
        const checkAccountPath = `/accounts/${account}`;
        try {
            // const response = await axios.get(`http://localhost:8080/accounts/${account}`);
            const response = await axios.get(`${BASE_URL}${checkAccountPath}`);
            
            Alert.alert(response.data);
            if (response.data === "사용 가능한 아이디입니다.") {
                setIsAccountDuplicateChecked(true);
            }
            console.log(response);
            console.log(account);
        } catch (error) {
            console.error('아이디 중복 확인 실패:', error);
            Alert.alert('알림', '중복 확인에 실패했습니다.');
        }
    };

    /** 닉네임 중복 검사 함수 */
    const checkNickname = async (nickname) => {
        const checkNicknamePath = `/nicknames/${nickname}`;
        try {
            // const response = await axios.get(`http://localhost:8080/nicknames/${nickname}`);
            const response = await axios.get(`${BASE_URL}${checkNicknamePath}`);
            Alert.alert(response.data);
            if (response.data === "사용 가능한 닉네임입니다.") {
                setIsNicknameDuplicateChecked(true);
            }
        } catch (error) {
            console.error('닉네임 중복 확인 실패:', error);
            Alert.alert('알림', '중복 확인에 실패했습니다.');
        }
    };

    /** 이메일 중복 검사 함수 */
    const checkEmail = async (email) => {
        const checkEmailPath = `/emails/${email}`;
        try {
            const response = await axios.get(`${BASE_URL}${checkEmailPath}`);
            Alert.alert(response.data);
            if (response.data === "사용 가능한 이메일입니다.") {
                setIsEmailDuplicateChecked(true);
            }
            console.log(response);
            console.log(email);
        } catch (error) {
            console.error('이메일 중복 확인 실패:', error);
            Alert.alert('알림', '중복 확인에 실패했습니다.');
        }
    };


    /** 회원가입 백엔드 전달 함수 */
    const handleSignUp = async () => {
        const SignUpPath = '/sign-up';
        try {
            console.log(isAccountDuplicateChecked, isNicknameDuplicateChecked, isEmailDuplicateChecked);

            // 각 입력값이 비어 있는지 확인
            if (!account || !password || !password2 || !nickname || !email || !city) {
                Alert.alert('모든 필드를 입력해주세요.');
                return;
            }
            if (password !== password2) {
                Alert.alert('비밀번호 오류', '비밀번호가 일치하지 않습니다.');
                return;
            }
            if (!isAccountDuplicateChecked) {
                Alert.alert('아이디 중복 확인이 필요합니다.');
                return;
            }

            if (!isNicknameDuplicateChecked) {
                Alert.alert('닉네임 중복 확인이 필요합니다.');
                return;
            }

            if (!isEmailDuplicateChecked) {
                Alert.alert('이메일 중복 확인이 필요합니다.');
                return;
            }

            const response = await axios.post(`${BASE_URL}${SignUpPath}`, {
                account: account,
                password: password,
                password2: password2,
                nickname: nickname,
                email: email,
                location: city,
            }, {
                headers: {
                    'Content-Type': 'application/json' // JSON 형식으로 요청을 보냄
                }
            });
            // console.log(isAccountDuplicateChecked, isNicknameDuplicateChecked, isEmailDuplicateChecked);

            Alert.alert('회원가입 성공', '로그인 화면으로 이동합니다.');
            handleLogin();
            navigation.navigate("Root")

            //   navigation.navigate('')

            // 로그인 화면으로 이동하는 코드 작성
        } catch (error) {
            // 실패한 경우
            console.error('회원가입 요청 실패:', error);

            // Axios 에러 객체에서 세부 정보 추출
            if (error.response) {
                // 서버가 응답한 경우
                console.error('응답 데이터:', error.response.data.message);
                console.error('응답 상태 코드:', error.response.status);
            } else if (error.request) {
                // 요청이 만들어졌지만 응답을 받지 못한 경우
                console.error("데이터 확인", account, password, password2, nickname, email)

                console.error('요청이 만들어졌지만 응답을 받지 못했습니다.', error.request);
            } else {
                // 요청을 설정하는 과정에서 오류가 발생한 경우
                console.error('요청 설정 시 오류 발생:', error.message);
            }

            // 추가적인 에러 처리 및 사용자에게 메시지 표시
            Alert.alert('회원가입 실패', '다시 시도해주세요.');
        }
    };

    const handleLogin = async () => {
        const signInPath = '/sign-in';
        try {
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
                                    value={account}
                                    onChangeText={(text) => {
                                        setAccount(text);
                                    }}
                                />
                                <Pressable
                                    style={styles._button}
                                    width={"34%"}
                                    onPress={() => {
                                        checkAccount(account);
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
                                style={styles.input}
                                width={'100%'}
                                placeholder="비밀번호 입력"
                                maxLength={15}
                                value={password}
                                onChangeText={(text) => setPassword(text)}
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
                            <View style={styles.horizon} width={"100%"}>
                                <TextInput
                                    style={styles.input}
                                    width={'60%'}
                                    placeholder="닉네임 입력"
                                    maxLength={10}
                                    value={nickname}
                                    onChangeText={(text) => {
                                        setNickname(text); //console.log(text)
                                    }}
                                />
                                <Pressable
                                    style={styles._button}
                                    width={"34%"}
                                    onPress={() => {
                                        checkNickname(nickname);
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
                            <View style={styles.horizon} width={"100%"}>
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
                                    style={styles._button}
                                    width={"34%"}
                                    onPress={() => {
                                        checkEmail(email);
                                    }}
                                >
                                    <Text style={styles.h2}>중복확인</Text>
                                </Pressable>
                            </View>
                        </View>
                        {/* 아이디 입력 */}
                        <View style={styles.input_field}>
                            <View style={styles.label_fields}>
                                <Text>지역 설정</Text>
                            </View>
                            <View style={styles.horizon}>
                                <TextInput
                                    style={styles.input}
                                    width={'60%'}
                                    placeholder="지역 입력"
                                    maxLength={10}
                                    value={city || ''}
                                    editable={false} // 수정 불가능하도록 설정
                                />
                                <Pressable
                                    style={styles._button}
                                    width={"34%"}
                                    onPress={() => {
                                        navigation.navigate('AddressScreen');
                                        // checkNickname(account);

                                    }}
                                >
                                    <Text style={styles.h2}>🧭 지역 검색</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    {/* 회원가입 버튼 */}
                    <View>
                        <Pressable
                            style={styles._button3} backgroundColor={"#A7C8E7"}
                            onPress={() => {
                                handleSignUp();
                                // navigation.navigate("Root")
                            }
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
    input_field: {
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