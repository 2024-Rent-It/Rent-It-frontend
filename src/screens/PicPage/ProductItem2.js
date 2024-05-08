import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BASE_URL } from '../../constants/api.js';
import styled from 'styled-components/native';

const styles = StyleSheet.create({
    listItem: {
        paddingVertical: 12,
        borderColor: 'lightgrey',
        borderBottomWidth: '1px',
        flexDirection: 'row',
    },
    gridItem: {
        flexDirection: 'column',
    },
    listImage: {
        aspectRatio: 1 / 1,
        width: 140,
        marginRight: 16,
        borderRadius: 8,
    },
    girdImage: {
        aspectRatio: 1 / 1,
        width: '100%',
        marginBottom: 8,
        borderRadius: 8,
    },
    info: {
        flexGrow: 1,
    },
    title: {
        fontSize: 16,
    },
    price: {
        fontSize: 16,
        fontWeight: '700',
    },
    duration: {
        padding: 8,
        marginTop: 8,
        borderRadius: 16,
        alignSelf: 'flex-start',
        backgroundColor: '#bcd3e8',
        overflow: 'hidden',
    },
});

const ProductItem2 = ({ product, isGrid }) => {
    return (
        <View style={isGrid ? styles.gridItem : styles.listItem}>
            <Image
                style={isGrid ? styles.girdImage : styles.listImage}
                source={{
                    uri: `${BASE_URL}/images/${product.productImages}`,
                }}
            />
            <View style={styles.info}>
                <Text style={styles.price}>
                    {`₩${product.price
                        .toString()
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
                </Text>
                <Text style={styles.title}>{product.title}</Text>
                {!isGrid ? (
                    <Text style={styles.duration}>{product.duration}</Text>
                ) : null}
            </View>
        </View>
    );
};

export default ProductItem2;
