import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProductDetailPage = ({ route }) => {
  // route.params로부터 전달된 상품 데이터 가져오기
  const { product } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>
      <Image source={product.pictures} style={{ width: '100%', height: '50%' }} />
      <View style={{ position: 'absolute', top: '51%', left: '2%', padding: 10 }}> 
      <Ionicons name="person-circle-outline" size={50} color="black" />
      </View>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 20 }}> 
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginRight: '50%', marginTop: '1%' }}>{product.user}</Text>
        <Text style={{ fontSize: 16, fontWeight: 'regular', marginRight: '47%'}}>{product.Address}</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{product.goodsName}</Text>
        <Text style={{ fontSize: 18, marginVertical: 5 }}>Price: {product.price}</Text>
        <Text style={{ fontSize: 16, marginVertical: 5 }}>Description: {product.description}</Text>
      </View>
    </View>
  );
};

export default ProductDetailPage;