
/*
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import tentImage from '../../../assets/images/tent.jpg';
import rollerImage from '../../../assets/images/roller.jpg';
import bookshelfImage from '../../../assets/images/bookshelf.jpg';
import golfdress from '../../../assets/images/golfdress.jpg';
import hairband from '../../../assets/images/hairband.jpeg';
import iphone from '../../../assets/images/iphone.jpg';
import purifier from '../../../assets/images/purifier.jpg';
import tools from '../../../assets/images/tools.png';
import airdress from '../../../assets/images/airdress.jpeg';
import cattower from '../../../assets/images/cattower.jpg';
import coat from '../../../assets/images/coat.jpg';
import dogwear from '../../../assets/images/dogwear.jpeg';
import lady from '../../../assets/images/lady.png';
import plate from '../../../assets/images/plate.jpg';

import styled from 'styled-components/native';

// 스타일링된 Tent 컴포넌트
const StyledTent = styled.View`
  flex-direction: column;
  margin-top: 20px;
`;

// 이미지 스타일링
const ImageContainer = styled.View`
  width: 100px;
  height: 120px;
  margin-right: 10%;
  margin-top: 8%;
`;

// 이미지 스타일
const ImageStyle = styled.Image`
  width: 100%;
  height: 100%;
  margin-left: 25%;
  border-radius: 10%;
`;

const StyledTentComponent = () => {
  const images = [tentImage, rollerImage, bookshelfImage, golfdress, hairband,
    iphone, purifier, tools, airdress, cattower, coat, dogwear, lady, plate];
  const rows = [];

  for (let i = 0; i < images.length; i += 4) {
    const rowImages = images.slice(i, i + 4);
    rows.push(
      <View key={i} style={{ flexDirection: 'row' }}>
        {rowImages.map((image, index) => (
          <ImageContainer key={index}>
            <ImageStyle source={image} />
          </ImageContainer>
        ))}
      </View>
    );
  }

  return (
    <StyledTent>
      {rows}
    </StyledTent>
  );
};

export default StyledTentComponent;
*/

import tentImage from '../../../assets/images/tent.jpg';
import rollerImage from '../../../assets/images/roller.jpg';
import bookshelfImage from '../../../assets/images/bookshelf.jpg';
import golfdressImage from '../../../assets/images/golfdress.jpg';
import hairbandImage from '../../../assets/images/hairband.jpeg';
import iphoneImage from '../../../assets/images/iphone.jpg';
import purifierImage from '../../../assets/images/purifier.jpg';
import toolsImage from '../../../assets/images/tools.png';
import airdressImage from '../../../assets/images/airdress.jpeg';
import cattowerImage from '../../../assets/images/cattower.jpg';
import coatImage from '../../../assets/images/coat.jpg';
import dogwearImage from '../../../assets/images/dogwear.jpeg';
import ladyImage from '../../../assets/images/lady.png';
import plateImage from '../../../assets/images/plate.jpg';
import macbook from '../../../assets/images/macbook.jpg';

const products = [
  { id: 1, goodsName: "Tent", user: "User1", pictures: tentImage, description: "텐트입니다.", price: "50만원" },
  { id: 2, goodsName: "Roller", user: "User2", pictures: rollerImage, description: "폼롤러입니다.", price: "3만원" },
  { id: 3, goodsName: "Bookshelf", user: "User3", pictures: bookshelfImage, description: "책장입니다.", price: "20만원" },
  { id: 4, goodsName: "Golfdress", user: "User4", pictures: golfdressImage, description: "골프복입니다.", price: "셋트 60만원" },
  { id: 5, goodsName: "Hairband", user: "User5", pictures: hairbandImage, description: "This is a hairband", price: "$10" },
  { id: 6, goodsName: "Iphone", user: "User6", pictures: iphoneImage, description: "This is an iphone", price: "$500" },
  { id: 7, goodsName: "Purifier", user: "User7", pictures: purifierImage, description: "This is a purifier", price: "$120" },
  { id: 8, goodsName: "Tools", user: "User8", pictures: toolsImage, description: "This is a set of tools", price: "$40" },
  { id: 9, goodsName: "Airdress", user: "User9", pictures: airdressImage, description: "This is an airdress", price: "$70" },
  { id: 10, goodsName: "Cat Tower", user: "User10", pictures: cattowerImage, description: "This is a cat tower", price: "$90" },
  { id: 11, goodsName: "Coat", user: "User11", pictures: coatImage, description: "This is a coat", price: "$60" },
  { id: 12, goodsName: "Dog Wear", user: "User12", pictures: dogwearImage, description: "강아지옷", price: "5천원" },
  { id: 13, goodsName: "Lady", user: "User13", pictures: ladyImage, description: "디올", price: "10만원" },
  { id: 14, goodsName: "Plate", user: "User14", pictures: plateImage, description: "그릇", price: "만원" },
  { id: 15, goodsName: "macbook", user: "User15", pictures: macbook, description: "맥북", price: "3만원" }
];

export default products;