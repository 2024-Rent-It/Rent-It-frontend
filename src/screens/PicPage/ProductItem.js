//이제 ProductItem.js 파일을 만들어서 ProductItem 컴포넌트를 정의하고, products 배열을 이용하여 각 상품을 렌더링.
//ProductItem 컴포넌트는 상품 데이터를 받아와서 UI에 렌더링함.

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
`;

const ImageContainer = styled.View`
  width: 100%;
  height: 200px;
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ProductName = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
`;

const ProductPrice = styled.Text`
  font-size: 16px;
  margin-top: 5px;
`;

const ProductItem = ({ product, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(product)}>
      <Container>
        <ImageContainer>
          <ProductImage source={product.pictures} />
        </ImageContainer>
        <ProductName>{product.goodsName}</ProductName>
        <ProductPrice>{product.price}</ProductPrice>
      </Container>
    </TouchableOpacity>
  );
};

export default ProductItem;