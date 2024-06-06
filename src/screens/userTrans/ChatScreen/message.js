import React, { useEffect, useRef, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    StyleSheet,
    KeyboardAvoidingView,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import {
    useIsFocused,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';
import { useHeaderHeight } from '@react-navigation/elements';
import { useAuth } from '../../../contexts/AuthContext';
import { ChatingInput } from '../../../screens/userTrans/ChatingInput.js';
import { ChatingBubble } from '../../../screens/userTrans/ChatingBubble.js';
import { BASE_URL } from '../../../constants/api';
import { TextDecoder, TextEncoder } from 'text-encoding';

export default function MessageScreen() {
    const { userId } = useAuth();
    const route = useRoute();
    const { roomId, roomProduct } = route.params;
    const [messages, setMessages] = useState([]);
    const chatBoxRef = useRef(null);
    const stompClient = useRef(null);
    const isFocused = useIsFocused();
    const navigation = useNavigation();
    const headerHeight = useHeaderHeight();
    const [receiverId, setReceiverId] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/chat/room/${roomId}`);
                // console.log("출력",response);
                const { sortedMessages, seller, buyer } = response.data.data;
                setMessages(sortedMessages);
                // setProduct(roomProduct);
                setReceiverId(userId == seller.id ? buyer.id : seller.id);
                console.log("상품 확인하자",roomProduct);
                console.log("상품 이미지",`${BASE_URL}/images/${roomProduct.productImages[0]}`);
            } catch (error) {
                console.error('Failed to fetch messages:', error);
            }
        };

        fetchMessages();
    }, [roomId]);


    useEffect(() => {
        const socketUrl = `${BASE_URL}/ws`;
        // const socketUrl = `http://43.200.30.91:8080/ws`;
        Object.assign(global, {
            TextEncoder: TextEncoder,
            TextDecoder: TextDecoder,
        });
        stompClient.current = new Client({
            brokerURL: socketUrl,
            reconnectDelay: 5000,
            heartbeatIncoming: 2000,
            heartbeatOutgoing: 2000,
            onConnect: () => {
                console.log('Connected to WebSocket server');
                stompClient.current.subscribe(
                    `/topic/chat/${userId}`,
                    (message) => {
                        const newMessage = JSON.parse(message.body);
                        setMessages((prevMessages) => [
                            newMessage,
                            ...prevMessages,
                        ]);
                        if (newMessage.senderId === userId) {
                            chatBoxRef.current?.scrollToOffset({
                                animated: true,
                                offset: 0,
                            });
                        }
                    }
                );
            },
            onStompError: (error) => {
                console.log('Stomp error:', error);
            },
        });
        stompClient.current.activate();
        return () => {
            stompClient.current.deactivate();
        };
    });

    const postMessage = async (messageText) => {
        const message = {
            message: messageText,
            senderId: userId,
            receiverId: receiverId, // Set the receiverId based on the chat room details
            roomId: roomId,
        };

        if (stompClient.current) {
            stompClient.current.publish({
                destination: '/app/chat/send',
                body: JSON.stringify(message),
            });
            const currentTime = new Date().toISOString();


            const newMessage = {
                message: messageText, // 메시지 텍스트 설정
                sendTime: currentTime, // 현재 시간 설정
                sender: { id: userId } // 보낸 사람 설정 (userId를 사용)
            };
            setMessages((prevMessages) => [newMessage, ...prevMessages]);
            if (newMessage.sender.id === userId) {
                chatBoxRef.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                });
            }
        }
    };

    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Entypo name="chevron-thin-left" size={24} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.pageView}>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior="padding"
                keyboardVerticalOffset={headerHeight}
            >
                <TouchableOpacity style={styles.rectangle} 
                onPress={() => {
                    navigation.navigate('상세 화면', { id: roomProduct.id });
                }}>
                    <Image
                        style={styles.productImage}
                        source={{ uri: `${BASE_URL}/images/${roomProduct.productImages[0]}` }}
                    />
                    <View style={styles.productInfo}>
                        <Text style={styles.productTitle}>{roomProduct.title}</Text>
                        <Text style={styles.productPrice}>
                            {`₩${roomProduct.price}`}
                        </Text>
                    </View>
                </TouchableOpacity>
                <FlatList
                    ref={chatBoxRef}
                    style={styles.chatBoxContainer}
                    data={messages}
                    keyExtractor={(item, index) => `${item.sender?.id}-${item.sendTime}-${index}`}
                    contentContainerStyle={{ gap: 4 }}
                    maintainVisibleContentPosition={{ minIndexForVisible: 0, autoscrollToTopThreshold: 0 }}
                    renderItem={({ item, index }) => {
                        // console.log('Item:', item);
                        // console.log('Index:', index);
                        return (
                            <ChatingBubble
                                message={item}
                                isOwnMessage={userId === item.sender?.id}
                                isMessageTop={
                                    messages[index + 1]?.sender?.id !== item.sender?.id
                                }
                                isMessageBottom={
                                    messages[index - 1]?.sender?.id !== item.sender?.id
                                }
                            />
                        );
                    }}
                    inverted
                />
                <ChatingInput postMessage={postMessage} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    productImage: {
        position: 'absolute', 
        left: 10, 
        top: 10, 
        width: 80, 
        height: 80, 
        backgroundColor: '#fff', 
        borderRadius: 30,
    },
    productInfo: {
        marginLeft: 100, 
        marginTop: 25,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 16,
    },
    pageView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardAvoidingView: {
        flexGrow: 1,
    },
    chatBoxContainer: {
        flex: 1,
        paddingHorizontal: 8,
    },
    rectangle: {
        marginTop:10,
        height: 100, // 적절한 높이 조정
        width: 330,
        backgroundColor: '#DDEAF6',
        alignSelf: 'center',
        borderRadius: 30,
    },
});
