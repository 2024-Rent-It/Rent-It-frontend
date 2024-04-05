/*import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import pink from '../../assets/images/pink.jpeg';
import jennie from '../../assets/images/jennie.jpg';
import candle from '../../assets/images/pinkdog.jpg';
import Swiper from 'react-native-swiper';

const images = [pink, jennie, candle]; // 이미지 경로 배열

const PickerComponent = () => {
  return (
    <View style={styles.container}>
      <Swiper loop timeout={3} containerStyle={{ width: '100%', height: '100%' }}>
        {images.map((image, index) => (
          <Image source={image} style={styles.Topimage} key={index} />
        ))}
      </Swiper>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    width: '12%',
    height: '70%',
    aspectRatio: '13/8',

  },
  Topimage: {
    width: '100%',
    height: '100%',
  },
});

export default PickerComponent;
*/
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import pink from '../../assets/images/pink.jpeg';
import jennie from '../../assets/images/jennie.jpg';
import candle from '../../assets/images/pinkdog.jpg';
import Swiper from 'react-native-swiper';
import styled from 'styled-components/native'; // styled-components import

const images = [pink, jennie, candle]; // 이미지 경로 배열

// 스타일링된 PickerComponent
const StyledPickerComponent = styled(({ style, ...rest }) => (
  <View style={style}>
    <Swiper loop timeout={3} containerStyle={{ width: '100%', height: '100%', aspectRatio: '16/9' }}>
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