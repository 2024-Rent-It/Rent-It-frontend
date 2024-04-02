import React from "react";
import { ScrollView } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from '@react-navigation/native';
import PickerComponent from "/Users/heojuwon/Downloads/rentit99/src/components/image.js";
import HomeIcon from "/Users/heojuwon/Downloads/rentit99/src/components/HomeIcon.js";

const Container = styled.View`
  flex: 1;
`;

const RowContainer = styled.View`
  flex-direction: row;
  justify-content: center; 
  margin-bottom: 10px;
  margin-top: 10px;
`;

const IconContainer = styled.View`
  margin-right: 3%; 
  margin-left: 3%;
  flex: 1;
`;

const ImageContainer = styled.TouchableOpacity`
  margin: 5px;
`;


const Image = styled.Image`
  width: 90px;
  height: 100px;
  margin-right: 65%;
  margin-top: 10%;
  border-radius: 10px;
`;

const Home = () => {
  const navigation = useNavigation();

  // 아이템 데이터 배열 생성
  const items = [
    { id: 1, title: "인기렌탈" },
    { id: 2, title: "가구/인테리어" },
    { id: 3, title: "도서/문구" },
    { id: 4, title: "미용소품" },
    { id: 5, title: "유아용품" },
    { id: 6, title: "생활용품" },
    { id: 7, title: "애완용품" },
    { id: 8, title: "전자기기" },
    { id: 9, title: "시간계산" },
    { id: 10, title: "구합니다" }
  ];

  // 각 행에 해당하는 아이템을 5개씩 분할하여 배열 생성하는 함수
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  // 5개씩 분할된 아이템 배열
  const chunkedItems = chunkArray(items, 5);

  // 아이콘 타입 목록
  const iconTypes = ['heart', 'sofa', 'pencil', 'lipstick', 'baby-bottle', 'umbrella', 'cat', 'laptop', 'clock', 'alert-circle-outline'];

  const renderItem = (itemRow, index) => (
    <RowContainer key={index}>
      {itemRow.map((item, idx) => (
        <IconContainer key={item.id}>
          {/* 각 아이템에 대해 정확한 아이콘 타입을 할당*/}
          <HomeIcon title={item.title} onPress={() => navigation.navigate('Product')} iconName={iconTypes[index * 5 + idx]} />
        </IconContainer>
      ))}
    </RowContainer>
  );

  // 이미지를 눌렀을 때 동작할 함수
  const handleImagePress = () => {
    navigation.navigate('Product');
  };

  return (
    <ScrollView>
      <Container>
        <PickerComponent />
        {chunkedItems.map(renderItem)}
        {/* 이미지 렌더링 */}
        <RowContainer>
          <ImageContainer onPress={handleImagePress}>
            <Image source={{ uri: "/Users/heojuwon/Downloads/rentit99/assets/images/tree.jpg" }} />
            <Image source={{ uri: "/Users/heojuwon/Downloads/rentit99/assets/images/tree.jpg" }} />
          </ImageContainer>
        </RowContainer>
      </Container>
    </ScrollView>
  );
};

export default Home;