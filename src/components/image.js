
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import pink from '../../assets/images/main1.png';
import jennie from '../../assets/images/main2.png';
import candle from '../../assets/images/main3.png';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native';

const images = [pink, jennie, candle]; // 이미지 경로 배열

// 스타일링된 PickerComponent
const StyledPickerComponent = styled(({ style, ...rest }) => (
  <View style={style}>
    <Swiper autoplay loop timeout={3} containerStyle={{ width: '100%', height: '100%', aspectRatio: '10/10' }}>
      {images.map((image, index) => (
        <Image source={image} style={styles.Topimage} key={index} />
      ))}
    </Swiper>
  </View>
))``;

// PickerComponent 스타일
const styles = StyleSheet.create({
  Topimage: {
   
    width: '100%',
    height: '100%',
  },
});

export default StyledPickerComponent;