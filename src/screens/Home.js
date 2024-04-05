/*
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from '@react-navigation/native';
import ProductItem from "./PicPage/ProductItem"; // ProductItem 컴포넌트 불러오기
import products from "./PicPage/ImageProduct"; // ImageProduct.js에서 상품 데이터 가져오기
import HomeIcon from "../../src/components/HomeIcon";
import PickerComponent from "../../src/components/image.js";

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
        <TouchableOpacity key={item.id} style={{ marginHorizontal: 5, flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('ProductDetail2', { product: products[(index * 5) + idx] })}>
          <IconContainer>
            <HomeIcon title={item.title} iconName={iconTypes[index * 5 + idx]} />
          </IconContainer>
        </TouchableOpacity>
      ))}
    </RowContainer>
  );

  return (
    <ScrollView>
      <PickerComponent />
      
      {chunkedItems.map(renderItem)}
      
      <StyledTent>
        {products.map(product => (
          <ProductItem key={product.id} product={product} onPress={() => navigation.navigate('ProductDetail', { product })} />
        ))}
      </StyledTent> 
    </ScrollView>
  );
};

const RowContainer = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
  margin-top: 10px;
`;

const IconContainer = styled.View`
  flex: 1;
`;

// Styled version of Tent component with custom styles
const StyledTent = styled.View`
`;

export default Home;
*/
import React from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useNavigation } from '@react-navigation/native';
import ProductItem from "./PicPage/ProductItem"; // ProductItem 컴포넌트 불러오기
import products from "./PicPage/ImageProduct"; // ImageProduct.js에서 상품 데이터 가져오기
import HomeIcon from "../../src/components/HomeIcon";
import PickerComponent from "../../src/components/image.js";

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
        <TouchableOpacity key={item.id} style={{ marginHorizontal: 5, flex: 1, alignItems: 'center' }} onPress={() => navigation.navigate('ProductDetail2', { product: products[(index * 5) + idx] })}>
          <IconContainer>
            <HomeIcon title={item.title} onPress={() => navigation.navigate('ProductDetail2', { product: products[(index * 5) + idx] })} iconName={iconTypes[index * 5 + idx]} />
          </IconContainer>
        </TouchableOpacity>
      ))}
    </RowContainer>
  );

  return (
    <ScrollView>
      <PickerComponent />
      
      {chunkedItems.map(renderItem)}
      
      <StyledTent>
        {products.map(product => (
          <ProductItem key={product.id} product={product} onPress={() => navigation.navigate('ProductDetail', { product })} />
        ))}
      </StyledTent> 
    </ScrollView>
  );
};

const RowContainer = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
  margin-top: 10px;
`;

const IconContainer = styled.View`
  flex: 1;
`;

// Styled version of Tent component with custom styles
const StyledTent = styled.View`
`;

export default Home;

