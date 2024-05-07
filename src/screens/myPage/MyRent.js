import React, { useState, useEffect } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, Text, TextInput, Alert, Pressable, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";



const MyRent = ({ }) => {

    const [products, setProducts] = useState([
        { id: 1, title: '침착한 케로로', price: '3500원', duration: '1일', selectedImage: require('../../../assets/images/coat.jpg') },
        { id: 2, title: '그냥 개구리', price: '7000원', duration: '2일',  selectedImage: require('../../../assets/images/k.png') },
        { id: 3, title: '케로케로', price: '8500원', duration: '8일', selectedImage: require('../../../assets/images/plate.jpg') },
        { id: 4, title: '똑똑한 쿠루루', price: '580000원', duration: '3일', selectedImage: require('../../../assets/images/tools.png') },
        { id: 5, title: '이중인격 타마마', price: '50000원', duration: '10일', selectedImage: require('../../../assets/images/tree.jpg') },
    ]);

    const ProductItem = ({ product }) => (
        <View style={styles.productContainer}>

            <Pressable onPress={() => navigation.navigate('ProductDetail')}>

                <View style={styles.imageContainer}>
                    <View style={styles.image}>
                        <Image source={product.selectedImage} style={styles.image} />
                    </View>
                </View>

            </Pressable>

            <View style={styles.infoContainer}>

                <Text style={styles.title}>{product.title}</Text>
                <View style={styles.horizontal}>
                    <Text style={styles.price}>{product.price}</Text>
                    <Text style={styles.duration}>{product.duration}</Text>
                </View>

            </View>
        </View>
    );


    return (
        <View>
            {products.map(product => (
                <ProductItem key={product.id} product={product} />
            ))}
        </View>
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
        marginBottom:'1%',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom:'1.5%',
    },
    price: {
        marginTop:'0.6%',
        fontSize: 15,
        color: 'gray',
    },
    duration: {
        padding:'0.7%',
        marginLeft:'3%',
        borderWidth: 1,
        borderColor:'#DDEAF6',
        borderRadius:13,
        width: '13%',
        textAlign:'center',
        backgroundColor:'#DDEAF6',
        overflow: 'hidden',
        color: 'gray',
    },
});

export default MyRent;