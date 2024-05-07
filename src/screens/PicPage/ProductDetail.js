import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../../constants/api.js';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const ProductDetailPage = ({ route , navigation}) => {
  const { token, userNickname } = useAuth(); // 로그인된 사용자 토큰 가져오기
  const { id } = route.params;
  // const { id } = navigation.id;
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
    getProductById();
  }, [categoryWidth]);

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
    } finally {
      // setIsLoading(false);
    }
  };
  const getProductById = async () => {
    console.log(id);
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      setProduct(response.data);
      console.log(product);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      // setIsLoading(false);
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


  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Image source={{ uri: `${BASE_URL}/images/${product.productImages}` }} style={{ width: '100%', height: '45%' }} />
      {/* <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10, }}> 
        <Ionicons name="person-circle-outline" size={50} color="black" />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold', paddingBottom: 2 }}>{product.sellerName}</Text>
          <Text style={{ fontSize: 13, paddingTop: 2, }}>{product.Location}</Text>
        </View>
      </View> */}
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
      <View style={{ backgroundColor: '#DDEAF6', borderRadius: 20, flexDirection: 'row', width: categoryWidth + 7, marginLeft: '5%', justifyContent: 'center' }}>
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
          <TouchableOpacity style={{ backgroundColor: '#A7C8E7', paddingHorizontal: 130, paddingVertical: 15, borderRadius: 35, marginTop: '3%', }}>
            <Text style={{ color: '#000000', fontSize: 20, fontWeight: 'bold', }}>채팅 보내기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailPage;
