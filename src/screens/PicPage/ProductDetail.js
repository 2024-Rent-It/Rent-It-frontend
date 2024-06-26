import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../../constants/api.js';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const ProductDetailPage = ({ route, navigation }) => {
  const { token, userNickname, userId } = useAuth(); // 로그인된 사용자 토큰 가져오기
  const { id } = route.params;
  console.log("넘어갈 때 들어오는 Id값", id);

  const [isLiked, setIsLiked] = useState(false);
  const [categoryWidth, setCategoryWidth] = useState(0);
  const [product, setProduct] = useState('');

  const toggleLike = () => {
    setIsLiked(prevState => !prevState);
    console.log("눌렀습니다!", isLiked);
    if (isLiked) {
      deleteFav(id, token);
    } else {
      addFav(id, token);
    }
  };

  useEffect(() => {
    if (categoryWidth === 0) {
      // Calculate the width of the category text
      const categoryTextWidth = Dimensions.get('window').width * 0.27 - 10; // Assuming marginLeft: '5%' and paddingHorizontal: 20
      setCategoryWidth(categoryTextWidth);
    }
    getProductById();
    checkFavorite();
  }, [categoryWidth, id]);

  const checkFavorite = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/favorite/check`, {
        params: {
          memberNickname: userNickname,
          productId: id
        },
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log("check", response.data)
      setIsLiked(response.data);
      console.log("찜한 상품인가?", isLiked);
    } catch (error) {
      console.error('Error checkFavorite:', error);
    }
  };

  const getProductById = async () => {
    console.log(id);
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      setProduct(response.data);
      console.log("상품 정보 확인",product);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addFav = async (id, token) => {
    console.log("addFav", id);
    try {
      const response = await axios.post(
        `${BASE_URL}/favorite/add`,
        null,
        {
          params: {
            productId: id
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status == 201) {
        console.log('찜 등록되었습니다');
        getProductById();
      } else {
        // 오류 처리해야댐
      }
    } catch (error) {
      console.error(error);
      // 오류 처리해야댐
    }
  };

  const getProductFavoriteId = async (productId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/favorite/product/${productId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      console.log("찜 id", response.data);
      favid = response.data
      return favid; // 찜 아이디 반환
    } catch (error) {
      console.error('Error retrieving favorite ID:', error);
      throw error; // 오류 처리
    }
  };

  const deleteFav = async (id, token) => {
    const favid = await getProductFavoriteId(id, token);
    console.log("찜 삭제할 id", favid);
    try {
      await axios.delete(`${BASE_URL}/favorite/${favid}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log('Favorite deleted successfully');
      getProductById();
    } catch (error) {
      console.error('Error deleteFav:', error);
    }
  };

  const handleChatPress = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/chat/room`, {
        sellerId: product.seller_id,
        buyerId: userId,
        productId: id,
      });

      if (response.status === 201) {
        const roomId = response.data.data; 
        // navigation.navigate('Message', {
        //   roomId: roomId,
        //   roomProduct: product,
        // });
        navigation.navigate('ChattingTab', { screen: 'Message', params: {
          roomId: roomId,
          roomProduct: product,
      }});
      } else {
        console.error('Failed to join chat room:', response);
        Alert.alert('Error', '채팅방 만들기에 실패했습니다.');
      }
    } catch (error) {
      Alert.alert('자신과의 채팅방은 만들 수 없습니다.', '회원님이 등록한 상품입니다!');
      console.error('Error occurred while joining chat room:', error);
      // Alert.alert('Error', 'An error occurred while trying to join the chat room.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Image source={{ uri: `${BASE_URL}/images/${product.productImages}` }} style={{ width: '100%', height: '45%' }} />
      <TouchableOpacity
        onPress={() => navigation.navigate('판매자 정보', { sellerName: product.sellerName, sellerLocation: product.Location })}
        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10 }}>
        <Ionicons name="person-circle-outline" size={50} color="black" />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', paddingBottom: 2 }}>{product.sellerName}</Text>
          <Text style={{ fontSize: 13, paddingTop: 2 }}>{product.Location}</Text>
        </View>
      </TouchableOpacity>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#EAEAEA' }}></View>
      <View style={{ padding: 10, marginLeft: '3%', marginRight: '5%', }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{product.title}</Text>
      </View>
      <View style={{ backgroundColor: '#DDEAF6', borderRadius: 20, flexDirection: 'row', width: 100, marginLeft: '5%', justifyContent: 'center', paddingVertical: 6 }}>
        <Text style={{ fontSize: 13, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>{product.category}</Text>
      </View>
      <View style={{ padding: 10, marginLeft: '3%', marginRight: '5%' }}>
        <Text style={{ fontSize: 16, marginBottom: 5, marginTop: '1%' }}>{product.description}</Text>
      </View>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#ECECEC', height: 160, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, marginTop: '1.5%' }}>
          <TouchableOpacity onPress={toggleLike}>
            {isLiked ? (
              <Ionicons name="heart" size={43} color="black" />
            ) : (
              <Ionicons name="heart-outline" size={43} color="black" />
            )}
          </TouchableOpacity>
          <Text style={{ fontSize: 22, color: 'black', marginLeft: '2%', fontWeight: 'bold', marginRight: '23%' }}>₩{product.price}</Text>

          <View style={{ backgroundColor: '#FFF', borderRadius: 20, justifyContent: 'center', width: '37%', alignSelf: 'center', marginLeft: '2%' }}>
            <Text style={{ color: '#000', fontSize: 15, textAlign: 'center', paddingVertical: 5 }}>최대 {product.duration} 가능</Text>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: '1%' }}>
          <TouchableOpacity
            style={{ backgroundColor: '#A7C8E7', paddingHorizontal: 130, paddingVertical: 15, borderRadius: 35, marginTop: '3%', }}
            onPress={handleChatPress}
          >
            <Text style={{ color: '#000000', fontSize: 20, fontWeight: 'bold', }}>채팅 보내기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailPage;
