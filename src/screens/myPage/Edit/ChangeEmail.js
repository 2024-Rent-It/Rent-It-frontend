import React, { useState} from "react";
import { Alert, StyleSheet, View, Text, TextInput, Pressable } from "react-native";
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext'; 



const ChangeEmail = ({ navigation }) => {
    const { token } = useAuth(); // 로그인된 사용자 토큰 가져오기
    const { setUserEmail } = useAuth(); // 로그인된 사용자 토큰 가져오기
    const [newEmail, setNewEmail] = useState("");
    const [isEmailDuplicateChecked, setIsEmailDuplicateChecked] = useState(false);
    /** 이메일 중복 검사 함수 */
    const checkEmail = async (email) => {
        try {
            const response = await axios.post('http://localhost:8080/check-email', email, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
            Alert.alert(response.data);
            if (response.data == "사용 가능한 이메일입니다.") {
                setIsEmailDuplicateChecked(true);
            }
            console.log(response);
            console.log(email);
        } catch (error) {
            console.error('이메일 중복 확인 실패:', error);
            Alert.alert('알림', '중복 확인에 실패했습니다.');
        }
    };

    const updateEmail = async (newEmail,token) => {
        if (!isEmailDuplicateChecked) {
            Alert.alert('이메일 중복 확인이 필요합니다.');
            return;
        }
        // console.log(newNickname,token);

        try {
            const response = await axios.put('http://localhost:8080/member/update-email', null,
            {params:{ email: newEmail },
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            Alert.alert('변경되었습니다.');
            const updatedEmail = response.data.data.email; 
            setUserEmail(updatedEmail);
            navigation.navigate("Root")
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
        <View
            style={{ backgroundColor: '#ECECEC', height: '100%' }}>
            <Text style={styles.t1}>💡변경하려는 이메일을 입력해주세요</Text>
            <View>
                <TextInput />
            </View>

            <View style={styles.input_field}>

                <View style={styles.horizon} width={"100%"}>
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
            </View>

            <Pressable
                    style={styles._button3} backgroundColor={"#A7C8E7"}
                    onPress={() => {
                        updateEmail(newEmail, token);
                        //navigation.navigate("Root")
                    }}
                >
                    <Text style={styles.h2}>변경</Text>
                </Pressable>

        </View>
    );
};

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
    h2: {  //중복확인
        fontSize: 18,
    },
    horizon: {
        flexDirection: "row",
        marginBottom:"140%",
    },
    input: {  //입력
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
        width:"90%",
        marginLeft:'5%',
    },

});

export default ChangeEmail;