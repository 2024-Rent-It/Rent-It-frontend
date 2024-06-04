// //사용자가 메시지를 입력할 수 있는 MessageInput 컴포넌트와 이를 통해 메시지를 보낼 수 있는 기능이 있음
// //받은 메시지를 표시하기 위해 MessageBubble 컴포넌트가 사용됨
// //사용자가 선택한 대화에 대한 메시지를 서버에서 가져오는 기능이 있음
// //사용자가 선택한 대화에 대한 새로운 메시지를 실시간으로 받아올 수 있도록 Socket.IO를 사용하여 구현됨

// import { Entypo } from '@expo/vector-icons';
// import { useEffect, useRef, useState } from 'react';
// import { useIsFocused } from '@react-navigation/native';
// import { useHeaderHeight } from '@react-navigation/elements';
// import { Image, FlatList, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
// import { ChatingInput } from '../../../screens/userTrans/ChatingInput.js';
// import { ChatingBubble } from '../../../screens/userTrans/ChatingBubble.js';
// import { useNavigation } from '@react-navigation/native';
// // import { io } from 'socket.io-client';



// // Screen
// export default function MessageScreen() {
//     const navigation = useNavigation();
//     // Check is focused
//     const focused = useIsFocused();
//     // Refs
//     const chatBoxRef = useRef(null);

//     // States
//     const [messages, setMessages] = useState([]);
//     // Functions
//     const postMessage = async (messageInput) => {
//         // Your postMessage function logic here
//     };

//     const getConversation = async () => {
//         // Inner function for check data
//         const isDataConversation = (data) => !!data.id;
//         // Fetch Conversation
//         fetchData('GET', `message/conversation/with/${recipient_id}`, {
//             Authorization: sender_id, // Authorization required
//         }).then((data) => {
//             // Check data
//             if (isDataConversation(data)) {
//                 // Set conversation id
//                 router.setParams({ conversation_id: data.id });
//                 // Set header title
//                 navigation.setOptions({
//                     title: data.users.filter((u) => u.id !== sender_id)[0].name,
//                 });
//             }
//         });
//     };

//     const getMessages = async () => {
//         return fetchData('GET', `message/conversation/${conversation_id}`).then(
//             (data) => {
//                 setMessages(data);
//                 return data;
//             }
//         );
//     };

//     const getNewMessage = async () => {
//         await fetch(
//             `${Networks.protocol}://${Networks.hostname}:${Networks.port}/message`,
//             {
//                 method: 'GET',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//             }
//         )
//             .then((res) => {
//                 const a = res.json();
//                 console.log('a', a);
//                 return a;
//             })
//             .then((json) => {
//                 console.log(json);
//             });
//     };
//     // Effects
//     useEffect(() => {
//         // Set header for use goBack()
//         navigation.setOptions({
//             headerLeft: () => (
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Entypo name="chevron-thin-left" size={24} />
//                 </TouchableOpacity>
//             ),
//         });
//     }, [navigation]);
//     useEffect(() => {
//         // get conversation data
//         if (sender_id && recipient_id) {
//             getConversation();
//         }
//     }, [sender_id, recipient_id]);
//     useEffect(() => {
//         // get messages
//         if (conversation_id) {
//             getMessages();
//         }
//     }, [conversation_id]);
//     useEffect(() => {
//         // Socket io init
//         const socket = io(API_URL);
//         if (focused) {
//             // Join socket.io Room
//             socket.emit('joinRoom', { conversation_id });
//             // Subscribe newMessage event
//             socket.on('newMessage', (message) => {
//                 console.log('event');
//                 // Update messages if message is from away
//                 setMessages((prev) => [message, ...prev]);
//                 // If message sent by current user, go top (inversed-bottom)
//                 if (message.sender_id === sender_id) {
//                     setTimeout(() => {
//                         chatBoxRef.current?.scrollToOffset({
//                             animated: true,
//                             offset: 0,
//                         });
//                     }, 0);
//                 }
//             });
//         }
//         return () => {
//             // Leave socket.io Room
//             socket.emit('leaveRoom', { conversation_id });
//             // Unsubscribe newMessage event
//             socket.off('newMessage');
//             // Distroy socket connection
//             socket.disconnect();
//         };
//     }, [focused, conversation_id]);
//     // Render
//     return (
//         <SafeAreaView style={styles.pageView}>
//             <KeyboardAvoidingView
//                 style={styles.keyboardAvoidingView}
//                 behavior="padding"
//                 keyboardVerticalOffset={headerHeight}
//             >
//                 <View style={styles.rectangle}>
//                     <Image
//                         style={styles.productImage}
//                         source={{
//                             uri: `${BASE_URL}/images/${product.productImages}`,
//                         }}
//                     />
//                     <View style={styles.productInfo}>
//                         <Text style={styles.productTitle}>{product.title}</Text>
//                         <Text style={styles.productPrice}>
//                             {`₩${product.price
//                                 .toString()
//                                 .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
//                         </Text>
//                     </View>
//                 </View>
//                 <FlatList
//                     ref={chatBoxRef}
//                     style={styles.chatBoxContainer}
//                     data={messages}
//                     keyExtractor={({ id }) => id}
//                     contentContainerStyle={{ gap: 4 }}
//                     maintainVisibleContentPosition={{
//                         minIndexForVisible: 0,
//                         autoscrollToTopThreshold: 0,
//                     }}
//                     renderItem={({ item, index }) => (
//                         <ChatingBubble
//                             message={item}
//                             isOwnMessage={sender_id === item.sender_id}
//                             isMessageTop={
//                                 messages[index + 1]?.sender_id !== item.sender_id
//                             }
//                             isMessageBottom={
//                                 messages[index - 1]?.sender_id !== item.sender_id
//                             }
//                         />
//                     )}
//                     inverted
//                     // refreshing
//                 />
//                 <ChatingInput postMessage={postMessage} />
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// }



// const styles = StyleSheet.create({
//     pageView: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     keyboardAvoidingView: {
//         flexGrow: 1,
//     },
//     chatBoxContainer: {
//         flex: 1,
//         paddingHorizontal: 8,
//     },
//     rectangle: {
//         height: 100, // 적절한 높이 조정
//         width: 330,
//         backgroundColor: '#DDEAF6',
//         alignSelf: 'center',
//         borderRadius: 30,
//     },
// });

// /**
//  * //사용자가 메시지를 입력할 수 있는 MessageInput 컴포넌트와 이를 통해 메시지를 보낼 수 있는 기능이 있음
// //받은 메시지를 표시하기 위해 MessageBubble 컴포넌트가 사용됨
// //사용자가 선택한 대화에 대한 메시지를 서버에서 가져오는 기능이 있음
// //사용자가 선택한 대화에 대한 새로운 메시지를 실시간으로 받아올 수 있도록 Socket.IO를 사용하여 구현됨

// import Ionicons from '@expo/vector-icons/Ionicons';
// import {
//     FlatList,
//     StyleSheet,
//     SafeAreaView,
//     TouchableOpacity,
//     KeyboardAvoidingView,
//     InteractionManager,
//     Text,
//     View,
// } from 'react-native';
// //import { io } from 'socket.io-client';
// import { Entypo } from '@expo/vector-icons';
// import { useEffect, useRef, useState } from 'react';
// import { useIsFocused } from '@react-navigation/native';
// import { useHeaderHeight } from '@react-navigation/elements';
// import { ChatingInput } from '/Users/heojuwon/Rent-It-frontend/src/screens/userTrans/ChatingBubble.js';
// import { ChatingBubble } from '/Users/heojuwon/Rent-It-frontend/src/screens/userTrans/ChatingInput.js';
// import { API_URL, Networks, fetchData } from '/Users/heojuwon/Rent-It-frontend/src/screens/userTrans/Networks.js';
// import { router, useLocalSearchParams, useNavigation } from 'expo-router';

// // Screen
// export default function MessageScreen() {
//     // Check is focused
//     const focused = useIsFocused();
//     // Refs
//     const chatBoxRef = useRef(null);

//     // Router
//     const navigation = useNavigation();
//     const headerHeight = useHeaderHeight(); // for keyboardVerticalOffset
//     const { sender_id, recipient_id, conversation_id } = useLocalSearchParams();
//     // States
//     const [messages, setMessages] = useState([]);
//     // Functions
//     const getConversation = async () => {
//         // Inner function for check data
//         const isDataConversation = (data) => !!data.id;
//         // Fetch Conversation
//         fetchData('GET', `message/conversation/with/${recipient_id}`, {
//             Authorization: sender_id, // Authorization required
//         }).then((data) => {
//             // Check data
//             if (isDataConversation(data)) {
//                 // Set conversation id
//                 router.setParams({ conversation_id: data.id });
//                 // Set header title
//                 navigation.setOptions({
//                     title: data.users.filter((u) => u.id !== sender_id)[0].name,
//                 });
//             }
//         });
//     };

//     const postMessage = async (messageInput) => {
//         fetchData(
//             'POST',
//             'message',
//             { Authorization: sender_id },
//             JSON.stringify({
//                 sender_id,
//                 conversation_id,
//                 data: { text: messageInput },
//             })
//         );
//     };

//     const getMessages = async () => {
//         return fetchData('GET', `message/conversation/${conversation_id}`).then(
//             (data) => {
//                 setMessages(data);
//                 return data;
//             }
//         );
//     };

//     const getNewMessage = async () => {
//         await fetch(
//             `${Networks.protocol}://${Networks.hostname}:${Networks.port}/message`,
//             {
//                 method: 'GET',
//                 headers: {
//                     Accept: 'application/json',
//                     'Content-Type': 'application/json',
//                 },
//             }
//         )
//             .then((res) => {
//                 const a = res.json();
//                 console.log('a', a);
//                 return a;
//             })
//             .then((json) => {
//                 console.log(json);
//             });
//     };
//     // Effects
//     useEffect(() => {
//         // Set header for use goBack()
//         navigation.setOptions({
//             headerLeft: () => (
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Entypo name="chevron-thin-left" size={24} />
//                 </TouchableOpacity>
//             ),
//         });
//     }, [navigation]);
//     useEffect(() => {
//         // get conversation data
//         if (sender_id && recipient_id) {
//             getConversation();
//         }
//     }, [sender_id, recipient_id]);
//     useEffect(() => {
//         // get messages
//         if (conversation_id) {
//             getMessages();
//         }
//     }, [conversation_id]);
//     useEffect(() => {
//         // Socket io init
//         const socket = io(API_URL);
//         if (focused) {
//             // Join socket.io Room
//             socket.emit('joinRoom', { conversation_id });
//             // Subscribe newMessage event
//             socket.on('newMessage', (message) => {
//                 console.log('event');
//                 // Update messages if message is from away
//                 setMessages((prev) => [message, ...prev]);
//                 // If message sent by current user, go top (inversed-bottom)
//                 if (message.sender_id === sender_id) {
//                     setTimeout(() => {
//                         chatBoxRef.current?.scrollToOffset({
//                             animated: true,
//                             offset: 0,
//                         });
//                     }, 0);
//                 }
//             });
//         }
//         return () => {
//             // Leave socket.io Room
//             socket.emit('leaveRoom', { conversation_id });
//             // Unsubscribe newMessage event
//             socket.off('newMessage');
//             // Distroy socket connection
//             socket.disconnect();
//         };
//     }, [focused, conversation_id]);
//     // Render
//     return (
//         <SafeAreaView style={styles.pageView}>
//             <KeyboardAvoidingView
//                 style={styles.keyboardAvoidingView}
//                 behavior="padding"
//                 keyboardVerticalOffset={headerHeight}
//             >
//                 <View style={styles.rectangle}>
//                     <Image
//                         style={styles.productImage}
//                         source={{
//                             uri: `${BASE_URL}/images/${product.productImages}`,
//                         }}
//                     />
//                     <View style={styles.productInfo}>
//                         <Text style={styles.productTitle}>{product.title}</Text>
//                         <Text style={styles.productPrice}>
//                             {`₩${product.price
//                                 .toString()
//                                 .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}
//                         </Text>
//                     </View>
//                 </View>
//                 <FlatList
//                     ref={chatBoxRef}
//                     style={styles.chatBoxContainer}
//                     data={messages}
//                     keyExtractor={({ id }) => id}
//                     contentContainerStyle={{ gap: 4 }}
//                     maintainVisibleContentPosition={{
//                         minIndexForVisible: 0,
//                         autoscrollToTopThreshold: 0,
//                     }}
//                     renderItem={({ item, index }) => (
//                         <ChatingBubble
//                             message={item}
//                             isOwnMessage={sender_id === item.sender_id}
//                             isMessageTop={
//                                 messages[index + 1]?.sender_id !== item.sender_id
//                             }
//                             isMessageBottom={
//                                 messages[index - 1]?.sender_id !== item.sender_id
//                             }
//                         />
//                     )}
//                     inverted
//                     // refreshing
//                 />
//                 <ChatingInput postMessage={postMessage} />
//             </KeyboardAvoidingView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     pageView: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     keyboardAvoidingView: {
//         flexGrow: 1,
//     },
//     chatBoxContainer: {
//         flex: 1,
//         paddingHorizontal: 8,
//     },
//     rectangle: {
//         height: 100, // 적절한 높이 조정
//         width: 330,
//         backgroundColor: '#DDEAF6',
//         alignSelf: 'center',
//         borderRadius: 30,
//     },
// });
//  */