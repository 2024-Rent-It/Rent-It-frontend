import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";


const ChangePw = ({ navigation }) => {
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
                        maxLength={10}
                    //value={nickName}
                    />
                </View>
            </View>

            <Pressable
                style={styles._button3} backgroundColor={"#A7C8E7"}
                onPress={() => {
                    //navigation.navigate("Root")
                }}
            >
                <Text style={styles.h2}>회원가입</Text>
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