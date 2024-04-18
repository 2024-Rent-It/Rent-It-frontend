import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { BASE_URL } from '../../constants/api.js';
const Container = styled.View`
  margin-top: 40px;
  align-items: center;
`;

const ImageContainer = styled.View`
  width: 91%;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 8px; /* 이미지 간의 간격 조절 */
  
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const TextContainer = styled.View`
  width: 92%;
  margin-bottom: 4px; /* 텍스트와 이미지 간의 간격 조절 */
`;

const ProductPrice = styled.Text`
  font-size: 17px;
  margin-right: 40px;
`;

const ProductTitle = styled.Text`
  font-size: 15px;
`;

const ProductItem = ({ product, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(product)}>
      <Container>
        <ImageContainer>
          <ProductImage source={{uri:`${BASE_URL}/images/${product.productImages}`}}
          resizeMode="cover" />
        </ImageContainer>
        <TextContainer>
          <ProductPrice>{product.price}</ProductPrice>
          <ProductTitle>{product.title}</ProductTitle>
        </TextContainer>
      </Container>
    </TouchableOpacity>
  );
};

export default ProductItem;
