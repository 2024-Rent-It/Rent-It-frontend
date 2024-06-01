

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyChatListScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>나의 채팅방 목록</Text>
            </View>
            {/* 나머지 화면 내용 */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#DDEAF6',
        padding: 10,
        
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: 10,
    },
});

export default MyChatListScreen;



