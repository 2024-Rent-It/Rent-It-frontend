import React, { useState } from 'react';
import { View, TextInput, Text, FlatList, Image, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const KeywordRegis = ({  }) => {

    const [regisKeyword, setRegisKeyword] = useState('');
    const [keywordList, setKeywordList] = useState([]);

    const handleRegisterKeyword = () => {
        if (regisKeyword.trim() === '') {
            Alert.alert('키워드를 입력해주세요.');
            return;
        }

        // 등록된 키워드 리스트에 추가
        const updatedKeywordList = [...keywordList, regisKeyword.trim()];
        setKeywordList(updatedKeywordList);
        console.log('등록된 키워드:', regisKeyword);
        console.log('모든 키워드:', updatedKeywordList);

        // 등록 후 TextInput 초기화
        setRegisKeyword('');
    };

    const handleRemoveKeyword = (keywordToRemove) => {
        const updatedKeywordList = keywordList.filter(keyword => keyword !== keywordToRemove);
        setKeywordList(updatedKeywordList);
        console.log('지우고 이렇게 키워드:', updatedKeywordList);
    };


    return (

        <View style={styles.container}>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.inputKeyword}
                    placeholder="알림 받을 키워드를 입력해주세요"
                    value={regisKeyword}
                    onChangeText={setRegisKeyword}
                />
                <Pressable
                    style={styles.button}
                    onPress={handleRegisterKeyword}
                >
                    <Text style={styles.buttonText}>등록</Text>
                </Pressable>
            </View>

            <View>
                <Text style={styles.sampleText}>
                    게시물 제목에 포함될 수 있는 키워드를 등록해주세요.
                    {'\n'}
                    (최대 5개 등록 가능)
                    {'\n'}
                    ex) 다리미, 후라이팬, 핸드폰
                </Text>
            </View>

            <View style={styles.keywordListContainer}>
                {keywordList.map((keyword, index) => (
                    <View key={index} style={styles.keywordItem}>
                        <Text style={styles.keywordText}>{keyword}</Text>
                        <Pressable
                            style={styles.deleteButton}
                            onPress={() => handleRemoveKeyword(keyword)}>
                            <AntDesign name="delete" size={22} color="black" />
                        </Pressable>
                    </View>
                ))}
            </View>
        </View>

    );

};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        height: '140%',
    },
    inputContainer: {
        height: '6%',
        borderWidth: 1,
        borderRadius: 14,
        borderColor: 'grey',
        margin: '6%',
        marginHorizontal: '6%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputKeyword: {
        fontSize: 17,
        flex: 1,
        fontWeight: '600',
        paddingLeft: 20,
    },
    button: {
        width: '30%',
        height: '100%',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: '5%',
    },
    buttonText: {
        fontSize: 20,
        color: 'grey',
    },
    sampleText: {
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 25,
    },
    keywordListContainer: {
        marginTop: '7%',
        alignItems: 'center',
    },
    keywordItem: {
        flexDirection: 'row',
        width: '80%',
        height: 60,
        backgroundColor: '#DDEAF6',
        borderRadius: 25,
        paddingLeft: '5%',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 10,
        marginBottom: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    keywordText: {
        fontSize: 17,
    },
    deleteButton:{
    },
});

export default KeywordRegis;