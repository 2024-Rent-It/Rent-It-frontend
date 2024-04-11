import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; // AntDesign 아이콘을 사용하기 위해 추가

const SearchScreen = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

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
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="단어를 입력해주세요"
          value={searchKeyword}
          onChangeText={handleChangeText}
          onFocus={handleInputFocus}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>검색</Text>
        </TouchableOpacity>
      </View>
      {showHistory && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>최근 검색 기록</Text>
          <FlatList
            data={searchHistory}
            renderItem={({ item, index }) => (
              <View style={styles.historyItemContainer}>
                <TouchableOpacity onPress={() => handleHistoryPress(item)}>
                  <Text style={styles.historyItem}>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeSearchItem(index)}>
                  <AntDesign name="close" size={24} color="black" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
  height: '140%',
  width: '70%',
  backgroundColor: '#E3E3E3',
  marginLeft: '10%',
  padding: 10,
  borderRadius: 35,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  historyContainer: {
    marginTop: 20,
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
});

export default SearchScreen;