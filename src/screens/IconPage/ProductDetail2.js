/*import React, { useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProductDetail2 = ({ route }) => {
  const { product } = route.params;
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0); // 현재 스크롤 위치 저장
  const navigation = useNavigation();

  // 이미지-텍스트 아이콘을 눌렀을 때의 핸들러
  const handleImageTextIconPress = () => {
    setIsHorizontal(prevState => !prevState);
  };

  // 주소를 표시할 Header 컴포넌트
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.addressContainer}>
        <MaterialIcons name="place" size={29} color="black" style={styles.icon} />
        <Text style={styles.address}>{product.Address}</Text>
      </View>
      <TouchableOpacity onPress={handleImageTextIconPress}>
        <MaterialCommunityIcons name="image-text" size={35} color="black" style={styles.imageTextIcon} />
      </TouchableOpacity>
    </View>
  );

// 각 상품을 표시하는 renderItem 함수
const renderItem = ({ item }) => {
  if (isHorizontal) {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: product })}>
        <View style={styles.priceContainer}>
          <View style={styles.itemContainer2}>
            <Image source={product.pictures} style={styles.image2} />
            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={[styles.title, styles.horizontalTitle]}>{product.title}</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={{ color: '#000', fontSize: 13, textAlign: 'center', paddingVertical: 5 }}>{product.Address}</Text>
              </View>
              <Text style={[styles.price, styles.horizontalPrice]}>{product.price}</Text>
              <View style={{ paddingHorizontal: 10, backgroundColor: '#DDEAF6', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', width: '80%', marginTop:'2%', }}>
                <Text style={{ color: '#000', fontSize: 13, textAlign: 'center', paddingVertical: 5 }}>{product.term}</Text>
              </View>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: product })}>
        <View style={[styles.itemContainer, styles.verticalItemContainer]}>
          <Image source={product.pictures} style={styles.image} />
          <Text numberOfLines={1} style={[styles.title, styles.verticalTitle]}>{product.title}</Text>
          <Text style={[styles.price, styles.verticalPrice]}>{product.price}</Text>
        </View>
      </TouchableOpacity>
    );
  }
};

// keyExtractor 함수 정의
const keyExtractor = (item, index) => {
  return isHorizontal ? `horizontal-${index}` : `vertical-${index}`;
};


  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader} // header를 추가
        data={[...Array(15).keys()]} // 15개의 더미 데이터를 생성
        renderItem={renderItem}
        keyExtractor={keyExtractor} // keyExtractor를 설정
        numColumns={isHorizontal ? 1 : 3} // 수직 또는 수평 정렬
        key={isHorizontal ? 'horizontal' : 'vertical'} // FlatList 컴포넌트의 key prop을 변경하여 리렌더링 보장
        initialScrollIndex={scrollIndex} // 현재 스크롤 위치 설정
        onScroll={(event) => setScrollIndex(event.nativeEvent.contentOffset.y)} // 현재 스크롤 위치 저장
      />
      {isHorizontal && <View style={styles.horizontalSeparator} />} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
  },
  address: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginVertical: 10,
    alignItems: 'center', // 수직 방향으로 가운데 정렬
  },
  itemContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // 내용을 왼쪽으로 정렬
    marginVertical: 10,
  },
  image2: {
    width: 120,
    height: 130,
    resizeMode: 'cover',
    borderRadius: 10,
    marginLeft: 25, // 이미지를 왼쪽에 붙이기
    marginRight: '6%',
  },
  image: {
    width: 110,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 2, // 이미지 오른쪽 여백 늘리기
    marginLeft: 2, // 이미지 왼쪽 여백 늘리기
  },
  verticalItemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5, // 좌우 여백 조절
  },
  horizontalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: '24%',
  },
  horizontalPrice: {
    fontSize: 17,
    marginTop: 5,
  },
  verticalTitle: {
    color: 'black',
    marginTop: 10,
    width: 110, // 이미지의 너비와 맞추기 위해 명시적으로 지정
  },
  verticalPrice: {
    fontSize: 17,
    marginBottom: 10,
  },
  icon: {
    marginLeft: 0,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },

});

export default ProductDetail2;
*/

import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProductDetail2 = ({ route }) => {
  const { product } = route.params;
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0); // 현재 스크롤 위치 저장
  const [title, setTitle] = useState(''); // 상품명
  const [price, setPrice] = useState(''); // 가격
  const [duration, setDuration] = useState(''); // 기간
  const [selectedImage, setSelectedImage] = useState(''); // 첫번째 이미지
  const [location, setLocation] = useState(''); // 사용자 지역
  const navigation = useNavigation();

  useEffect(() => {
    // 서버에서 상품 정보를 가져오는 함수 호출
    fetchProductDetails();
    // 임시적으로 사용자의 지역을 설정합니다.
    setLocation('서울');
  }, []);

  const fetchProductDetails = async () => {
    try {
      // 서버에서 상품 정보를 가져오는 API 호출
      const response = await fetch(`your_api_endpoint/${product.id}`);
      const data = await response.json();

      // 가져온 상품 정보를 상태 변수에 저장
      setTitle(data.title);
      setPrice(data.price);
      setDuration(data.duration);
      setSelectedImage(data.image);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  // 이미지-텍스트 아이콘을 눌렀을 때의 핸들러
  const handleImageTextIconPress = () => {
    setIsHorizontal(prevState => !prevState);
  };

  // 주소를 표시할 Header 컴포넌트
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.addressContainer}>
        <MaterialIcons name="place" size={29} color="black" style={styles.icon} />
        <Text style={styles.address}>{location}</Text>
      </View>
      <TouchableOpacity onPress={handleImageTextIconPress}>
        <MaterialCommunityIcons name="image-text" size={35} color="black" style={styles.imageTextIcon} />
      </TouchableOpacity>
    </View>
  );

  // 각 상품을 표시하는 renderItem 함수
  const renderItem = ({ item }) => {
    if (isHorizontal) {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product })}>
          <View style={styles.priceContainer}>
            <View style={styles.itemContainer2}>
              <Image source={{ uri: selectedImage }} style={styles.image2} />
              <View style={styles.textContainer}>
                <Text numberOfLines={1} style={[styles.title, styles.horizontalTitle]}>{title}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ color: '#000', fontSize: 13, textAlign: 'center', paddingVertical: 5 }}>{product.Address}</Text>
                </View>
                <Text style={[styles.price, styles.horizontalPrice]}>{price}</Text>
                <View style={{ paddingHorizontal: 10, backgroundColor: '#DDEAF6', borderRadius: 20, flexDirection: 'row', justifyContent: 'center', width: '80%', marginTop:'2%', }}>
                  <Text style={{ color: '#000', fontSize: 13, textAlign: 'center', paddingVertical: 5 }}>{duration}</Text>
                </View>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product })}>
          <View style={[styles.itemContainer, styles.verticalItemContainer]}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
            <Text numberOfLines={1} style={[styles.title, styles.verticalTitle]}>{title}</Text>
            <Text style={[styles.price, styles.verticalPrice]}>{price}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  // keyExtractor 함수 정의
  const keyExtractor = (item, index) => {
    return isHorizontal ? `horizontal-${index}` : `vertical-${index}`;
  };

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader} // header를 추가
        data={[...Array(15).keys()]} // 15개의 더미 데이터를 생성
        renderItem={renderItem}
        keyExtractor={keyExtractor} // keyExtractor를 설정
        numColumns={isHorizontal ? 1 : 3} // 수직 또는 수평 정렬
        key={isHorizontal ? 'horizontal' : 'vertical'} // FlatList 컴포넌트의 key prop을 변경하여 리렌더링 보장
        initialScrollIndex={scrollIndex} // 현재 스크롤 위치 설정
        onScroll={(event) => setScrollIndex(event.nativeEvent.contentOffset.y)} // 현재 스크롤 위치 저장
      />
      {isHorizontal && <View style={styles.horizontalSeparator} />} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginVertical: 10,
    alignItems: 'center', // 수직 방향으로 가운데 정렬
  },
  itemContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // 내용을 왼쪽으로 정렬
    marginVertical: 10,
  },
  image2: {
    width: 120,
    height: 130,
    resizeMode: 'cover',
    borderRadius: 10,
    marginLeft: 25, // 이미지를 왼쪽에 붙이기
    marginRight: '6%',
  },
  image: {
    width: 110,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 10,
    marginRight: 2, // 이미지 오른쪽 여백 늘리기
    marginLeft: 2, // 이미지 왼쪽 여백 늘리기
  },
  verticalItemContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5, // 좌우 여백 조절
  },
  horizontalTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginRight: '24%',
  },
  horizontalPrice: {
    fontSize: 17,
    marginTop: 5,
  },
  verticalTitle: {
    color: 'black',
    marginTop: 10,
    width: 110, // 이미지의 너비와 맞추기 위해 명시적으로 지정
  },
  verticalPrice: {
    fontSize: 17,
    marginBottom: 10,
  },
  icon: {
    marginLeft: 0,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ProductDetail2;