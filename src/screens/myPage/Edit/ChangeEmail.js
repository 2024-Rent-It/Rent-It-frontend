import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";


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

const ChangeEmail = ({ navigation }) => {
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
                        maxLength={10}
                    //value={nickName}
                    />
                    <Pressable
                        style={styles._button}
                        width={"34%"}
                        onPress={() => {
                            alert('sss')
                        }}
                    >
                        <Text style={styles.h2}>중복확인</Text>
                    </Pressable>
                </View>
            </View>

            <Pressable
                    style={styles._button3} backgroundColor={"#A7C8E7"}
                    onPress={() => {
                        //navigation.navigate("Root")
                    }}
                >
                    <Text style={styles.h2}>변경</Text>
                </Pressable>

        </View>
    );
};

export default ChangeEmail;