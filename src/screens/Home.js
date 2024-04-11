import React, { useState } from 'react';
import {
    FlatList,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    View,
    StyleSheet
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import ProductItem from './PicPage/ProductItem'; // ProductItem 컴포넌트 불러오기
import products from './PicPage/ImageProduct'; // ImageProduct.js에서 상품 데이터 가져오기
import HomeIcon from '../../src/components/HomeIcon';
import PickerComponent from '../../src/components/image.js';

const Home = () => {
    const navigation = useNavigation();
    const [activeSlide, setActiveSlide] = useState(0); // 활성 슬라이드의 인덱스를 추적하는 상태

    /***/
    const items = [
        { id: 1, title: '인기렌탈' },
        { id: 2, title: '가구/인테리어' },
        { id: 3, title: '패션잡화' },
        { id: 4, title: '미용소품' },
        { id: 5, title: '유아용품' },
        { id: 6, title: '생활용품' },
        { id: 7, title: '생활가전' },
        { id: 8, title: '도서/문구' },
        { id: 9, title: '미술품' },
        { id: 10, title: '구합니다' },
        { id: 11, title: '디지털기기' },
        { id: 12, title: '스포츠/레저' },
        { id: 13, title: '운동기구' },
        { id: 14, title: '파티용품' },
        { id: 15, title: '반려동물용품' },
        { id: 16, title: '기타' },
    ];

    const chunkArray = (array, chunkSize) => {
        const result = [];
        for (let i = 0; i < array.length; i += chunkSize) {
            result.push(array.slice(i, i + chunkSize));
        }
        return result;
    };

    const chunkedItems = chunkArray(products, 3); // 상품 이미지를 가로에 3개씩 분할
    const chunkedIcons = chunkArray(items, 10); // 아이콘을 가로에 5개씩 분할

    const iconTypes = [
        'heart-outline',
        'bed-outline',
        'shirt-outline',
        'face-woman-shimmer-outline',
        'baby-bottle-outline',
        'umbrella-outline',
        'tv-outline',
        'book-outline',
        'color-palette-outline',
        'alarm-light-outline',
        'phone-portrait-outline',
        'tent',
        'barbell-outline',
        'balloon-outline',
        'cat',
        'ellipsis-horizontal-outline',
    ];

    const renderIconItem = () => (
      <IconContainer>
          <FlatList
              horizontal
              pagingEnabled
              data={chunkedIcons}
              renderItem={({ item, index }) => (
                  <FlatList
                      key={index}
                      scrollEnabled={false}
                      numColumns={5}
                      data={item}
                      keyExtractor={(item) => item.id}
                      style={{
                          width: Dimensions.get('screen').width,
                      }}
                      onScroll={(event) => {
                          const slideIndex = Math.round(
                              event.nativeEvent.contentOffset.x /
                                  Dimensions.get('screen').width
                          );
                          setActiveSlide(slideIndex);
                      }}
                      renderItem={({ item }) => (
                          <TouchableOpacity
                              key={item.id}
                              style={{
                                  width: Dimensions.get('screen').width / 5,
                                  marginTop: 10,
                              }}
                              onPress={() =>
                                  navigation.navigate('ProductDetail2', {
                                      product: products[item.id - 1],
                                  })
                              }
                          >
                              <HomeIcon
                                  title={item.title}
                                  onPress={() =>
                                      navigation.navigate('ProductDetail2', {
                                          product: products[item.id - 1],
                                      })
                                  }
                                  iconName={iconTypes[item.id - 1]}
                              />
                          </TouchableOpacity>
                      )}
                  />
              )}
          />
          <View style={styles.indicatorContainer}>
              {chunkedIcons.map((_, index) => (
                  <View
                      key={index}
                      style={[
                          styles.indicator,
                          { backgroundColor: activeSlide === index ? '#007AFF' : '#CCCCCC' },
                      ]}
                  />
              ))}
          </View>
      </IconContainer>
  );

    const renderProductItem = () => (
        <StyledTent>
            {chunkedItems.map((row, index) => (
                <RowContainer key={index}>
                    {row.map((product, idx) => (
                        <TouchableOpacity
                            key={product.id}
                            style={{
                                marginHorizontal: 5,
                                flex: 1,
                                alignItems: 'center',
                            }}
                            onPress={() => {
                                console.log('Product pressed:', product); // 상품이 눌렸을 때만 로그 출력
                                navigation.navigate('ProductDetail', {
                                    product,
                                });
                            }}
                        >
                            <ProductItem
                                product={product}
                                onPress={() => {
                                    console.log('Product pressed:', product); // 상품이 눌렸을 때만 로그 출력
                                    navigation.navigate('ProductDetail', {
                                        product,
                                    });
                                }}
                            />
                        </TouchableOpacity>
                    ))}
                </RowContainer>
            ))}
        </StyledTent>
    );

    return (
        <ScrollView>
            <PickerComponent />

            {renderIconItem()}
            {renderProductItem()}
            <FooterRectangle />
        </ScrollView>
    );
};

const RowContainer = styled.View`
    flex-direction: row;
    margin-bottom: 8px;
    margin-top: 10px;
`;

const IconContainer = styled.View`
    width: 100%;
    align-items: center;
`;

const StyledTent = styled.View``;

const FooterRectangle = styled.View`
    width: 100%;
    height: 150px;
    background-color: #333;
    margin-top: 30px;
`;

const styles = StyleSheet.create({
    indicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#CCCCCC',
        marginHorizontal: 5,
    },
});

export default Home;