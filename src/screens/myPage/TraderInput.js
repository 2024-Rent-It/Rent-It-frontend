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
        // const currentDate = selectedDate || startDate;
        // setShowStartPicker(Platform.OS === 'ios');
        // setStartDate(currentDate);
        const currentDate = selectedDate || "24-00-00";
        setShowStartPicker(Platform.OS === 'ios');
        if (currentDate === "24-00-00") {
            setStartDate(currentDate);
        } else {
            setStartDate(currentDate);
        }
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
        navigation.navigate('내 상품 관리', {
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

                {
                    showStartPicker ? (
                        <Pressable onPress={() => {
                            setShowStartPicker(true)
                            // setShowEndPicker(false)
                        }
                        }>
                            <DateTimePicker
                                value={startDate || new Date()} // 이 부분은 실제로 선택된 날짜나, 기본 날짜를 나타냅니다.
                                mode="date"
                                display="default"
                                onChange={onChangeStart}
                            />
                        </Pressable>
                    ) : (
                        <TouchableOpacity
                            style={styles.dateButton}
                            onPress={() => setShowStartPicker(true)}>
                            <Text style={styles.dateText}>시작일 선택</Text>
                        </TouchableOpacity>
                    )
                }

                <Text style={styles.h3}> 부터 </Text>

                {
                    showEndPicker ? (
                        <Pressable onPress={() => {
                            setShowEndPicker(true)

                            }}>
                            <DateTimePicker
                                value={endDate || new Date()} // 이 부분은 실제로 선택된 날짜나, 기본 날짜를 나타냅니다.
                                mode="date"
                                display="default"
                                onChange={onChangeEnd}
                            />
                        </Pressable>
                    ) : (
                        <TouchableOpacity
                            style={styles.dateButton}
                            onPress={() => setShowEndPicker(true)}>
                            <Text style={styles.dateText}>반납일 선택</Text>
                        </TouchableOpacity>
                    )
                }

                <Text style={styles.h3}> 까지 </Text>
            </View>


            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                {
                    showStartPicker ? (
                        <Pressable onPress={() => setShowStartPicker(false)}>
                            <DateTimePicker
                                value={startDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    onChangeStart(event, selectedDate);
                                    // setShowStartPicker(false); // 이 부분을 제거합니다.
                                }}
                            />
                        </Pressable>
                    ) : (
                        <TouchableOpacity
                            style={styles.dateButton}
                            onPress={() => {
                                setShowStartPicker(true);
                                setShowEndPicker(false);
                            }}>
                            <Text style={styles.dateText}>{startDate ? startDate.toLocaleDateString() : '시작일 선택'}</Text>
                        </TouchableOpacity>
                    )
                }

                <Text style={styles.h3}> 부터 </Text>

                {
                    showEndPicker ? (
                        <Pressable onPress={() => setShowEndPicker(false)}>
                            <DateTimePicker
                                value={endDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    onChangeEnd(event, selectedDate);
                                    // setShowEndPicker(false); // 이 부분을 제거합니다.
                                }}
                            />
                        </Pressable>
                    ) : (
                        <TouchableOpacity
                            style={styles.dateButton}
                            onPress={() => {
                                setShowEndPicker(true);
                                setShowStartPicker(false);
                            }}>
                            <Text style={styles.dateText}>{endDate ? endDate.toLocaleDateString() : '반납일 선택'}</Text>
                        </TouchableOpacity>
                    )
                }

                <Text style={styles.h3}> 까지 </Text>
            </View> */}







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
    },
    dateButton: {
        // width: '60%',
        height: 60,
        borderRadius: 16,
        borderColor: "#D9D9D9",
        borderWidth: 1,
        fontSize: 18,
        paddingHorizontal: 15,
        paddingVertical: 18,
        marginBottom: 10,
        backgroundColor: '#D9D9D9',
        marginLeft: "2%",
    },
    dateText: {
        fontSize: 17,
        // backgroundColor:'#D9D9D9'
    },
});

export default TraderInput;
