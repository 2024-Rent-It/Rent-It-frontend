
import React, { useState } from 'react';
import { View, FlatList, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

/*
const ProductDetail2 = ({ route }) => {
  const { product } = route.params;
  const [isHorizontal, setIsHorizontal] = useState(false);
  const navigation = useNavigation();

  const goToSearchScreen = () => {
    navigation.navigate('SearchScreen');
  };

  // 주소를 표시할 Header 컴포넌트
  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.addressContainer}>
        <MaterialIcons name="place" size={29} color="black" style={styles.icon} />
        <Text style={styles.address}>{product.Address}</Text>
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setIsHorizontal(prevState => !prevState)}>
          <FontAwesome name="search" size={24} color="black" style={styles.searchIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsHorizontal(prevState => !prevState)}>
          <MaterialCommunityIcons name="image-text" size={35} color="black" style={styles.imageTextIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
  */
  const ProductDetail2 = ({ route }) => {
    const { product } = route.params;
    const [isHorizontal, setIsHorizontal] = useState(false);
    const navigation = useNavigation();
  
    const goToSearchScreen = () => {
      navigation.navigate('SearchScreen');
    };
  
    // 이미지-텍스트 아이콘을 눌렀을 때의 핸들러
    const handleImageTextIconPress = () => {
      setIsHorizontal(prevState => !prevState); 
    };
  
    // 주소를 표시할 Header 컴포넌트
    /**          <TouchableOpacity onPress={goToSearchScreen}>
            <FontAwesome name="search" size={24} color="black" style={styles.searchIcon} />
          </TouchableOpacity> */
    const renderHeader = () => (
      <View style={styles.headerContainer}>
        <View style={styles.addressContainer}>
          <MaterialIcons name="place" size={29} color="black" style={styles.icon} />
          <Text style={styles.address}>{product.Address}</Text>
        </View>
        <View style={styles.iconContainer}>

          <TouchableOpacity onPress={handleImageTextIconPress}>
            <MaterialCommunityIcons name="image-text" size={35} color="black" style={styles.imageTextIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  

// 각 상품을 표시하는 renderItem 함수
const renderItem = ({ item }) => {
  // 수평 배열인 경우
  if (isHorizontal) {
    return (
      <View style={styles.priceContainer}>
          <Text style={[styles.horizontalPrice, styles.horizontalPriceText]}>{product.price}</Text>
          <View style={styles.priceUnderline} />
      <View style={[styles.itemContainer, styles.horizontalItemContainer]}>
        <Image source={product.pictures} style={styles.image} />
        <Text style={[styles.title, styles.horizontalTitle]}>{product.title}</Text> 
        
        </View>
      </View>
    );
  }
  // 수직 배열인 경우
  return (
    <View style={[styles.itemContainer, styles.verticalItemContainer]}>
      <Image source={product.pictures} style={styles.image} />
      <Text style={[styles.price, styles.verticalPrice]}>{product.price}</Text>
      <Text style={[styles.title, styles.verticalTitle]}>{product.title}</Text> 
    </View>
  );
};

  // keyExtractor 함수 정의
  const keyExtractor = (item, index) => {
    if (isHorizontal) {
      return `horizontal-${index}`;
    } else {
      return `vertical-${index}`;
    }
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    marginLeft: 5, 
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: '5%',
  },
  itemContainer: {
    margin: 10,
  },
  image: {
    width: 100,
    height: 130,
    resizeMode: 'cover',
    marginLeft: '1.5%',
    marginRight: '1.5%',
    marginTop: '8%',
    borderRadius: 10,
    
  },
   price: {
    fontSize: 17,
    marginLeft: 0
  },

  // 수평 배열에 대한 가격 텍스트 스타일
  horizontalPrice: {
    fontSize: 15,
    marginTop: '2%',
    marginRight: '79%',
  },

  // 수직 배열에 대한 가격 텍스트 스타일
  verticalPrice: {
    fontSize: 17,
  },

  icon: {
    marginTop: '5%',
  },
  iconContainer: {
    flexDirection: 'row',
    marginRight: 20,
  },
  imageTextIcon: {
    marginTop: '10%',
  },
  priceContainer: {
    alignItems: 'center',
  },
  priceUnderline: {
    borderBottomWidth: 0.8,
    width: '120%',
    marginVertical: 5,
    borderBottomColor: '#CCCCCC',
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 0
  },
  horizontalItemContainer: {
    flexDirection: 'row',
    
  },
  horizontalTitle: {
    flex: 1, // 타이틀이 최대한 길어지도록 유연하게 설정
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
    marginLeft: 10, // 이미지와의 간격 조절
  },

  // 수직 배열에 대한 제목 스타일
  verticalTitle: {
    color: 'black',
    },
  });
export default ProductDetail2;