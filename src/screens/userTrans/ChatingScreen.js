import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, SafeAreaView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChatScreen = ({ productId }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProductData(productId);
    }, [productId]);

    const fetchProductData = async (productId) => {
        try {
            const response = await fetch(`${BASE_URL}/products/${productId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch product data');
            }
            const productData = await response.json();
            setProduct(productData);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    const sendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { id: messages.length.toString(), text: input }]);
            setInput('');
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.text}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.header}>
                    {product && (
                        <>
                            <Image source={{ uri: `${BASE_URL}/${product.images[0]}` }} style={styles.productImage} />
                            <View style={styles.productInfo}>
                                <Text style={styles.productTitle}>{product.title}</Text>
                                <Text style={styles.productPrice}>₩ {product.price}</Text>
                            </View>
                        </>
                    )}
                </View>
                <View style={styles.messageListContainer}>
                    <FlatList
                        data={messages}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        style={styles.messageList}
                        contentContainerStyle={styles.messageListContent}
                    />
                </View>
                
                <View style={styles.inputContainer}>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            style={styles.input}
                            value={input}
                            onChangeText={setInput}
                            //placeholder="메시지를 입력하세요..."
                        />
                    </View>
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <Icon name="send" size={24} color="#000" />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: 100,
        width: '83%',
        backgroundColor: '#DDEAF6',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 40,
        flexDirection: 'row',
        padding: 10,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
    },
    productInfo: {
        marginLeft: 10,
        justifyContent: 'center',
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        color: '#888',
        marginTop: 5,
    },
    messageListContainer: {
        flex: 1,
    },
    messageList: {
        flex: 1,
    },
    messageListContent: {
        padding: 10,
    },
    messageContainer: {
        padding: 10,
        backgroundColor: '#DDEAF6',
        borderRadius: 10,
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
        color: '#000',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#DDEAF6',
        marginBottom: 5,
    },
    textInputContainer: {
        flex: 1,
    },
    input: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        marginLeft: 10,
    },
    iconButton: {
        justifyContent: 'center',
        padding: 5,
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
    },
});

export default ChatScreen;
