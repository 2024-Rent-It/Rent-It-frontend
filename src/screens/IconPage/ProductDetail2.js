import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Image,
    Dimensions,
    RefreshControl,
    FlatList,
} from 'react-native';
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
    const [isGrid, setIsGrid] = useState(false);
    const [products, setProducts] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const { category } = route.params; // 전달된 카테고리
    const [key, setKey] = useState('grid'); // 초기 키 값 설정

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
        fetchProducts().then(() => setRefreshing(false));
    };

    const handleImageTextIconPress = () => {
        setIsGrid((prevState) => !prevState);
        setKey((prevKey) => (prevKey === 'grid' ? 'list' : 'grid')); // 키 값을 변경하여 강제로 새로 고침
    };

    const navigateToProductDetail = (product) => {
        navigation.navigate('ProductDetail', { product });
    };

    const renderProductItem2 = () => (
        <StyledProductContainer>
            <RowContainer>
                <FlatList
                    key={key} // 키 값 동적으로 설정
                    data={products}
                    scrollEnabled={false}
                    keyExtractor={(item) => item?.title + item?.duration} // 고유한 키 생성
                    numColumns={isGrid ? 3 : 1} // 그리드 또는 리스트 형식으로 표시
                    contentContainerStyle={isGrid ? { gap: 16 } : null}
                    columnWrapperStyle={isGrid ? { gap: 16 } : null}
                    style={{ paddingHorizontal: 16 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={isGrid ? styles.gridItem : styles.listItem}
                            onPress={() => navigateToProductDetail(item)}
                        >
                            <ProductItem product={item} isGrid={isGrid} />
                        </TouchableOpacity>
                    )}
                />
            </RowContainer>
        </StyledProductContainer>
    );

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <View style={styles.addressContainer}>
                        <MaterialIcons
                            name="place"
                            size={29}
                            color="black"
                            style={styles.addressicon}
                        />
                        <Text style={styles.address}>{location}</Text>
                    </View>
                    <TouchableOpacity onPress={handleImageTextIconPress}>
                        <MaterialCommunityIcons
                            name="image-text"
                            size={35}
                            color="black"
                            style={styles.imageTextIcon}
                        />
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
        marginTop: 12,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
        marginBottom: 12,
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
    gridItem: {
        width: (Dimensions.get('window').width - 16 * 4) / 3,
    },
    listItem: {
        //
    },
});

export default ProductDetail2;