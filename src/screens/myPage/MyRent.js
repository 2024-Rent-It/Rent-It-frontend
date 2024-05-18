import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, ScrollView, Text, Pressable, Image } from "react-native";

const Tab = createMaterialTopTabNavigator();

const MyRent = ({ }) => {
    const [products, setProducts] = useState([
        { id: 1, title: '케로로 귀여워', price: '3000원', duration: '1개월', traderName: '', startDate: '', endDate: '24-05-11', status: '렌트가능', selectedImage: require('../../../assets/images/coat.jpg') },
        { id: 2, title: '바보 개구리', price: '2000000원', duration: '2개월', traderName: '', startDate: '', endDate: '24-06-18', status: '렌트가능', selectedImage: require('../../../assets/images/k.png') },
        { id: 3, title: '코난 개구리', price: '800000원', duration: '5개월', traderName: '장원영', startDate: '11111', endDate: '24-04-05', status: '렌트완료', selectedImage: require('../../../assets/images/plate.jpg') },
        { id: 4, title: '귀여운 코난', price: '5000원', duration: '3개월', traderName: '카리나', startDate: '1231', endDate: '23-03-19', status: '렌트완료', selectedImage: require('../../../assets/images/tools.png') },
        { id: 5, title: '청소하는 타마마', price: '500원', duration: '8개월', traderName: '침착맨', startDate: '1231', endDate: '24-12-19', status: '렌트중', selectedImage: require('../../../assets/images/tree.jpg') },

    ]);

    const ProductItem = ({ product }) => (
        <View style={styles.productContainer}>

            <Pressable onPress={() => navigation.navigate('상세 화면')}>

                <View style={styles.imageContainer}>
                    <View style={styles.image}>
                        <Image source={product.selectedImage} style={styles.image} />
                    </View>
                </View>

            </Pressable>

            <View style={styles.infoContainer}>

                <View style={styles.horizontal}>
                    <Text style={styles.title}>{product.title}</Text>
                    {/* <Text style={styles.status}>{product.status}</Text> */}
                </View>


                <View style={styles.horizontal}>
                    <Text style={styles.price}>{product.price}</Text>
                    <View style={styles.duration}>
                        <Text >반납일 : {product.endDate}</Text>
                    </View>

                </View>

            </View>
        </View>
    );

    const DoingScreen = ({ }) => (
        <ScrollView>
            <View>
                {products.filter(product => product.status === '렌트중').map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </View>
        </ScrollView>


    );

    const DoneScreen = ({ }) => (
        <ScrollView>
            <View>
                {products.filter(product => product.status === '렌트완료').map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </View>
        </ScrollView>


    );


    return (

        <Tab.Navigator
            screenOptions={() => ({
            })}
        >
            <Tab.Screen name="렌트중" component={DoingScreen} />
            <Tab.Screen name="렌트완료" component={DoneScreen} />

        </Tab.Navigator>
    );

};



const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: 'lightgray',
        marginLeft: '5%',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: 'gray',
    },
    horizontal: {
        flexDirection: 'row',
    },
    infoContainer: {
        flex: 1,
        width: 20,
        marginBottom: '1%',
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
    status: {
        height: 25,
        padding: '0.7%',
        marginLeft: '3%',
        borderWidth: 1,
        borderColor: '#A7C8E7',
        borderRadius: 13,
        width: '25%',
        textAlign: 'center',
        justifyContent: 'center',
        backgroundColor: '#A7C8E7',
        overflow: 'hidden',
        color: 'black',
        paddingTop: 3,
    },
    duration: {
        // padding: '0.7%',
        // marginLeft: '3%',
        // borderWidth: 1,
        // borderColor: '#DDEAF6',
        // borderRadius: 13,
        // width: '25%',
        // textAlign: 'center',
        // backgroundColor: '#DDEAF6',
        // overflow: 'hidden',
        // color: 'gray',
        height: 25,
        fontSize: 14,
        marginLeft: 5,
        backgroundColor: '#DDEAF6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10, // 양쪽으로 패딩 추가
        minWidth: '30%', // 최소 너비 설정
    },
});

export default MyRent;