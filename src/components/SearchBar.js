import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const SearchScreen = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = () => {
    // 검색 기능 구현
    console.log('검색 키워드:', searchKeyword);
    // 여기에 실제 검색 기능을 구현하면 됩니다.
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="검색어를 입력하세요"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
      <Button title="검색" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default SearchScreen;
