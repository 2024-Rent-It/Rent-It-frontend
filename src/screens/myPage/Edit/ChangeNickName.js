import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import { BASE_URL } from '../../../constants/api.js';


const ChangeNickName = ({ navigation }) => {
    const { token } = useAuth(); // 로그인된 사용자 토큰 가져오기
    const { setUserNickname } = useAuth(); // setUserNickname 함수 가져오기
    const [newNickname, setNewNickname] = useState("");
    const [isNicknameDuplicateChecked, setIsNicknameDuplicateChecked] = useState(false);


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

    const updateNickname = async (newNickname, token) => {
        const updateNicknamePath = '/member/update-nickname';
        if (!isNicknameDuplicateChecked) {
            Alert.alert('닉네임 중복 확인이 필요합니다.');
            return;
        }
        // console.log(newNickname,token);

        try {
            // const response = await axios.put('http://localhost:8080/member/update-nickname', null,
            const response = await axios.put(`${BASE_URL}${updateNicknamePath}`, null,
                {
                    params: { nickname: newNickname },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        // "Content-Type": "application/json",
                    }
                });

            Alert.alert('변경되었습니다.');
            const updatedNickname = response.data.data.nickname;
            // console.log("업데이트 닉네임 확인",response.data.data.nickname)
            setUserNickname(updatedNickname);
            // console.log(response.data);

            navigation.navigate("마이페이지")
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
        <View>
            <Text style={styles.t1}>💡변경하려는 닉네임을 입력해주세요</Text>

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

                <Pressable
                    style={styles._button3} backgroundColor={"#A7C8E7"}
                    onPress={() => {
                        updateNickname(newNickname, token);
                        //navigation.navigate("Root")
                    }}
                >
                    <Text style={styles.h2}>변경</Text>
                </Pressable>
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
        marginTop: "3%",
        marginBottom: "5%",
        height:100,
        // borderWidth:1,
    },
    h2: {
        fontSize: 18,
    },
    horizon: {
        flexDirection: "row",
        marginBottom: "6%",
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
    _button3: {
        backgroundColor: "#A7C8E7",
        alignItems: "center",
        padding: 20,
        borderRadius: 16,
        height: 60,
        marginBottom: "6%",
        width: "90%",
        marginLeft: '5%',
    },

});