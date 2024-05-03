import React from "react";
import { StyleSheet, View, Text, Pressable, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import { BASE_URL } from '../../../constants/api.js';

const LocationSetting = ({ navigation }) => {
    const route = useRoute();
    const { token } = useAuth(); // 로그인된 사용자 토큰 가져오기
    const { userLocation } = useAuth(); // 로그인된 사용자 지역 가져오기
    const { setUserLocation } = useAuth(); // setUserLocation 함수 가져오기
    const { city } = route.params || {}; // 동네 정보(city)를 받아옴

    const updateLocation = async (newNickname, token) => {
        const updateLocationPath = '/member/update-location';

        try {
            const response = await axios.put(`${BASE_URL}${updateLocationPath}`, null,
                {
                    params: { location: city },
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

            Alert.alert('변경되었습니다.');
            const updatedLocation = response.data.data.location;
            setUserLocation(updatedLocation);

            navigation.navigate("Root")
        } catch (error) {
            console.error('지역 변경 실패:', error);
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
            <Text style={styles.t1}>💡변경하려는 지역을 선택해주세요</Text>
            <View>
                <TextInput />
            </View>

            <View style={styles.input_field}>

                <View style={styles.horizon} width={"100%"}>
                    <TextInput
                        style={styles.input}
                        width={'60%'}
                        placeholder={userLocation}
                        maxLength={10}
                        value={city || ''}
                        editable={false} // 수정 불가능하도록 설정
                    />
                    <Pressable
                        style={styles._button}
                        width={"34%"}
                        onPress={() => {
                            navigation.navigate('AddressScreen');
                        }}
                    >
                        <Text style={styles.h2}>🧭 지역 검색</Text>
                    </Pressable>
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

        </View>







    );
};

export default LocationSetting;

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
        fontSize: 16,
    },
    horizon: {
        flexDirection: "row",
        height:'85%',
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
        marginRight: "4%",
    },
    _button: {
        backgroundColor: "#CDCDCD",
        alignItems: "center",
        paddingTop: "5%",
        borderRadius: 16,
        height: 60,
        width: '29%',
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
    h2: {  //중복확인
        fontSize: 18,
    },

});