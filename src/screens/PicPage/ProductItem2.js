import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { BASE_URL } from '../../constants/api.js';

const Container = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  ${props => props.isGrid && `
    flex-direction: column;
    align-items: flex-start;
  `}
`;

const ImageContainer = styled.View`
  width: 140px;
  height: 160px;
  overflow: hidden;
  border-radius: 17px;
  margin-right: 15px;
  margin-left: 10%;
\
  ${props => props.isGrid && `
    width: 100%;
    height: 100px;
    margin-left: 0;
    margin-bottom: 10px;
    
  `}
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const TextContainer = styled.View`
  flex: 1;
`;

const ProductPrice = styled.Text`
  font-size: 20px;
  margin-bottom: 4px;
  font-weight: bold;
  color: #333;
`;

const ProductTitle = styled.Text`
  font-size: 17px;
`;

const ProductDuration = styled.Text`
  font-size: 15px;
  background-color: #DDEAF6;
  padding: 4px 8px;
  border-radius: 30px;
  color: #333;
  margin-top: 4px;
  width: 55px;
`;

const ProductItem2 = ({ product, onPress, isGrid }) => {
  return (
    <>
      <TouchableOpacity onPress={() => onPress(product)}>
        <Container isGrid={isGrid}>
          <ImageContainer isGrid={isGrid}>
            <ProductImage source={{ uri: `${BASE_URL}/images/${product.productImages}` }} resizeMode="cover" />
          </ImageContainer>
          <TextContainer>
            <ProductPrice>₩{product.price}</ProductPrice>
            <ProductTitle>{product.title}</ProductTitle>
            <ProductDuration>{product.duration}</ProductDuration>
          </TextContainer>
        </Container>
      </TouchableOpacity>
    </>
  );
};

export default ProductItem2;
