import React from 'react';
import { View } from 'react-native';
import ProductDetail2 from './ProductDetail2';
import products from '../../screens/PicPage/ImageProduct.js';

const ProductGridScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <ProductDetail2 route={{ params: { product: products[0] } }} />
    </View>
  );
};

export default ProductGridScreen;