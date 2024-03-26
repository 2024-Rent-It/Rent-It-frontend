import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    emailInput: {
        backgroundColor: 'white',
        borderRadius:20,
        width:'70%',
        height:'20%',
        margin:15,
    },
})

const ChangeEmail = ({ navigation }) => {
    return (
        <View
            style={{ backgroundColor: '#ECECEC', height:'100%'}}>
            <Text style={{ fontSize: 20, margin: 10, marginBottom: 0, fontWeight: 'bold' }}>💡변경하려는 이메일을 입력해주세요</Text>
            <View>
                <TextInput style={styles.emailInput} />
            </View>
        </View>
    );
};

export default ChangeEmail;