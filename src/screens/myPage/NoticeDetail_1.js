import React from "react";
import { View, StyleSheet, Text } from "react-native";



const NoticeDetail_1 = ({ navigation, route }) => {
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
                        케로 케로 케로 케로 힘차게
                        케로 케로 케로 나가자
                        우리 앞에 있는 모든 시련들 겁낼 필요 없다

                        케로로 소대 오늘도 출동을 하네
                        큰 맘 먹고 세차하면 비오고 소풍가면 소나기
                        급하게 탄 버스 방향 틀리고
                        건널목에 가면 항상 내 앞에서 빨간불

                        케로 케로 케로 케로 힘차게
                        케로 케로 케로 나가자
                        우리 앞에 있는 모든 시련들 겁낼 필요 없다
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default NoticeDetail_1;

const styles = StyleSheet.create({
    back: {
        backgroundColor: 'white',
        height: '100%',
    },
    horizon: {
        height:50,
        flexDirection: 'row',
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
        fontSize: 30,
        width: '67%',
        flex: 1,
    },
    content: {

        paddingHorizontal: 15, // 좌우 여백 설정

    },
    contextText: {
        fontSize: 16,
        lineHeight: 24,
    },
});