import React from "react";
import styled from "styled-components";
import { Image, TouchableOpacity, StyleSheet, Text, Alert} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import krr from "/Users/jeongabae/Downloads/rentit99/assets/images/k.png";
import { View } from "react-native";
import { useAuth } from '../../contexts/AuthContext'; // AuthContext 파일의 useAuth 훅 가져오기

const MyPage = ({ navigation }) => {
    const { logout } = useAuth(); // 로그아웃 함수 가져오기
    const { userNickname } = useAuth();

    const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
    Alert.alert('로그아웃 성공', '로그아웃되었습니다.');
    navigation.navigate('Onboarding')
  };

    return (
        <View style={{ height: '100%',backgroundColor: 'white', padding: 30 }} >

            <View style={{ flexDirection: 'row' }} >

                <Image source={krr} style={styles.ProfileImage} />
                <TouchableOpacity onPress={() => alert('clicked!')}>
                    <MaterialCommunityIcons name="plus-circle" size={24} color="black" />
                </TouchableOpacity>

                <StyledText style={{ flex: 1 }}>
                    {userNickname}
                </StyledText>

                <TouchableOpacity onPress={() => navigation.navigate('EditInfo')}
                    style={styles.Edit}
                >
                    <Text style={{ fontSize: 15, alignItems: 'center', fontWeight: 'bold' }}>
                        정보 수정
                    </Text>
                </TouchableOpacity>

            </View>

            <View style={styles.container}>

                <TouchableOpacity
                    disabled={true}
                    style={{ paddingVertical: 6 }}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                        나의 거래
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('MyFav')}
                    style={{ paddingVertical: 6 }}
                >
                    <Text style={styles.text}>
                        나의 관심 상품
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('MyThing')}
                    style={{ paddingVertical: 6 }}
                >
                    <Text style={styles.text}>
                        내 상품 관리
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('MyRent')}
                    style={{ paddingVertical: 6 }}
                >
                    <Text style={styles.text}>
                        대여 내역
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <TouchableOpacity
                    disabled={true}
                    style={{ paddingVertical: 6 }}
                >
                    <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                        서비스 정보
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('TermsOfService')}
                    style={{ paddingVertical: 6 }}
                >
                    <Text style={styles.text}>
                        이용 약관
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('PrivacyPolicy')}
                    style={{ paddingVertical: 6 }}
                >
                    <Text style={styles.text}>
                        개인정보 처리방침
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('LocationService')}
                    style={{ paddingVertical: 6 }}
                >
                    <Text style={styles.text}>
                        위치기반 서비스 이용약관
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('VersionInfo')}
                    style={{ paddingVertical: 6 }}
                >
                    <Text style={styles.text}>
                        버전 정보
                    </Text>
                </TouchableOpacity>

            </View>

            <View style={[styles.container,{ borderBottomWidth: 0 }]}>

                <TouchableOpacity onPress={() => navigation.navigate('MyRent')}
                    style={{ paddingVertical: 6 }}
                >
                    <Text style={styles.text}>
                        공지사항
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogout}
                    style={{ paddingVertical: 6 }}
                >
                    <Text style={styles.text}>
                        로그아웃
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('MyRent')}
                    style={{ paddingVertical: 6 }}
                >
                    <Text style={styles.text}>
                        회원탈퇴
                    </Text>
                </TouchableOpacity>


            </View>


        </View>

    );
};


const StyledText = styled.Text`
    font-size:20px;
    padding:10px;
`;



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        fontSize: 17,
    },
    ProfileImage: {
        aspectRatio: 1,
        width: '18%',
        height: '18%',
        borderRadius:40,
    },
    Edit: {
        width: 100,
        height: 50,
        backgroundColor: "#DDEAF6",
        padding: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 20,
    },

})


export default MyPage;