import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, Alert, StyleSheet,Keyboard, Pressable,TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext.js'; // AuthContext 파일의 useAuth 훅 가져오기
import axios from 'axios';
import { BASE_URL } from '../../src/constants/api.js';


const KeywordRegis = ({ }) => {
    const { userNickname } = useAuth();
    const { token } = useAuth(); // 로그인된 사용자 토큰 가져오기
    const [regisKeyword, setRegisKeyword] = useState('');
    const [keywordList, setKeywordList] = useState([]);

    useEffect(() => {
        getAllMyKeyword(); // 제품 정보 가져오기
    }, []);

      const getAllMyKeyword = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/keyword/user/${userNickname}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
          console.log("keyword",response.data);
         const newKeyword = response.data.map(item => ({
          keyword: {keywordId: item.id, name : item.name}
        }));
    
        // 변환된 데이터를 products 상태로 설정
        setKeywordList(newKeyword);
    
        console.log("키워드리스트안에걸 보고싶다", keywordList);
    
    
        } catch (error) {
          console.error('getallmykeyword 에러:', error);
        } finally {
        //   setIsLoading(false);
        }
      };

      
    const handleRegisterKeyword = async (token) => {
        if (regisKeyword.trim() === '') {
                    Alert.alert('키워드를 입력해주세요.');
                    return;
        }
        console.log(regisKeyword);

        try {
          const response = await axios.post(
            `${BASE_URL}/keyword/add`,
            null,
            {
              params: {
                name: regisKeyword
              },
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
            }
          );
          if (response.status == 201) {
            console.log('키워드 등록되었습니다');
            setRegisKeyword('');
             getAllMyKeyword();
            // getProductById();
          } else {
            // 오류 처리해야댐
          }
        } catch (error) {
          console.error("키워드 등록 에러",error);
          // 오류 처리해야댐
        }
      };

    // const handleRegisterKeyword = () => {
    //     if (regisKeyword.trim() === '') {
    //         Alert.alert('키워드를 입력해주세요.');
    //         return;
    //     }

    //     // 등록된 키워드 리스트에 추가
    //     const updatedKeywordList = [...keywordList, regisKeyword.trim()];
    //     setKeywordList(updatedKeywordList);
    //     console.log('등록된 키워드:', regisKeyword);
    //     console.log('모든 키워드:', updatedKeywordList);

    //     // 등록 후 TextInput 초기화
    //     setRegisKeyword('');
    // };


    const handleRemoveKeyword = async (keywordId) => {
        console.log("삭제할 아이디 확인",keywordId);
        try {
          await axios.delete(`${BASE_URL}/keyword/${keywordId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
          console.log('Keyword deleted successfully');
          
        } catch (error) {
          console.error('Error handleRemoveKeyword:', error);
        }
        getAllMyKeyword();
      };

    // const handleRemoveKeyword = (keywordToRemove) => {
    //     const updatedKeywordList = keywordList.filter(keyword => keyword !== keywordToRemove);
    //     setKeywordList(updatedKeywordList);
    //     console.log('지우고 이렇게 키워드:', updatedKeywordList);
    // };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

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
                        onPress={() => handleRegisterKeyword(token)}
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
                            <Text style={styles.keywordText}>{keyword.keyword.name}</Text>
                            <Pressable
                                style={styles.deleteButton}
                                onPress={() => handleRemoveKeyword(keyword.keyword.keywordId)}>
                                <AntDesign name="delete" size={22} color="black" />
                            </Pressable>
                        </View>
                    ))}
                </View>
            </View>
        </TouchableWithoutFeedback>

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
    deleteButton: {
    },
});

export default KeywordRegis;