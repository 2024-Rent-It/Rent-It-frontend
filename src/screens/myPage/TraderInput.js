import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Pressable } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';



const TraderInput = ({ navigation, route }) => {
    const { productId, updateProductStatus, productInfo, handleStatusChange } = route.params;
    const [traderName, setTraderName] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [status, setStatus] = useState('');
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || startDate;
        setShowStartPicker(Platform.OS === 'ios');
        setStartDate(currentDate);
    };

    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || endDate;
        setShowEndPicker(Platform.OS === 'ios');
        setEndDate(currentDate);
    };


    useEffect(() => {
        if (productInfo) {
            const { traderName, startDate, endDate } = productInfo;
            setTraderName(traderName);
            setStartDate(startDate);
            setEndDate(endDate);
            setStatus('렌트중');
        }
    }, [productInfo]);

    // 확인 버튼 이벤트 핸들러
    const confirmRental = () => {
        const formatDateString = (date) => {
            
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // 월은 0부터 시작
            const day = date.getDate();

            // `padStart(2, '0')`를 사용하여 일과 월이 한 자리 숫자일 때 앞에 0을 붙임
            return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        };

        const formattedStartDate = formatDateString(startDate);
        const formattedEndDate = formatDateString(endDate);
        handleStatusChange('렌트중', traderName, formattedStartDate, formattedEndDate)
        setStatus('렌트중')
        updateProductStatus(productId, traderName, formattedStartDate, formattedEndDate, '렌트중');
        // navigation.navigate('MyThing', { productId,traderName, startDate, endDate });
        navigation.navigate('MyThing', {
            // productId: id,
            updateProductStatus,
            handleStatusChange,
            productInfo: { traderName, startDate: formattedStartDate, endDate: formattedEndDate }
        });
        console.log(productId, traderName, startDate, endDate, status);
        console.log("여기까진 갠찮다 이거야...TraderInput이다F")
    };

    return (
        <View
            style={{ backgroundColor: '#ECECEC', }}>

            <Text style={styles.t1}>거래하는 상대방의 닉네임을 입력해주세요</Text>


            {/* <View style={styles.input_field}> */}


            <TextInput
                style={styles.input}
                width={'60%'}
                placeholder="닉네임 입력"
                onChangeText={(text) => {
                    setTraderName(text);
                }}
            />
            <Text style={styles.t1}>대여 시작일과 반납일을 기입해주세요</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                <Pressable
                    onPress={() => setShowStartPicker(true)}>
                    <DateTimePicker
                        value={startDate || new Date()} // startDate가 유효하지 않은 경우, 새로운 날짜 객체를 사용
                        mode="date"
                        display="default"
                        onChange={onChangeStart}
                    />

                </Pressable>
                <Text style={styles.h3}> 부터 </Text>

                <Pressable
                    onPress={() => setShowEndPicker(true)}>
                    <DateTimePicker
                        value={endDate || new Date()} // startDate가 유효하지 않은 경우, 새로운 날짜 객체를 사용
                        mode="date"
                        display="default"
                        onChange={onChangeEnd}
                    />

                </Pressable>
                <Text style={styles.h3}> 까지 </Text>
            </View>

            {/* </View> */}


            <TouchableOpacity
                style={styles._button3} backgroundColor={"#A7C8E7"}
                onPress={() => {
                    confirmRental(traderName, startDate, endDate);
                }}
            >
                <Text style={styles.h2}>확인</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    t1: {  //질문 (~~을 입력해주세요)
        marginLeft: 20,
        marginTop: 20,
        fontSize: 20,
        margin: 10,
        marginBottom: 17,
        fontWeight: 'bold',
        // borderWidth:1,
    },
    input_field: {
        marginLeft: 17,
        marginBottom: "5%",
    },
    h2: {  //중복확인
        fontSize: 18,
    },
    horizon: {
        flexDirection: "row",
        marginBottom: "140%",
    },
    input: {  //입력
        width: '60%',
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
        marginTop: 20,
    },
    h3: {
        fontSize: 25,
        alignContent: 'center',
        textAlignVertical: 'center',
    }
});

export default TraderInput;
