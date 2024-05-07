import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { BASE_URL } from '../../constants/api.js';

const Container = styled.View`
  width: 100px; 
  margin-bottom: 20px; 
  align-items: center;
  margin-top: 20px;
 
`;

const ImageContainer = styled.View`
  width: 125px; 
  height: 130px; 
  overflow: hidden;
  border-radius: 15px;
  margin-bottom: 8px; 
  
`;

const ProductImage = styled.Image`
  width: 100%;
  height: 120%; 
  
`;

const TextContainer = styled.View`
  width: 100%;
`;

const ProductPrice = styled.Text`
  font-size: 20px; 
  margin-bottom: 4px; 
  font-weight: bold; 
  color: #333; 
`;

const ProductTitle = styled.Text`
  font-size: 15px; /* 상품명 폰트 크기 조정 */
`;

const ProductItem = ({ product, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(product)}>
      <Container>
        <ImageContainer>
          <ProductImage source={{uri:`${BASE_URL}/images/${product.productImages}`}} resizeMode="cover" />
        </ImageContainer>
        <TextContainer>
          <ProductPrice>₩{product.price}</ProductPrice> 
          <ProductTitle>{product.title}</ProductTitle>
        </TextContainer>
      </Container>
    </TouchableOpacity>
  );
};

export default ProductItem;
