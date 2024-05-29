import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Ionicons 라이브러리 사용
import { useAuth } from '../../contexts/AuthContext'; // AuthContext 파일의 useAuth 훅 가져오기
import axios from 'axios';
import { BASE_URL } from '../../constants/api.js';

const { width } = Dimensions.get('window');
const numColumns = 3;
const itemWidth = (width - 20 - (numColumns - 1) * 10) / numColumns; // 아이템의 너비 계산


const MyFav = ({ navigation }) => {
  const { userNickname } = useAuth();
  const { token } = useAuth(); // 로그인된 사용자 토큰 가져오기
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getAllMyFav(); // 제품 정보 가져오기
}, []);
  const getAllMyFav = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/favorite/user/${userNickname}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
      console.log("fav",response.data);
     const newProducts = response.data.map(item => ({
      product: {favid: item.id, ...item.product, liked: true}
    }));

    // 변환된 데이터를 products 상태로 설정
    setProducts(newProducts);

    console.log("fav안에걸 보고싶다", products);


    } catch (error) {
      console.error('getAllMyFav 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMyFav = async (favid) => {
    console.log(favid);
    try {
      await axios.delete(`${BASE_URL}/favorite/${favid}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
      console.log('Favorite deleted successfully');
      
    } catch (error) {
      console.error('Error getAllMyFav:', error);
    }
    getAllMyFav();
  };

  //좋아요 기능을 토글하는 함수 (토글을 누를때 상태가 반전됨)
  const toggleLike = (favid, id) => {
    console.log("toggle",favid,id);
    deleteMyFav(favid);

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
      <TouchableOpacity onPress={() => navigation.navigate('상세 화면', { id: item.product.id })}>
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => toggleLike(item.product.favid, item.product.id)} style={styles.heartContainer}>
            <Ionicons name={item.product.liked ? 'heart' : 'heart-outline'} size={24} color={item.product.liked ? 'red' : 'black'} strokeWidth={1} />
          </TouchableOpacity>
          <Image source={{ uri: `${BASE_URL}/images/${item.product.productImages}` }}style={styles.image} />
          <Text style={styles.name}>{item.product.title}</Text>
          <Text style={styles.price}>{item.product.price}원</Text>
        </View>
      </TouchableOpacity>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.product.id.toString()}
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
    backgroundColor:'white',
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
