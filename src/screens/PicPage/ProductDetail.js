import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductDetailPage = ({ route }) => {
  // route.params로부터 전달된 상품 데이터 가져오기
  const { product } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Image source={product.pictures} style={{ width: '100%', height: '45%' }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 }}> 
        <Ionicons name="person-circle-outline" size={50} color="black" />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{product.user}</Text>
          <Text style={{ fontSize: 16 }}>{product.Address}</Text>
        </View>
      </View>
      <View style={{ alignItems: 'center', padding: 20 }}> 
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>{product.goodsName}</Text>
    
        <Text style={{ fontSize: 18, marginBottom: 5 }}>Price: {product.price}</Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>Description: {product.description}</Text>
      </View>
    
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#ECECEC', height: 200, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="heart" size={40} color="black" />
            <Text style={{ fontSize: 24, color: 'black', marginLeft: '3%', marginTop: '1%' }}>{product.price}</Text>
          </View>
          <TouchableOpacity style={{ backgroundColor: '#A7C8E7', paddingHorizontal: 30, paddingVertical: 15, borderRadius: 30 }}>
            <Text style={{ color: '#FFF', fontSize: 20 }}>채팅 보내기</Text>
          </TouchableOpacity>
        </View>
        {/* 흰색 박스로 감싸진 '최대 2개월 가능' 텍스트 */}
        <View style={{ paddingHorizontal: 10, backgroundColor: '#FFF', borderRadius: 20, marginTop: 10, marginLeft: 30, width: 135 }}>
          <Text style={{ color: '#000', fontSize: 18, textAlign: 'left', paddingVertical: 5 }}>최대 2개월 가능</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductDetailPage;