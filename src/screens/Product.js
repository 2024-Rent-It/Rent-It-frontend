import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import tree from '../../assets/images/tree.jpg';


/**<Image source={roro} style={styles.roroImage} />  */
const HelloScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={tree} style={styles.image} />
      <Text style={styles.text}>Good Morning</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '60%' // 화면의 가로길이의 1/2를 차지하도록 설정
  },
  roroImage: {
    width: '20%',
    height: '50%' // roro 이미지에 맞춘 스타일
  },
  text: {
    fontSize: 30, // 텍스트 크기 조정
    marginTop: 10, // 텍스트 상단 여백 조정
    marginLeft: 15,
  }
});

export default HelloScreen;