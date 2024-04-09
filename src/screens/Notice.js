import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Pressable } from 'react-native';


const DATA = [
    { id: 1, title: '🚨필독 공지사항!', date: '2024-04-01', screen:'NoticeDetail_1' },
    { id: 2, title: '신고 누적된 유저에 대한 제재 조항', date: '2024-02-13', screen:'NoticeDetail_2' },
]

const Item = ({ item, style, navigation }) => (
    <Pressable onPress={() => navigation.navigate(item.screen,{title: item.title, date: item.date })}>
        <View style={[styles.item, style]}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
            </View>
            <Text style={styles.date}>{item.date}</Text>
        </View>
    </Pressable>
);

const Notice = ({ navigation }) => {

    const renderItem = ({ item }) => (
        <Item
            item={item}
            navigation={navigation}
        />
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
        backgroundColor:'white',
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
        borderBottomWidth: 10,
        borderBottomColor: 'black',
    },
    date: {
        fontSize: 16,
        color: 'gray',
    }
});