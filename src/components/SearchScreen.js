
import React, { useState, useEffect } from 'react';
import {
    View,
    TextInput,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext.js'; // AuthContext 파일의 useAuth 훅 가져오기
import axios from 'axios';
import { BASE_URL } from '../../src/constants/api.js';

const SearchScreen = ({ navigation }) => {
    const { userLocation } = useAuth();
    const [searchKeyword, setSearchKeyword] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [sortType, setSortType] = useState(null);
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [title, setTitle] = useState(''); // 상품명
    const [location, setLocation] = useState(''); // 지역
    const [price, setPrice] = useState(''); // 가격
    const [duration, setDuration] = useState(''); // 기간
    const [selectedImage, setSelectedImage] = useState([]); // 첫번째 이미지

    useEffect(() => {
        retrieveSearchHistory();
    }, []);

    const retrieveSearchHistory = async () => {
        try {
            const storedHistory = await AsyncStorage.getItem('searchHistory');
            if (storedHistory !== null) {
                setSearchHistory(JSON.parse(storedHistory));
            }
        } catch (error) {
            console.error('Error retrieving search history:', error);
        }
    };

    const handleChangeText = (text) => {
        setSearchKeyword(text);
    };

    const handleSearch = async () => {
        console.log('검색 키워드:', searchKeyword);
        addSearchToHistory(searchKeyword);
        // setSearchKeyword('');
        // getSearchResults(searchKeyword);
        const results = await getSearchResults(searchKeyword);
        setSearchResults(results);

    };

    /*고가순 정렬*/
    const getSearchResultsByPriceHighToLow = async (keyword) => {
        
        try {
            const response = await axios.get(`${BASE_URL}/products/search/high-price`, {
                params: {
                    searchKeyword: keyword,
                    location: userLocation
                }
            });
            console.log("check 고가순 검색한 상품 목록", response.data)
            return response.data;
        } catch (error) {
            console.error('Error getSearchResultsByPriceHighToLow:', error);
        } finally {
            // setIsLoading(false);
        }
    
    };

     /*저가순 정렬*/
    const getSearchResultsByPriceLowToHigh = async (keyword) => {
        
        try {
            const response = await axios.get(`${BASE_URL}/products/search/low-price`, {
                params: {
                    searchKeyword: keyword,
                    location: userLocation
                }
            });
            console.log("check 저가순 검색한 상품 목록", response.data)
            return response.data;
        } catch (error) {
            console.error('Error getSearchResultsByPriceLowToHigh:', error);
        } finally {
            // setIsLoading(false);
        }
    
    };

    const getSearchResults = async (keyword) => {
        
        try {
            const response = await axios.get(`${BASE_URL}/products/search`, {
                params: {
                    searchKeyword: keyword,
                    location: userLocation
                }
            });
            console.log("check 검색한 상품 목록", response.data)
            return response.data;
        } catch (error) {
            console.error('Error fetchSearchResultsFromServer:', error);
        } finally {
            // setIsLoading(false);
        }
    
    };

    const handleHistoryPress = (keyword) => {
        setSearchKeyword(keyword);
        setShowHistory(false);
        getSearchResults(keyword);
    };

    const handleSortOptionPress = (type) => {
        setSortType(type);
        setShowSortOptions(false);
        sortSearchResults(type);
    };


    const sortSearchResults = async (type) => {
        let results = '';
        if (type=='저가순'){
            console.log('저가순',searchKeyword);
            results = await getSearchResultsByPriceLowToHigh(searchKeyword);
        } else if (type =='고가순'){
            console.log('고가순',searchKeyword);
            results = await getSearchResultsByPriceHighToLow(searchKeyword);
            
        } else{
            console.log('최신순',searchKeyword);
            results = await getSearchResults(searchKeyword);
        }
        setSearchResults(results);
    };
    // const sortSearchResults = async (keyword) => {

    // };

    const addSearchToHistory = async (keyword) => {
        try {
            const currentHistory = [...searchHistory];
            currentHistory.unshift(keyword);
            const uniqueHistory = [...new Set(currentHistory)].slice(0, 10);
            await AsyncStorage.setItem('searchHistory', JSON.stringify(uniqueHistory));
            setSearchHistory(uniqueHistory);
        } catch (error) {
            console.error('Error adding search to history:', error);
        }
    };

    const handleInputFocus = () => {
        setShowHistory(true);
    };

    const renderHistoryItem = ({ item, index }) => (
        <View style={styles.historyItemContainer}>
            <TouchableOpacity onPress={() => handleHistoryPress(item)}>
                <Text style={styles.historyItem}>{item}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeSearchItem(index)}>
                <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );

    const renderSearchResultItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                // setTitle(item.title);
                // setLocation(item.location);
                // setPrice(item.price);
                // setDuration(item.duration);
                // const imageURL = `${BASE_URL}/images/${item.productImages[0]}`;
                // setSelectedImage(imageURL); // 이미지 URL 설정
                navigation.navigate('상세 화면', {
                    id: item.id,
                });
            }}
        >
            <View style={styles.searchResultItem}>
                <Image source={{ uri: `${BASE_URL}/images/${item.productImages}` }}style={styles.productImage} />
                <View style={styles.productInfo}>
                    <Text style={styles.productTitle}>{item.title}</Text>
                    <Text style={styles.productAddress}>{item.location}</Text>
                    <Text style={styles.productPrice}>{item.price}</Text>
                    <View style={styles.termContainer}>
                        <Text style={styles.productTerm}>{item.duration}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="단어를 입력해주세요"
                        value={searchKeyword}
                        onChangeText={handleChangeText}
                        onFocus={handleInputFocus}
                    />
                    <TouchableOpacity
                        style={styles.searchIconWrapper}
                        onPress={handleSearch}
                    >
                        <AntDesign name="search1" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {(showHistory && searchKeyword.trim() === '') ||
            (showHistory && searchKeyword.trim() !== '' && searchResults.length === 0) ? (
                <View style={styles.historyContainer}>
                    <Text style={styles.historyTitle}>최근 검색 기록</Text>
                    <FlatList
                        data={searchHistory}
                        renderItem={renderHistoryItem}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            ) : (
                <>
                    <View style={styles.sortContainer}>
                        {showSortOptions && (
                            <View style={styles.sortOptions}>
                                <TouchableOpacity
                                    style={styles.sortOption}
                                    onPress={() => handleSortOptionPress('고가순')}
                                >
                                    <Text>고가순</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.sortOption}
                                    onPress={() => handleSortOptionPress('저가순')}
                                >
                                    <Text>저가순</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.sortOption}
                                    onPress={() => handleSortOptionPress('최신순')}
                                >
                                    <Text>최신순</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        <TouchableOpacity
                            style={styles.sortButton}
                            onPress={() => setShowSortOptions(!showSortOptions)}
                        >
                            <Text style={styles.sortButtonText}>
                                {sortType ? sortType : '정렬'}
                            </Text>
                            <AntDesign
                                name={showSortOptions ? 'up' : 'down'}
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={searchResults}
                        renderItem={renderSearchResultItem}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ flex: 1 }}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    inputContainer: {
        marginBottom: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3E3E3',
        borderRadius: 35,
        paddingHorizontal: 20,
        height: 50,
        width: '100%',
    },
    input: {
        flex: 1,
        paddingVertical: 10,
    },
    searchIconWrapper: {
        marginLeft: 10,
    },
    divider: {
        height: 0.8,
        backgroundColor: '#CCCCCC',
        marginBottom: 20,
    },
    historyContainer: {
        marginBottom: 20,
    },
    historyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    historyItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    historyItem: {
        fontSize: 16,
        marginBottom: 5,
    },
    searchResultItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    productImage: {
        width: 130,
        height: 130,
        resizeMode: 'cover',
        borderRadius: 10,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    productTitle: {
        marginBottom: '3%',
        fontSize: 16,
        fontWeight: 'bold',
    },
    productAddress: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#333',
        marginBottom: 5,
    },
    termContainer: {
        paddingHorizontal: 10,
        backgroundColor: '#DDEAF6',
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        width: '80%',
        marginTop: 5,
    },
    productTerm: {
        color: '#000',
        fontSize: 13,
        textAlign: 'center',
        paddingVertical: 5,
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // 정렬 옵션을 가운데 정렬합니다.
        zIndex: 1,
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E3E3E3',
        borderRadius: 20,
        paddingHorizontal: 10,
        height: 40,
        width: 100,
        justifyContent: 'space-between', // 정렬 버튼 내의 아이콘을 가운데 정렬합니다.
    },
    sortButtonText: {
        fontSize: 16,
    },
    sortOptions: {
        width: 100,
        position: 'absolute',
        top: 45,
        left: 0,
        backgroundColor: '#E3E3E3',
        borderRadius: 10,
        elevation: 3,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    sortOption: {
        paddingVertical: 8,
    },
});

export default SearchScreen;
