import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';

const BottomSheet = ({ setStatus }) => {
    const slide = React.useRef(new Animated.Value(300)).current;
    const navigation = useNavigation();


    const slideUp = () => {
        // Will change slide up the bottom sheet
        Animated.timing(slide, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        // Will slide down the bottom sheet
        Animated.timing(slide, {
            toValue: 300,
            duration: 800,
            useNativeDriver: true,
        }).start();
    };


    React.useEffect(() => {
        slideUp()
    })


    const closeModal = () => {
        slideDown();

        setTimeout(() => {
            setStatus(false);
        }, 800)

    }
    const navigateToTermsOfService = () => {
        navigation.navigate('TermsOfService');
    };

    const navigateToPrivacyPolicy = () => {
        navigation.navigate('PrivacyPolicy');
    };


    return (
        <Pressable onPress={closeModal} style={styles.backdrop}>
            {/* 아래 height가 모달이 얼마큼 올라올지 정하는거 */}
            {/* <Pressable style={{ width: '100%', height: '25%', }}> */}
            <Pressable style={{ width: '100%', height: Platform.OS === 'android' ? '29%' : '23%' }}>

                <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: slide }] }]}>
                    <Text style={{ fontSize: 23, fontWeight: 'bold', textAlign: "center" }}>다음을 읽고 동의해주십시오.</Text>
                    <Text style={styles.modalText}>
                        <Text
                            style={styles.modalText2}
                            onPress={() => {
                                // navigation.navigate('Root')
                                navigation.navigate('이용 약관')

                            }}
                        >
                            서비스 이용 약관
                        </Text>
                        <Text style={styles.modalText1} > 및 </Text>
                        <Text
                            style={styles.modalText2}
                            onPress={() => {
                                navigation.navigate('개인정보 처리방침')

                            }}
                        >
                            개인정보 처리방침
                        </Text>
                    </Text>
                    <View style={{ marginTop: 10 }}>

                        <TouchableOpacity style={styles.button}
                        onPress={() => {
                            // navigation.navigate('회원가입폼')
                            navigation.navigate('회원가입')
                            // navigation.navigate('Root')
                        }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>동의하고 계속하기
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Pressable>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'flex-end',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
    },
    bottomSheet: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ECECEC',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 30
    },
    input: {
        width: '100%',
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#bcbcbc',
        paddingHorizontal: 15,
        marginBottom: 10
    },
    button: {
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 30,
        backgroundColor: '#A7C8E7',
        alignItems: 'center',
        marginTop: 15,
        paddingVertical: 20, // 버튼의 세로 여백
    paddingHorizontal: 25, // 버튼의 가로 여백
    marginBottom: 5, // 버튼 간의 간격 조정을 위해 추가
    },
    modalText: {
        flexDirection: "row",
        textAlign: "center",
        marginTop: 10,
        
      },
      modalText1: {
        marginHorizontal: 2,
        marginBottom: 15,
        textAlign: "center",
      },
      modalText2: {
        fontWeight: "bold",
        marginHorizontal: 2,
        marginBottom: 15,
        justifyContent: 'center'

      },
})

export default BottomSheet;
