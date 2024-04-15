import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
import products from '../screens/PicPage/ImageProduct.js'

const SearchScreen = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

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
    setSearchKeyword('');
    filterSearchResults(searchKeyword);
  };

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

  const filterSearchResults = (keyword) => {
    const filteredResults = products.filter((item) => item.title.includes(keyword));
    console.log("Filtered Results:", filteredResults);
    setSearchResults(filteredResults);
  };

  const clearSearchHistory = async () => {
    try {
      await AsyncStorage.removeItem('searchHistory');
      setSearchHistory([]);
    } catch (error) {
      console.error('Error clearing search history:', error);
    }
  };

  const removeSearchItem = async (index) => {
    try {
      const updatedHistory = [...searchHistory];
      updatedHistory.splice(index, 1);
      await AsyncStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      setSearchHistory(updatedHistory);
    } catch (error) {
      console.error('Error removing search item:', error);
    }
  };

  const handleInputFocus = () => {
    setShowHistory(true);
  };

  const handleHistoryPress = (keyword) => {
    setSearchKeyword(keyword);
    setShowHistory(false);
    filterSearchResults(keyword);
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
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
      <View style={styles.searchResultItem}>
        <Image source={item.pictures} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productTitle}>{item.title}</Text>
          <Text style={styles.productAddress}>{item.Address}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>
          <View style={styles.termContainer}>
            <Text style={styles.productTerm}>{item.term}</Text>
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
          <TouchableOpacity style={styles.searchIconWrapper} onPress={handleSearch}>
            <AntDesign name="search1" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider}></View>
      {showHistory && searchKeyword.trim() === '' && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>최근 검색 기록</Text>
          <FlatList
            data={searchHistory}
            renderItem={renderHistoryItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
      <FlatList
        data={searchResults}
        renderItem={renderSearchResultItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={null}
        style={{flex: 1}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3E3E3',
    borderRadius: 35,
    paddingHorizontal: 20,
    marginLeft: '8%',
    height: 50,
    width: '80%',
    marginBottom: 20, 
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
  },
  historyContainer: {
    marginTop: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 0,
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
    width: 130, // 이미지 크기 조정
    height: 130, // 이미지 크기 조정
    resizeMode: 'cover',
    borderRadius: 10, // 모서리를 둥글게 만듦
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
});

export default SearchScreen;