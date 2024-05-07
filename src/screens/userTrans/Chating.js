import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Alert, Pressable, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";



const Chating = ({ navigation }) => {

    const [product, setProduct] = useState(
        { id: 1, title: '침착한 케로로', price: '3500원', duration: '1일', selectedImage: require('../../../assets/images/coat.jpg') }
    );

    const ProductItem = ({ product }) => (
        <View style={styles.productContainer}>

            {/* <View style={styles.imageContainer}>

                <Pressable
                    onPress={() => navigation.navigate('SellerInfo')}>
                    <View style={styles.image}>
                        <Image source={product.selectedImage} style={styles.image} />
                    </View>
                </Pressable>

            </View> */}
            <View style={styles.imageContainer}>
                <Pressable onPress={() => navigation.navigate('판매자 정보')}>
                    <Image source={product.selectedImage} style={styles.image} />
                </Pressable>
            </View>



            <View style={styles.infoContainer}>

                <Text style={styles.title}>{product.title}</Text>
                <View style={styles.horizontal}>
                    <Text style={styles.price}>{product.price}</Text>
                    <View style={styles.durationContainer}>
                        <Text style={styles.duration}>{product.duration}</Text>
                    </View>
                </View>

            </View>
        </View>

    );


    return (
        <View style={{ backgroundColor: 'white', height: '100%' }}>
            <View style={styles.productInfo}>
                <ProductItem product={product} />
            </View>
        </View>

    );

};



const styles = StyleSheet.create({
    Container: {
        flex: 1,
        alignItems: 'center', // 수직 중앙 정렬
    },
    productInfo: {
        height: 100,
        borderRadius: 40,
        backgroundColor: '#DDEAF6',
        margin: '3%',
        justifyContent: 'center', // 수직 중앙 정렬
    },
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        marginLeft: 15,
    },
    imageContainer: {
        justifyContent: 'center',
        width: 66,
        height: 66,
        borderRadius: 10,
        backgroundColor: 'lightgray',
        position: 'absolute',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 15,
        backgroundColor: 'gray',
    },
    horizontal: {
        flexDirection: 'row',
    },
    infoContainer: {
        flex: 1,
        marginBottom: '1%',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: '1.5%',
    },
    price: {
        marginTop: '0.6%',
        fontSize: 15,
        color: 'black',
    },
    durationContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        height: 25,
        width: '13%',
        marginLeft: 10,
        backgroundColor: '#2F4A62',
        borderRadius: 15,
        // borderWidth: 1,
    },
    duration: {
        color: 'white',
        padding: '0.7%',
        borderRadius: 15,
        width: '30',
        textAlign: 'center',
    },
});

export default Chating;