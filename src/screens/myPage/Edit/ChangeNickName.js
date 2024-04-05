import React, { useState} from "react";
import { Alert, StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext'; // AuthContext 파일의 useAuth 훅 가져오기

const ChangeNickName = ({ navigation }) => {
    const { token } = useAuth(); // 로그인된 사용자 토큰 가져오기
    const [newNickname, setNewNickname] = useState("");
    const [isNicknameDuplicateChecked, setIsNicknameDuplicateChecked] = useState(false);

    /** 닉네임 중복 검사 함수 */
    const checkNickname = async (newNickname) => {
        try {
            const response = await axios.post('http://localhost:8080/check-nickname', newNickname, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            Alert.alert(response.data);
            if (response.data == "사용 가능한 닉네임입니다.") {
                setIsNicknameDuplicateChecked(true);
            }
        } catch (error) {
            console.error('닉네임 중복 확인 실패:', error);
            Alert.alert('알림', '중복 확인에 실패했습니다.');
        }
    };

    const updateNickname = async (newNickname,token) => {
        if (!isNicknameDuplicateChecked) {
            Alert.alert('닉네임 중복 확인이 필요합니다.');
            return;
        }
        // console.log(newNickname,token);

        try {
            const response = await axios.put('http://localhost:8080/member/update-nickname', null,
            {params:{ nickname: newNickname },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // "Content-Type": "application/json",
                }
            });
            Alert.alert('변경되었습니다.');
            navigation.navigate("Root")
        } catch (error) {
            console.error('닉네임 변경 실패:', error);
            if (error.response) {
                // 서버가 응답한 경우
                console.error('응답 데이터:', error.response);
                console.error('응답 상태 코드:', error.response.status);
            }
        }
    }

    

    return (
        <View
            style={{ backgroundColor: '#ECECEC', height: '100%' }}>
            <Text style={styles.t1}>💡변경하려는 닉네임을 입력해주세요</Text>
            <View>
                <TextInput />
            </View>

            <View style={styles.input_field}>

                <View style={styles.horizon} width={"100%"}>
                    <TextInput
                        style={styles.input}
                        width={'60%'}
                        placeholder="닉네임 입력"
                        maxLength={10}
                        value={newNickname}
                        onChangeText={(text) => {
                            setNewNickname(text);
                        }}
                    />
                    <Pressable
                        style={styles._button}
                        width={"34%"}
                        onPress={() => {
                            checkNickname(newNickname);
                        }}
                    >
                        <Text style={styles.h2}>중복확인</Text>
                    </Pressable>
                </View>
                {/* 영서야 아래 내가 주석 단 부분이 테스트하려고 그냥 임의로 만들어놓은거얌. 스타일 이뿌게 해서 버튼 넣어죠(하트) */}
                {/* <View>
                        <Pressable
                            style={styles._button3} backgroundColor={"#A7C8E7"}
                            onPress={() => {
                                updateNickname(newNickname,token);
                                // navigation.navigate("Root")
                            }
                            }
                        >
                            <Text style={styles.h2}>회원가입</Text>
                        </Pressable>
                    </View> */}
            </View>

        </View>
    );
};

export default ChangeNickName;

const styles = StyleSheet.create({
    t1: {
        fontSize: 20,
        margin: 10,
        marginBottom: 0,
        fontWeight: 'bold'
    },
    input_field: {
        marginBottom: "5%",
    },
    h2: {
        fontSize: 18,
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
        marginLeft: "4%",
        marginRight: "6%",
    },
    _button: {
        backgroundColor: "#CDCDCD",
        alignItems: "center",
        padding: "5%",
        borderRadius: 16,
        height: 60,
        width: '27%',
    },

});