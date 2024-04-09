/*
import React, { useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const ProductDetail2 = ({ route }) => {
  const { product } = route.params;
  const [isHorizontal, setIsHorizontal] = useState(false); // 이미지 정렬 상태를 저장

  // 주소를 표시할 Header 컴포넌트
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.addressContainer}>
        <MaterialIcons name="place" size={29} color="black" style={styles.icon} />
        <Text style={styles.address}>{product.Address}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setIsHorizontal(prevState => !prevState)}>
          <FontAwesome name="search" size={24} color="black" style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsHorizontal(prevState => !prevState)}>
          <MaterialCommunityIcons name="image-text" size={35} color="black" style={styles.imageTextIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // 각 상품을 표시하는 renderItem 함수
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={product.pictures} style={[styles.image, { flexDirection: isHorizontal ? 'row' : 'column' }]} />
      <Text style={styles.price}>{product.price}</Text>
    </View>
  );

  // keyExtractor 함수 정의
  const keyExtractor = (item, index) => {
    if (isHorizontal) {
      return `horizontal-${index}`;
    } else {
      return `vertical-${index}`;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader} // header를 추가
        data={[...Array(15).keys()]} // 15개의 더미 데이터를 생성
        renderItem={renderItem}
        keyExtractor={keyExtractor} // keyExtractor를 설정
        numColumns={isHorizontal ? 1 : 3} // 수직 또는 수평 정렬
        key={isHorizontal ? 'horizontal' : 'vertical'} // FlatList 컴포넌트의 key prop을 변경하여 리렌더링 보장
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    marginLeft: 5, 
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  itemContainer: {
    margin: 10,
  },
  image: {
    width: 100,
    height: 130,
    resizeMode: 'cover',
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '8%',
    borderRadius: 10,
  },
  price: {
    textAlign: 'center',
    marginBottom: '15%',
    fontSize: 17,
  },
  icon: {
    marginTop: '5%',
  },
  iconContainer: {
    flexDirection: 'row',
    marginRight: 20,
  },
  searchIcon: {
    marginRight: 10,
    marginTop: '25%',
  },
  imageTextIcon: {
    marginTop: '10%',
  },
});

export default ProductDetail2;
*/

import React, { useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';

const ProductDetail2 = ({ route }) => {
  const { product } = route.params;
  const [isHorizontal, setIsHorizontal] = useState(false); // 이미지 정렬 상태를 저장

  // 주소를 표시할 Header 컴포넌트
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.addressContainer}>
        <MaterialIcons name="place" size={29} color="black" style={styles.icon} />
        <Text style={styles.address}>{product.Address}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setIsHorizontal(prevState => !prevState)}>
          <FontAwesome name="search" size={24} color="black" style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsHorizontal(prevState => !prevState)}>
          <MaterialCommunityIcons name="image-text" size={35} color="black" style={styles.imageTextIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // 각 상품을 표시하는 renderItem 함수
  const renderItem = ({ item }) => {
    // 수평 배열인 경우
    if (isHorizontal) {
      return (
        <View style={styles.itemContainer}>
          <Image source={product.pictures} style={styles.image} />
          <View style={styles.priceContainer}>
            <Text style={styles.horizontalPrice}>{product.price}</Text>
            <View style={styles.priceUnderline} />
          </View>
        </View>
      );
    }
    // 수직 배열인 경우
    return (
      <View style={styles.itemContainer}>
        <Image source={product.pictures} style={styles.image} />
        <Text style={styles.price}>{product.price}</Text>
      </View>
    );
  };

  // keyExtractor 함수 정의
  const keyExtractor = (item, index) => {
    if (isHorizontal) {
      return `horizontal-${index}`;
    } else {
      return `vertical-${index}`;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader} // header를 추가
        data={[...Array(15).keys()]} // 15개의 더미 데이터를 생성
        renderItem={renderItem}
        keyExtractor={keyExtractor} // keyExtractor를 설정
        numColumns={isHorizontal ? 1 : 3} // 수직 또는 수평 정렬
        key={isHorizontal ? 'horizontal' : 'vertical'} // FlatList 컴포넌트의 key prop을 변경하여 리렌더링 보장
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    marginLeft: 5, 
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  itemContainer: {
    margin: 10,
  },
  image: {
    width: 100,
    height: 130,
    resizeMode: 'cover',
    marginLeft: '1%',
    marginRight: '1%',
    marginTop: '8%',
    borderRadius: 10,
  },
  price: {
    textAlign: 'center',
    fontSize: 17,
  },
  horizontalPrice: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: '2%',
    marginRight: '79%',
  },
  icon: {
    marginTop: '5%',
  },
  iconContainer: {
    flexDirection: 'row',
    marginRight: 20,
  },
  searchIcon: {
    marginRight: 10,
    marginTop: '25%',
  },
  imageTextIcon: {
    marginTop: '10%',
  },
  priceContainer: {
    alignItems: 'center',
  },
  priceUnderline: {
    borderBottomWidth: 0.8, // 줄의 두께
    width: '120%', // 줄의 너비
    marginVertical: 5, // 가격 텍스트와 줄 사이의 간격
    borderBottomColor: '#CCCCCC', // 연한 회색 색상
  },
});

export default ProductDetail2;