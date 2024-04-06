import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Container = styled.View`
  margin-top: 40px;
  align-items: center;
`;

const ImageContainer = styled.View`
  width: 85%;
  aspect-ratio: 2/3; 
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 10px; 
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const ProductName = styled.Text`
  font-size: 18px;
  margin-top: 5px; 
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