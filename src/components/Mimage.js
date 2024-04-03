import React from 'react';
import { Image } from 'react-native';

const MacBookImage = require('/Users/heojuwon/Downloads/Rent-It-frontend/assets/images/macbook.jpg');

const ImageComponent = ({ style }) => (
  <Image source={MacBookImage} 
  style={[{
    borderRadius: 10,
    width: 100,
    height: 100,
    marginLeft: 30,
    marginTop: 50, 
}, style]} /> // borderRadius 스타일 추가
);

export default ImageComponent;