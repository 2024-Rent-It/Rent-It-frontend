import React from 'react';
import { View, Text } from 'react-native';

const ProductDetail2 = ({ route }) => {
  const { product } = route.params;

  return (
    <View>
      <Text>Product Detail Page for Product ID: {product.id}</Text>
    </View>
  );
};

export default ProductDetail2;