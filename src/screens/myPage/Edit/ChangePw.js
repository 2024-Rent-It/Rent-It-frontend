import React, { useState} from "react";
import { Alert, StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';

const ChangePw = ({ navigation }) => {
    const { token } = useAuth(); // 로그인된 사용자 토큰 가져오기
    const [currentPassword, setCurrentPassword] = useState("");

    const checkPassword = async (currentPassword,token) => {
        try {
            const response = await axios.put('http://localhost:8080/member/check-password', null,
            {params:{ currentPassword: currentPassword },
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            Alert.alert('확인되었습니다.');
            navigation.navigate("ChangePW2");
        } catch (error) {
            console.error('비밀번호가 틀렸습니다. 다시 입력해주세요.');
            if (error.response) {
                // 서버가 응답한 경우
                console.error('응답 데이터:', error.response);
                console.error('응답 상태 코드:', error.response.status);
            }
        }

    };
    return (
        <View
            style={{ backgroundColor: '#ECECEC', height: '100%' }}>
            <Text style={styles.t1}>👆🏻기존 비밀번호를 입력해주세요</Text>
            <View>
                <TextInput />
            </View>

            <View style={styles.input_field}>

                <View style={styles.horizon} width={"100%"}>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        placeholder="비밀번호 입력"
                        value={currentPassword}
                        onChangeText={(text) => {
                            setCurrentPassword(text);
                        }}
                    />
                </View>
            </View>

            <Pressable
                style={styles._button3} backgroundColor={"#A7C8E7"}
                onPress={() => {
                    checkPassword(currentPassword,token);
                }}
            >
                <Text style={styles.h2}>확인</Text>
            </Pressable>

        </View>
    )
};

export default ChangePw;

const styles = StyleSheet.create({
    t1: {  //질문 (~~을 입력해주세요)
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
    input: {  //입력
        height: 60,
        width: "90%",
        borderRadius: 16,
        borderColor: "#ffffff",
        borderWidth: 1,
        fontSize: 18,
        paddingHorizontal: 15,
        paddingVertical: 18,
        marginBottom: 10,
        backgroundColor: "#ffffff",
        marginLeft: "4%",
    },
    _button3: {
        backgroundColor: "#A7C8E7",
        alignItems: "center",
        padding: 20,
        borderRadius: 16,
        height: 60,
        marginBottom: "6%",
        width:"90%",
        marginLeft:'5%',
    },

});