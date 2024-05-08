import React, { useCallback, useRef, useState, useEffect, } from 'react';
import { 
    FlatList, 
    ScrollView, 
    TouchableOpacity, 
    Dimensions, 
    View, 
    StyleSheet, 
    RefreshControl,
    Text
} from 'react-native';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import ProductItem from './PicPage/ProductItem';
import HomeIcon from '../../src/components/HomeIcon';
import PickerComponent from '../../src/components/image.js';
import { BASE_URL } from '../constants/api.js';
import { useAuth } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
    const navigation = useNavigation();
    const [activeSlide, setActiveSlide] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const flatListConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
    const onFlatListViewChanged = useCallback(({ viewableItems }) => {
        setActiveSlide(viewableItems[0].index);
    }, []);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    // const [location, setLocation] = useState('');
    const { userLocation } = useAuth(); // 로그인된 사용자 지역 가져오기
    
    useEffect(() => {
        // getUserLocation();
        getProductsByLocation();
    }, []);

    // const getUserLocation = async () => {
    //     try {
    //         const userLocation = await AsyncStorage.getItem('userLocation');
    //         console.log("userLocation",userLocation)
    //         if (userLocation) {
    //             setLocation(userLocation);
    //         } else {
    //             setLocation('위치 정보 없음');
    //         }
    //     } catch (error) {
    //         console.error('Error getting user location:', error);
    //         setLocation('위치 정보 없음');
    //     }
    // };


    const getProductsByLocation = async () => {
        console.log("위치 확인", userLocation);
        try {
            const response = await axios.get(`${BASE_URL}/products/location/${userLocation}`);
            setProducts([...response.data]);
            console.log(products);
        } catch (error) {
            console.error('Error getProductsByLocation:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        getProductsByLocation().then(() => setRefreshing(false));
    };

    const items = [
        { id: 1, title: '주방용품' },
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

    const chunkedItems = chunkArray(products, 3);
    const chunkedIcons = chunkArray(items, 10);

    const iconTypes = [
        'kitchen-set',
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
        <StyledIconContainer>
            <FlatList
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={chunkedIcons}
                viewabilityConfig={flatListConfigRef.current}
                onViewableItemsChanged={onFlatListViewChanged}
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
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                key={item.id}
                                style={{
                                    width: Dimensions.get('screen').width / 5,
                                    marginTop: 10,
                                }}
                                onPress={() => {
                                    console.log('Selected category:', item.title); // 로그 추가
                                    navigation.navigate('ProductDetail2', {
                                        category: item.title, location: userLocation // 선택된 카테고리를 전달
                                    });
                                }}
                            >
                                <HomeIcon
                                    title={item.title}
                                    onPress={() => {
                                        console.log('Selected category:', item.title); // 로그 추가
                                        navigation.navigate('ProductDetail2', {
                                            category: item.title, location: userLocation// 선택된 카테고리를 전달
                                        });
                                    }}
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
                            {
                                backgroundColor:
                                    activeSlide === index
                                        ? '#007AFF'
                                        : '#CCCCCC',
                            },
                        ]}
                    />
                ))}
            </View>
        </StyledIconContainer>
    );

    const renderProductItem = () => (
        <StyledProductContainer>
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
                                navigation.navigate('ProductDetail', {id:product.id});
                            }}
                        >
                            <ProductItem
                                product={product}
                                onPress={() => {
                                    navigation.navigate('ProductDetail', {id: product.id});
                                }}
                            />
                        </TouchableOpacity>
                    ))}
                </RowContainer>
            ))}
        </StyledProductContainer>
    );

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <PickerComponent />
            {renderIconItem()}
            {renderProductItem()}
            <FooterRectangle>
                <Text style={styles.footerText}>@RentIt Co.,Ltd. All Rights Reserved</Text>
                <Text style={styles.footersmallText}>'렌팃' 앱에서 이루어지는 거래의 경우 '렌팃'은 통신판매의 당사자가 아닌 통신판매중개자로서 상품, 상품정보, 거래에 대한 책임이 제한될 수 있으므로, 각 상품 페이지에서 구체적인 내용을 확인하시기 바랍니다.</Text>
                <Text style={styles.footermiddleText}>사업자 정보</Text>
                <Text style={styles.footersmallText2}>(주)RentIt | 대표자 : 연세대 | 주소 : 연세대학교 미래캠퍼스</Text>
            </FooterRectangle>
        </ScrollView>
    );
};

const RowContainer = styled.View`
    flex-direction: row;
    margin-bottom: 8px;
`;

const StyledIconContainer = styled.View`
    width: 100%;
    align-items: center;
    margin-top: 30px;
`;

const StyledProductContainer = styled.View`
    margin-top: 20px;
`;

const FooterRectangle = styled.View`
    width: 100%;
    height: 150px;
    background-color: #ECECEC;
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
    footerText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'regular',
        color: 'black',
        marginTop: 10,
        marginRight: '36%',
    },
    footermiddleText: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'regular',
        color: 'black',
        marginTop: 15,
        marginRight: '78%',
    },
    footersmallText: {
        fontSize: 13,
        fontWeight: 'regular',
        color: 'gray',
        marginTop: 10,
        marginRight: '3%',
        marginLeft: '3%',
    },
    footersmallText2: {
        fontSize: 13,
        fontWeight: 'regular',
        color: 'gray',
        marginTop: 5,
        marginRight: '3%',
        marginLeft: '3%',
    },
});

export default Home;