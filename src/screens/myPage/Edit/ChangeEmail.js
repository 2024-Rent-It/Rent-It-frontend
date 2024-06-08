import React, { useState } from "react";
import { Alert, StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import { BASE_URL } from '../../../constants/api.js';


const ChangeEmail = ({ navigation }) => {
    const { token } = useAuth(); // 로그인된 사용자 토큰 가져오기
    const { setUserEmail } = useAuth(); // 로그인된 사용자 토큰 가져오기
    const [newEmail, setNewEmail] = useState("");
    const [isEmailDuplicateChecked, setIsEmailDuplicateChecked] = useState(false);

    /** 이메일 중복 검사 함수 */
    const checkEmail = async (email) => {
        const checkEmailPath = `/emails/${email}`;
        try {
            // const response = await axios.get(`http://localhost:8080/emails/${email}`);
            const response = await axios.get(`${BASE_URL}${checkEmailPath}`);
            Alert.alert(response.data);
            console.log("checkEmailPath", checkEmailPath);
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
    const updateEmail = async (newEmail, token) => {
        const updateEmailPath = `/member/update-email`;
        if (!isEmailDuplicateChecked) {
            Alert.alert('이메일 중복 확인이 필요합니다.');
            return;
        }
        // console.log(newNickname,token);

        try {
            // const response = await axios.put('http://localhost:8080/member/update-email', null,
            const response = await axios.put(`${BASE_URL}${updateEmailPath}`, null,
                {
                    params: { email: newEmail },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
            Alert.alert('변경되었습니다.');
            const updatedEmail = response.data.data.email;
            setUserEmail(updatedEmail);
            navigation.navigate("마이페이지")
        } catch (error) {
            console.error('이메일 변경 실패:', error);
            if (error.response) {
                // 서버가 응답한 경우
                console.error('응답 데이터:', error.response);
                console.error('응답 상태 코드:', error.response.status);
            }
        }
    }
    return (
        <View>
            <Text style={styles.t1}>💡변경하려는 이메일을 입력해주세요</Text>

            <View style={styles.input_field}>

                <View style={styles.horizon} width={"100%"} >
                    <TextInput
                        keyboardType="email-address"
                        style={styles.input}
                        width={'60%'}
                        placeholder="이메일 입력"
                        value={newEmail}
                        onChangeText={(text) => {
                            setNewEmail(text);
                        }}
                    />
                    <Pressable
                        style={styles._button}
                        width={"34%"}
                        onPress={() => {
                            checkEmail(newEmail);
                        }}
                    >
                        <Text style={styles.h2}>중복확인</Text>
                    </Pressable>
                </View>

                <Pressable
                    style={styles._button3} backgroundColor={"#A7C8E7"}
                    onPress={() => {
                        updateEmail(newEmail, token);
                    }}
                >
                    <Text style={styles.h2}>변경</Text>
                </Pressable>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    t1: { 
        fontSize: 20,
        margin: 10,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    input_field: {
        height:100,
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

export default ChangeEmail;