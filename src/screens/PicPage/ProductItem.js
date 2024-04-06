import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  margin-top: 40px;
  align-items: center;
`;

const ImageContainer = styled.View`
  width: 85%;
  aspect-ratio: 2/3; /* 세로가 가로보다 약간 더 긴 직사각형 유지 */
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 10px; /* 이미지 간의 간격 조절 */
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ProductName = styled.Text`
  font-size: 18px;
  margin-top: 5px; /* 텍스트와 이미지 사이 간격 조절 */
`;

const ProductItem = ({ product, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(product)}>
      <Container>
        <ImageContainer>
          <ProductImage source={product.pictures} resizeMode="cover" />
        </ImageContainer>
        <ProductName>{product.goodsName}</ProductName>
      </Container>
    </TouchableOpacity>
  );
};

export default ProductItem;