//모든 상품을 다 출력하는 코드
/*import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, RefreshControl } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // 추가
import axios from 'axios';
import { BASE_URL } from '../../constants/api.js';
import ProductItem from '../../screens/PicPage/ProductItem2.js'; // ProductItem 컴포넌트 추가
import styled from 'styled-components/native';

const StyledProductContainer = styled.View``;
const RowContainer = styled.View``;

const ProductDetail2 = ({ route }) => {
  const navigation = useNavigation(); // 추가
  const [location, setLocation] = useState('');
  const [isHorizontal, setIsHorizontal] = useState(false);
  const [products, setProducts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getUserLocation();
    fetchProducts(); // 제품 정보 가져오기
  }, []);

  const getUserLocation = async () => {
    try {
      const userLocation = await AsyncStorage.getItem('userLocation');
      if (userLocation) {
        setLocation(userLocation);
      } else {
        setLocation('위치 정보 없음');
      }
    } catch (error) {
      console.error('Error getting user location:', error);
      setLocation('위치 정보 없음');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      setProducts(response.data); // 전체 상품 불러오기
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const onRefresh = () => {
    setRefreshing(true);
    fetchData().then(() => setRefreshing(false));
  };

  const handleImageTextIconPress = () => {
    setIsHorizontal(prevState => !prevState);
  };
  
  const renderProductItem2 = () => (
    <StyledProductContainer>
      <RowContainer>
        {products.map((product, index) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productItem}
            onPress={() => {
              navigation.navigate('ProductDetail', {
                product,
              });
            }}
          >
            <ProductItem
              product={product}
              onPress={() => {
                navigation.navigate('ProductDetail', {
                  product,
                });
              }}
            />
          </TouchableOpacity>
        ))}
      </RowContainer>
    </StyledProductContainer>
  );

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.addressContainer}>
            <MaterialIcons name="place" size={29} color="black" style={styles.addressicon} />
            <Text style={styles.address}>{location}</Text>
          </View>
          <TouchableOpacity onPress={handleImageTextIconPress}>
            <MaterialCommunityIcons name="image-text" size={35} color="black" style={styles.imageTextIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {renderProductItem2()}
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '3%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 3,
    marginRight: '30%', // 왼쪽 끝으로 이동
  },
  addressicon: {},
  imageTextIcon: {
    marginRight: '3%',
  },
  content: {
    flex: 1,
    width: '100%',
  },
  productContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  productItem: {
    width: windowWidth / 3 - 15, 
    marginBottom: 20,
    marginLeft: '10%', 
  },
  productImage: {
    width: '120%',
    aspectRatio: 1, // 가로 세로 비율 유지
    borderRadius: 10,
  },
});

export default ProductDetail2;
*/

//홈으로부터 넘겨받은 카테고리만 출력하는 코드
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, RefreshControl } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { BASE_URL } from '../../constants/api.js';
import ProductItem from '../../screens/PicPage/ProductItem2.js';
import styled from 'styled-components/native';

const StyledProductContainer = styled.View``;
const RowContainer = styled.View``;

const ProductDetail2 = ({ route }) => {
    const navigation = useNavigation();
    const [location, setLocation] = useState('');
    const [isHorizontal, setIsHorizontal] = useState(false);
    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { category } = route.params; // 전달된 카테고리

    useEffect(() => {
        getUserLocation();
        fetchProducts(); // 제품 정보 가져오기
    }, []);

    const getUserLocation = async () => {
        try {
            const userLocation = await AsyncStorage.getItem('userLocation');
            if (userLocation) {
                setLocation(userLocation);
            } else {
                setLocation('위치 정보 없음');
            }
        } catch (error) {
            console.error('Error getting user location:', error);
            setLocation('위치 정보 없음');
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/products`);
            setProducts(response.data); // 전체 상품 불러오기
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        fetchData().then(() => setRefreshing(false));
    };

    const handleImageTextIconPress = () => {
        setIsHorizontal(prevState => !prevState);
    };

    const renderProductItem2 = () => (
        <StyledProductContainer>
            <RowContainer>
                {products
                    .filter(product => product.category === category) // 카테고리에 해당하는 상품 필터링
                    .map((product, index) => (
                        <TouchableOpacity
                            key={product.id}
                            style={styles.productItem}
                            onPress={() => {
                                navigation.navigate('ProductDetail', {
                                    product,
                                });
                            }}
                        >
                            <ProductItem
                                product={product}
                                onPress={() => {
                                    navigation.navigate('ProductDetail', {
                                        product,
                                    });
                                }}
                            />
                        </TouchableOpacity>
                    ))}
            </RowContainer>
        </StyledProductContainer>
    );

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.addressContainer}>
                        <MaterialIcons name="place" size={29} color="black" style={styles.addressicon} />
                        <Text style={styles.address}>{location}</Text>
                    </View>
                    <TouchableOpacity onPress={handleImageTextIconPress}>
                        <MaterialCommunityIcons name="image-text" size={35} color="black" style={styles.imageTextIcon} />
                    </TouchableOpacity>
                </View>
            </View>
            {renderProductItem2()}
        </ScrollView>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: '3%',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    address: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 3,
        marginRight: '30%', // 왼쪽 끝으로 이동
    },
    addressicon: {},
    imageTextIcon: {
        marginRight: '3%',
    },
    content: {
        flex: 1,
        width: '100%',
    },
    productContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginTop: 20,
    },
    productItem: {
        width: windowWidth / 3 - 15,
        marginBottom: 20,
        marginLeft: '10%',
    },
    productImage: {
        width: '120%',
        aspectRatio: 1, // 가로 세로 비율 유지
        borderRadius: 10,
    },
});

export default ProductDetail2;

