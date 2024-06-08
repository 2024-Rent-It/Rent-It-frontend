// import React from 'react';
// import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Pressable } from 'react-native';


// const DATA = [
//     { id: 1, title: '🚨필독 공지사항!', date: '2024-04-01', screen:'NoticeDetail_1', content:'다섯 개구리 모여서 공명을 하네' },
//     { id: 2, title: '신고 누적된 유저에 대한 제재 조항케로', date: '2024-02-13', screen:'NoticeDetail_1', content:'케로케로케로케로신나게케로케로케로나가자' },
// ]

// const Item = ({ item, style, navigation }) => (
//     <Pressable onPress={() => navigation.navigate(item.screen,{title: item.title, date: item.date, content: item.content })}>
//         <View style={[styles.item, style]}>
//             <View style={styles.titleContainer}>
//                 <Text style={styles.title}>{item.title}</Text>
//             </View>
//             <Text style={styles.date}>{item.date}</Text>
//         </View>
//     </Pressable>
// );

// const Notice = ({ navigation }) => {

//     const renderItem = ({ item }) => (
//         <Item
//             item={item}
//             navigation={navigation}
//         />
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <FlatList
//                 data={DATA}
//                 renderItem={renderItem}
//                 keyExtractor={item => item.id.toString()}
//             />
//         </SafeAreaView>
//     )
// };

// export default Notice;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor:'white',
//         flex: 1,
//         marginTop: StatusBar.currentHeight || 0,
//     },
//     item: {
//         flexDirection: 'row',
//         padding: 10,
//         marginVertical: 8,
//         marginHorizontal: 16,
//         borderBottomWidth: 1,
//     },
//     titleContainer: {
//         flex: 1, 
//     },
//     title: {
//         fontSize: 20,
//         borderBottomWidth: 10,
//         borderBottomColor: 'black',
//     },
//     date: {
//         fontSize: 16,
//         color: 'gray',
//     }
// });
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Pressable } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../../constants/api.js';


const Notice = ({ navigation }) => {
    const [DATA, setDATA] = useState([]);
    const NoticeListPath = '/notices';
    useEffect(() => {
        axios.get(`${BASE_URL}${NoticeListPath}`)
            .then(response => {
                console.log(response.data)
                const updatedData = response.data.map(notice => ({
                    id: notice.noticeId,
                    title: notice.title,
                    date: notice.createdAt.substring(0, 10)
                }));
                setDATA(prevData => [...prevData, ...updatedData]);
            })
            .catch(error => {
                console.error('공지사항 리스트를 불러오는데 에러가 생겼습니다.', error);
            });
    }, []);

    const renderItem = ({ item }) => (
        <Pressable onPress={() => navigation.navigate('공지사항 상세', { id:item.id, title: item.title, date: item.date })}>
            <View style={styles.item}>
            <View style={styles.titleContainer}>
                 <Text style={styles.title}>{item.title}</Text>
             </View>
             <Text style={styles.date}>{item.date}</Text>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    )
};

export default Notice;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderBottomWidth: 1,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    date: {
        fontSize: 16,
        color: 'gray',
    }
});
