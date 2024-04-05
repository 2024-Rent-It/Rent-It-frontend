import React from 'react';
import { View, Text, Image } from 'react-native';

const ProductDetailPage = ({ route }) => {
  // route.params로부터 전달된 상품 데이터 가져오기
  const { product } = route.params;

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={product.pictures} style={{ width: 200, height: 200 }} />
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>{product.goodsName}</Text>
      <Text style={{ fontSize: 18, marginVertical: 5 }}>Price: {product.price}</Text>
      <Text style={{ fontSize: 16, marginVertical: 5 }}>Description: {product.description}</Text>

    </View>
  );
};

export default ProductDetailPage;