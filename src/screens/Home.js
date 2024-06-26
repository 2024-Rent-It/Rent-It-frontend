import React, { useCallback, useRef, useState, useEffect } from 'react';
import { 
    Platform,
    FlatList, 
    ScrollView, 
    TouchableOpacity, 
    Dimensions, 
    View, 
    StyleSheet, 
    RefreshControl,
    Text,
    Image,
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

// 이 아래는 Notification 관련 Import 입니다.
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
// import { useState, useEffect, useRef } from 'react';
// 이 위는 Notification 관련 Import 입니다.

// 이 아래는 Notification 관련 Config 입니다.
// App이 foreground 일 때 작동 config
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});
// 이 위는 Notification 관련 Config 입니다.

// 이 아래는 Notification 권한 관련 Function 입니다.
function handleRegistrationError(errorMessage) {
    // console.log("프로젝트에러에러에러");
    // Noti permission 관련 오류를 처리해주는 Func.
    alert(errorMessage);
    throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync(userNickname) {
    // console.log('aaaa', projectId, '야 이거 맞냐');
    // console.log('projectId', projectId);
    // Noti permission을 받아오는 Func.
    if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            handleRegistrationError('알림 권한이 없습니다');
            return;
        }
        const projectId =
            Constants?.expoConfig?.extra?.eas?.projectId ??
            Constants?.easConfig?.projectId;
        if (!projectId) {
            handleRegistrationError('Project id를 설정해 주세요.');
        }
        try {
            const pushTokenString = (
                await Notifications.getExpoPushTokenAsync({
                    projectId,
                })
            ).data;
            
            console.log("유저닉네임, 토큰 확인", userNickname, pushTokenString);
            const tokenData = {
                nickname : userNickname,
                token: pushTokenString,
            };

            await fetch(`${BASE_URL}/tokens/register`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tokenData),
            });

            console.log(pushTokenString);
            console.log("확인됐음.");
            return pushTokenString;
        } catch (e) {
            handleRegistrationError(`${e}`);
        }
    } else {
        handleRegistrationError('실제 기기에서만 테스트 가능합니다!');
    }
}

const Home = () => {
    const navigation = useNavigation();
    const [activeSlide, setActiveSlide] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const flatListConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
    const onFlatListViewChanged = useCallback(({ viewableItems }) => {
        setActiveSlide(viewableItems[0].index);
    }, []);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { userLocation,userNickname } = useAuth(); // 로그인된 사용자 지역 가져오기
    const [expoPushToken, setExpoPushToken] = useState('');
    // const [productName, setProductName] = useState<string>('');



    const { width } = Dimensions.get('window');
    const numColumns = 3;
    const itemWidth = (width - 20 - (numColumns - 1) * 10) / numColumns; // 아이템의 너비 계산
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getProductsByLocation();
        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        registerForPushNotificationsAsync(userNickname)
            .then((token) => setExpoPushToken(token ?? ''))
            .catch((error) => setExpoPushToken(`${error}`));
    }, []);

    const getProductsByLocation = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/products/location/${userLocation}`);
            setProducts([...response.data]);
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
        { id: 2, title: '가구인테리어' },
        { id: 3, title: '패션잡화' },
        { id: 4, title: '미용소품' },
        { id: 5, title: '유아용품' },
        { id: 6, title: '생활용품' },
        { id: 7, title: '생활가전' },
        { id: 8, title: '도서문구' },
        { id: 9, title: '미술품' },
        { id: 10, title: '구합니다' },
        { id: 11, title: '디지털기기' },
        { id: 12, title: '스포츠레저' },
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

    const images = [
        require('../../assets/images/sun1.png'),
        require('../../assets/images/sun2.jpeg'),
        require('../../assets/images/sun3.png'),
        require('../../assets/images/sun4.png'),
        require('../../assets/images/sun5.png'),
    ];

    const renderSunImages = () => (
        <View>
            <View style={styles.sunImageWrapper}>
                    <Image
                        source={require('../../assets/images/summer.jpeg')}
                        style={styles.summerImage}
                    />
                </View>
            <Text style={styles.sunImageText}>여름을 더욱 빛나게 해 줄 아이템✨</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sunImageContainer}
            >
                {images.map((image, index) => (
                    <View key={index} style={styles.sunImageWrapper}>
                        <Image
                            source={image}
                            style={styles.sunImage}
                        />
                    </View>
                ))}
                
                
            </ScrollView>
            
        </View>
        
    );

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
                        keyExtractor={(item) => item.id.toString()}
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
                                    navigation.navigate('카테고리', {
                                        category: item.title, location: userLocation // 선택된 카테고리를 전달
                                    });
                                }}
                            >
                                <HomeIcon
                                    title={item.title}
                                    onPress={() => {
                                        console.log('Selected category:', item.title); // 로그 추가
                                        navigation.navigate('카테고리', {
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
        <View>
            <StyledProductContainer>
                {renderSunImages()} 
                
            <Text style={styles.productHeaderText}>새로운 대여 가능 목록</Text>
                {chunkedItems.map((row, index) => (
                    <RowContainer key={index}>
                        {row.map((product, idx) => (
                            <TouchableOpacity
                                key={product.id}
                                style={{
                                    marginHorizontal: 5,
                                    width: itemWidth,
                                    alignItems: 'center',
                                }}
                                onPress={() => {
                                    navigation.navigate('상세 화면', {id:product.id});
                                }}
                            >
                                <ProductItem
                                    product={product}
                                    onPress={() => {
                                        navigation.navigate('상세 화면', {id: product.id});
                                    }}
                                />
                            </TouchableOpacity>
                        ))}
                    </RowContainer>
                ))}
            </StyledProductContainer>
        </View>
    );
    
//홈화면 스타일 수정
    return (
        <ScrollView
    contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}
    refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
>
                
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
        marginRight: '32%',
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
    sunImageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginVertical: 10,
    },
    sunImageWrapper: {
        alignItems: 'center',
    },
    sunImage: {
        width: 250,
        height: 300,
        marginBottom: 20,
        marginLeft: 15,
    },
    sunImageText: {
        marginLeft: 15,
        marginTop: 25,
        color: 'black',
        fontSize: 20,
        fontWeight: 'regular',
    },
    summerImage: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        marginTop: 20,
    },
    productHeaderText: {
        marginLeft: 15,
        marginTop: 25,
        color: 'black',
        fontSize: 20,
        fontWeight: 'regular',
    }
});

export default Home;
