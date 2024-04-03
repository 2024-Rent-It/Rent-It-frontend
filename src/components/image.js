import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import pink from '../../assets/images/pink.jpeg';
import jennie from '../../assets/images/jennie.jpg';
import candle from '../../assets/images/candle.jpg';
import Swiper from 'react-native-swiper';

const images = [pink, jennie, candle]; // 이미지 경로 배열

const PickerComponent = () => {
  return (
    <View style={styles.container}>
      <Swiper loop timeout={3} containerStyle={{ width: '100%', height: '100%' }}>
        {images.map((image, index) => (
          <Image source={image} style={styles.image} key={index} />
        ))}
      </Swiper>
    </View>
  );
};



/*  aspectRatio: '16/9', */
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '20%',
    overflow: 'hidden', 

  },
  image: {
    width: '100%',
    height: '50%',
    
  },
});

export default PickerComponent;