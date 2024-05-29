import { View, Text, TouchableOpacity, Platform, ScrollView } from "react-native";
import { StyleSheet } from 'react-native';
import React from "react";
import { useAuth } from '../../../contexts/AuthContext'; // AuthContext 파일의 useAuth 훅 가져오기


const MyInfo = ({ navigation }) => {
    const { userNickname } = useAuth();
    const { userEmail } = useAuth();

    return (
        <View
            style={{ backgroundColor: '#ECECEC' }}>
            <Text style={{ fontSize: 20, margin: 10, marginBottom: 0, fontWeight: 'bold' }}>계정 정보</Text>
            <View style={styles.edit}>
                <ScrollView>
                    <View style={styles.InfoList}>
                        <View style={styles.InfoText}>
                            <Text style={styles.InfoTitle}>닉네임</Text>
                            <Text style={styles.InfoDetail}>{userNickname}</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('ChangeNickName')}>
                            <Text style={styles.EditButton}>변경</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.InfoList}>
                        <View style={styles.InfoText}>
                            <Text style={styles.InfoTitle}>비밀번호</Text>
                            <Text style={styles.InfoDetail}>****</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('ChangePw')}>
                            <Text style={styles.EditButton}>변경</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.InfoList}>
                        <View style={styles.InfoText}>
                            <Text style={styles.InfoTitle}>이메일</Text>
                            <Text style={styles.InfoDetail}>{userEmail}</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('ChangeEmail')}>
                            <Text style={styles.EditButton}>변경</Text>
                        </TouchableOpacity>
                    </View>
                    
                </ScrollView>
            </View>
        </View>
    );
};

export default MyInfo;

const styles = StyleSheet.create({
    edit: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 5,
    },
    InfoList: {
        borderBottomWidth: 0.2,
        padding: 10,
        flexDirection:'row',
        height:60,
    },
    InfoText:{
        margin:3,
        width:'88%',
    },
    InfoTitle: {
        fontSize: 20,
    },
    InfoDetail: {

    },
    EditButton:{
        fontSize:20,
        marginTop:10,
        fontWeight:'bold',
    },
});