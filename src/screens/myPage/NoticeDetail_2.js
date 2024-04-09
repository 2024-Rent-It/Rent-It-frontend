import React from "react";
import { View, StyleSheet, Text } from "react-native";



const NoticeDetail_2 = ({ navigation, route }) => {
    const { title, date } = route.params;
    return (
        <View style={styles.back}>
            <View>
                <View style={styles.titleContainer}>
                    <View style={styles.horizon}>
                        <Text style={[styles.titleFont, { flexShrink: 1 }]} adjustsFontSizeToFit numberOfLines={1}>{title}</Text>
                        <Text style={styles.h1}><Text>{date}</Text></Text>
                    </View>
                    <Text style={styles.h2}> 작성자 : 렌팃</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contextText}>
                        다섯 개구리 모여서 공명을 하네
                        힘들어도 밝은 얼굴 웃어봐 우린 내일이 있어
                        세상 일이 힘이 들고 지쳐도
                        우리 모두 모여 하나되면 해낼 수 있어
                        이 세상에 두려운건 없어 너와 함께면
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default NoticeDetail_2;

const styles = StyleSheet.create({
    back: {
        backgroundColor: 'white',
        height:'100%',
    },
    horizon: {
        flexDirection: 'row',
        height:50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleContainer: {
        margin: 15,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    h1: {
        fontSize: 16,
        color: 'grey',
    },
    h2: {
        fontSize: 15,
        color: 'grey',
        padding: 10,
    },
    titleFont: {
        fontSize: 22,
        width: '67%',
        flex: 1,
        flexWrap: 'wrap',
    },
    content: {

        paddingHorizontal: 15, // 좌우 여백 설정

    },
    contextText: {
        fontSize: 16,
        lineHeight: 24,
    },
});