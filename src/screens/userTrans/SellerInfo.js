import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity, Pressable } from "react-native";
import axios from 'axios';
import { BASE_URL } from '../../constants/api.js';
import { useAuth } from '../../contexts/AuthContext';


const SellerInfo = ({ navigation, route }) => {
    const { token } = useAuth(); // 로그인된 사용자 토큰 가져오기
    const { sellerName, sellerLocation } = route.params;
    const [user, setUser] = useState({
        name: sellerName,
        location: sellerLocation,
        profileImage: require('../../../assets/images/k.png')
    });
    useEffect(() => {
        getProductsBySeller();
    }, []);

    const [products, setProducts] = useState([
        { id: 1, title: '케론인의 아이폰', price: '3500원', duration: '1일', selectedImage: require('../../../assets/images/iphone.jpg') },
        { id: 2, title: '크리스마스 트리', price: '7000원', duration: '2일', selectedImage: require('../../../assets/images/tree.jpg') },
        { id: 3, title: '애착 헤어밴드', price: '8500원', duration: '8일', selectedImage: require('../../../assets/images/hairband.jpeg') },
        { id: 4, title: '비싼 가방', price: '580000원', duration: '3일', selectedImage: require('../../../assets/images/lady.png') },
        { id: 5, title: '좋은 노트북', price: '50000원', duration: '10일', selectedImage: require('../../../assets/images/macbook.jpg') },
    ]);

    const getProductsBySeller = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/products/seller`, {
                params: {
                    sellerNickname: sellerName,
                    location: sellerLocation
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log("check 판매자 상품 목록", response.data)
            setProducts([...response.data]);
            console.log("판매자 product안에걸 보고싶다", products);
        } catch (error) {
            console.error('Error getProductsBySeller:', error);
        } finally {
            // setIsLoading(false);
        }
    };
    const ProductItem = ({ product }) => (

        <View style={styles.productContainer}>

            <Pressable
                style={styles.productImageContainer}>

                <View>
                    <View style={styles.Productimage}>
                        <Image source={{ uri: `${BASE_URL}/images/${product.productImages}` }} style={styles.Productimage} />
                    </View>
                </View>

            </Pressable>

            <TouchableOpacity
                style={styles.infoContainer}
                onPress={() => {
                    console.log(product.id);
                    navigation.navigate('ProductDetail', { id: product.id });
                }}>
                <View >

                    <Text style={styles.title}>{product.title}</Text>
                    <View style={styles.horizontal}>
                        <Text style={styles.price}>{product.price}</Text>
                        <Text style={styles.duration}>{product.duration}</Text>
                    </View>

                </View>
            </TouchableOpacity>

        </View>

    );

    return (

        <View style={{ backgroundColor: 'white' }}>

            <View style={styles.userInfo}>
                <View style={styles.userContainer}>
                    <TouchableOpacity
                        style={styles.imageContainer}>
                        <Image source={user.profileImage} style={styles.image} />
                    </TouchableOpacity>

                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{user.name}</Text>
                        <View style={styles.horizontal}>
                            <Text style={styles.location}>{user.location}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View>
                <Text style={styles.h1}>{user.name}님이 렌트 중인 상품
                </Text>
            </View>

            <View style={styles.productView}>
                {products.map(product => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </View>


        </View>

    );
};

const styles = StyleSheet.create({
    userInfo: {
        height: 90,
        borderRadius: 40,
        backgroundColor: '#DDEAF6',
        margin: '3%',
        justifyContent: 'center', // 수직 중앙 정렬
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginLeft: 15,
    },
    imageContainer: {
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 30, // 반지름을 반으로 설정하여 원형 모양의 이미지로 변경
        backgroundColor: 'lightgray',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 30, // 반지름을 반으로 설정하여 원형 모양의 이미지로 변경
    },
    horizontal: {
        flexDirection: 'row',
    },
    infoContainer: {
        flex: 1,
        marginBottom: '1%',
        marginLeft: 15,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: '1.5%',
    },
    location: {
        marginTop: '0.6%',
        fontSize: 15,
        color: 'gray',
    },
    h1: {
        // borderWidth:1,
        fontSize: 19,
        fontWeight: '600',
        marginLeft: 20,
        marginTop: 5,
    },
    productView: {
        marginTop: 10,
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingVertical: 10,
    },
    productImageContainer: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: 'lightgray',
        marginLeft: '5%',
    },
    Productimage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: 'gray',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: '1.5%',
    },
    price: {
        marginTop: '0.6%',
        fontSize: 15,
        color: 'gray',
    },
    duration: {
        padding: '0.7%',
        marginLeft: '3%',
        borderWidth: 1,
        borderColor: '#DDEAF6',
        borderRadius: 13,
        width: '13%',
        textAlign: 'center',
        backgroundColor: '#DDEAF6',
        overflow: 'hidden',
        color: 'gray',
    },
});

export default SellerInfo;
