import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from 'styled-components/native';
import { BASE_URL } from '../../constants/api.js';

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;

`;

const ImageContainer = styled.View`
  width: 140px;
  height: 160px;
  overflow: hidden;
  border-radius: 17px;
  margin-right: 15px;
  margin-left: 0px;

`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const TextContainer = styled.View``;

const ProductPrice = styled.Text`
  font-size: 20px;
  margin-bottom: 4px;
  font-weight: bold;
  color: #333;
`;

const ProductTitle = styled.Text`
  font-size: 15px;
`;

const ProductDuration = styled.Text`
  font-size: 15px;
  background-color: #DDEAF6;
  padding: 4px 8px;
  border-radius: 30px;
  color: #333;
  margin-top: 4px;
`;

const Separator = styled.View`
  height: 1px;
  background-color: #ccc;
  margin-vertical: 10px;
  width: 340px;
`;
const ProductItem2 = ({ product, onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={() => onPress(product)}>
        <Container>
          <ImageContainer>
            <ProductImage source={{ uri: `${BASE_URL}/images/${product.productImages}` }} resizeMode="cover" />
          </ImageContainer>
          <TextContainer>
            <ProductPrice>₩{product.price}</ProductPrice>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductDuration>{product.duration}</ProductDuration>
          </TextContainer>
        </Container>
      </TouchableOpacity>
      <Separator />
    </>
  );
};

export default ProductItem2;
