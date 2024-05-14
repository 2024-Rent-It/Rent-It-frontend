import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, Pressable, Alert } from "react-native";
// import DatePicker from 'react-native-date-picker'
import DateTimePicker from '@react-native-community/datetimepicker';


const TraderInput = ({ navigation, route }) => {
    const { productId, updateProductStatus, productInfo, handleStatusChange } = route.params;
    const [traderName, setTraderName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
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
        handleStatusChange('렌트중', traderName, startDate, endDate)
        setStatus('렌트중')
        updateProductStatus(productId, traderName, startDate, endDate, '렌트중');
        // navigation.navigate('MyThing', { productId,traderName, startDate, endDate });
        navigation.navigate('MyThing', {
            // productId: id,
            updateProductStatus,
            handleStatusChange,
            productInfo: { traderName, startDate, endDate }
        });
        // console.log(productId, traderName, startDate, endDate, status);

    };

    return (
        <View
            style={{ backgroundColor: '#ECECEC', }}>

            <Text style={styles.t1}>거래하는 상대방의 닉네임을 입력해주세요</Text>


            <View style={styles.input_field}>


                <TextInput
                    style={styles.input}
                    width={'60%'}
                    placeholder="닉네임 입력"
                    // value={newEmail}
                    onChangeText={(text) => {
                        setTraderName(text);
                    }}
                />
                <Text style={styles.t1}>대여 시작일과 반납일을 기입해주세요</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <Pressable
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="시작일 입력"
                            onChangeText={setStartDate}
                        ></TextInput>

                    </Pressable> */}
                    <Pressable
                        style={styles.input}
                        onPress={() => setShowStartPicker(true)}>
                        {showStartPicker && (
                            <DateTimePicker
                                value={startDate}
                                mode="date"
                                display="default"
                                onChange={onChangeStart}
                            />
                        )}
                        <Text>시작일 입력</Text>
                    </Pressable>
                    <Text style={styles.h3}> 부터 </Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Pressable
                    >
                        <TextInput
                            style={styles.input}
                            placeholder="반납일 입력"
                            onChangeText={setEndDate}
                        ></TextInput>

                    </Pressable>
                    <Text style={styles.h3}> 까지 </Text>
                </View>


            </View>


            <TouchableOpacity
                style={styles._button3} backgroundColor={"#A7C8E7"}
                onPress={() => {
                    confirmRental(traderName, startDate, endDate);
                }}
            >
                <Text style={styles.h2}>확인</Text>
            </TouchableOpacity>

        </View>
        // <View>
        //     <Text> 제발요 </Text>
        // </View>
    );
};

const styles = StyleSheet.create({
    t1: {  //질문 (~~을 입력해주세요)
        marginLeft: 30,
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
    },
    h3: {
        fontSize: 25,
        alignContent: 'center',
        textAlignVertical: 'center',
    }
});

export default TraderInput;
