import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ionicons 라이브러리 사용

const { width } = Dimensions.get('window');
const numColumns = 3;
const itemWidth = (width - 20 - (numColumns - 1) * 10) / numColumns; // 아이템의 너비 계산


const MyFav = ({ navigation }) => {
  const [products, setProducts] = useState([
    { id: 1, title: '바보 개구리', price: '100원', image: require('../../../assets/images/k.png'), liked: true },
    { id: 2, title: '귀여운 개구리', price: '300원', image: require('../../../assets/images/candle.jpg'), liked: true },
    { id: 3, title: '깔끔한 개구리', price: '3000원', image: require('../../../assets/images/k.png'), liked: true },
    { id: 4, title: '엄청난 개구리', price: '3000원', image: require('../../../assets/images/k.png'), liked: true },
  ]);

  //좋아요 기능을 토글하는 함수 (토글을 누를때 상태가 반전됨)
  const toggleLike = (id) => {

    //product.id === id조건을 만족하면 {'liekd'상태만 반전}내용실행, 만족 안하면 : 뒷부분..(걍 현재 상품 반환)
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id ? { ...product, liked: !product.liked } : product
      )
    );

    // 찜 목록에서 삭제 - 선택된 상품 필터링해서 빼고(filter함수 사용해서), 남은 애들로 상품 목록 생성(setProduct역할)
    setProducts(prevProducts =>
      prevProducts.filter(product => product.id !== id)
    );
  };

  //param(item)은 product 배열의 각 상품 객체
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => toggleLike(item.id)} style={styles.heartContainer}>
          <Ionicons name={item.liked ? 'heart' : 'heart-outline'} size={24} color={item.liked ? 'red' : 'black'} strokeWidth={1} />
        </TouchableOpacity>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    justifyContent: 'space-around',
  },
  itemContainer: {
    width: itemWidth,
    marginBottom: 10,
    alignItems: 'center',
    margin: '1%',
    position: 'relative', // 상대 위치 설정
  },
  heartContainer: {
    position: 'absolute', // 절대 위치 설정
    top: 5,
    right: 5,
    zIndex: 1, // 다른 요소 위에 표시되도록 설정
  },
  image: {
    width: '100%',
    height: itemWidth,
    aspectRatio: 1, // 가로 세로 비율을 유지
    margin: '1%',
    resizeMode: 'cover',
    marginBottom: 5,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    color: 'grey',
    textAlign: 'center',
  },
});

export default MyFav;
