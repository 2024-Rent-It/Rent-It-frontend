import React ,{ useEffect, useState }from "react";
import { View, StyleSheet, Text } from "react-native";
import axios from 'axios';
import { BASE_URL } from '../../constants/api.js';


const NoticeDetail_1 = ({ navigation, route }) => {
    // const { title, date, content } = route.params;
    const { id, title, date } = route.params;
    const [content, setContent] = useState('');

    useEffect(() => {
        const NoticePath = `/notices/${id}`;
        axios.get(`${BASE_URL}${NoticePath}`)
            .then(response => {
                setContent(response.data.content);
            })
            .catch(error => {
                console.error('공지사항을 불러오는데 에러가 생겼습니다.', error);
            });
    }, [id]);
    return (
        <View style={styles.back}>
            
                <View style={styles.titleContainer}>
                    <View style={styles.horizon}>
                        <Text style={[styles.titleFont]} >{title}</Text>
                        <Text style={styles.h1}><Text>{date}</Text></Text>
                    </View>
                    <Text style={styles.h2}> 작성자 : 렌팃</Text>
                </View>

                <View style={styles.content}>
                    <Text style={styles.contextText}>
                        {content}
                    </Text>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    titleContainer: {
        margin: 15,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
    },
    h1: {
        width: '25%',
        fontSize: 16,
        color: 'grey',
    },
    h2: {
        fontSize: 15,
        color: 'grey',
        padding: 10,
    },
    titleFont: {
        fontSize: 25,
        width: '77%',
        flexWrap: 'wrap',
        flex: 1,
        paddingLeft:'2%',
    },
    content: {
        paddingHorizontal: 15, // 좌우 여백 설정
    },
    contextText: {
        fontSize: 16,
        lineHeight: 24,
        marginLeft:'2%',
    },
});