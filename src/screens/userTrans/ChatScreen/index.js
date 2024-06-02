//채팅방 목록
import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { fetchData } from '@/constants/Networks';
import { useIsFocused } from '@react-navigation/native';

export default function MessageRoomScreen() {
    const focused = useIsFocused(); // 현재 화면이 포커스 되었는지 확인
    const [users, setUsers] = useState([]); // 사용자 목록 상태
    const [currentUser, setCurrentUser] = useState(); // 현재 사용자 상태
    const [conversations, setConversations] = useState([]); // 대화 목록 상태

    // 사용자 목록 가져오기 함수
    const getUsers = () => {
        fetchData('GET', 'user').then((data) => {
            setUsers(data);
            if (!currentUser) {
                setCurrentUser(data[0]); // 현재 사용자가 설정되지 않은 경우 첫 번째 사용자로 설정
            }
        });
    };

    // 대화 목록 가져오기 함수
    const getConversations = () => {
        if (currentUser) {
            fetchData('GET', 'message/conversation', {
                Authorization: currentUser.id,
            }).then((data) => {
                setConversations(data);
            });
        }
    };

    // 화면이 포커스될 때 사용자 목록 가져오기
    useEffect(() => {
        if (focused) {
            getUsers();
        }
    }, [focused]);

    // 화면이 포커스되거나 현재 사용자가 변경될 때 대화 목록 가져오기
    useEffect(() => {
        if (focused && currentUser) {
            getConversations();
        }
    }, [focused, currentUser]);

    return (
        <SafeAreaView style={styles.pageView}>
            <View style={styles.pageInnerView}>
                <Text style={styles.sectionHeader}>나의 채팅방 목록</Text>
                {currentUser && (
                    <>
                        <FlatList
                            style={{ flexGrow: 1 }}
                            data={conversations}
                            keyExtractor={({ id }) => id}
                            renderItem={({ item }) => (
                                <Link
                                    href={{
                                        pathname: 'message',
                                        params: {
                                            sender_id: currentUser.id,
                                            recipient_id: item.users.filter((u) => u.id !== currentUser.id)[0].id,
                                            conversation_id: item.id,
                                        },
                                    }}
                                    asChild
                                >
                                    <TouchableOpacity style={styles.conversationLink}>
                                        <View style={styles.userIconView}>
                                            <FontAwesome5 name="user" size={36} color="dimgrey" />
                                        </View>
                                        <View>
                                            <Text style={styles.userNameText}>
                                                {item.users.filter((u) => u.id !== currentUser.id)[0].name}
                                            </Text>
                                            <Text style={styles.lastMessageText}>
                                                {item.latest_message.data.text}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </Link>
                            )}
                        />
                        <Link
                            href={{
                                pathname: 'new',
                                params: {
                                    currentUserId: currentUser.id,
                                },
                            }}
                            asChild
                        >
                            


                            
                        </Link>
                    </>
                )}
            </View>
        </SafeAreaView>
    );
}

/**<TouchableOpacity style={styles.newMessageButton}>
                                <FontAwesome5 name="send" color={'gray'} size={18} style={{ marginRight: 16 }} />
                                <Text style={styles.newMessageText}>새 대화</Text>
                            </TouchableOpacity> */

const styles = StyleSheet.create({
    pageView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pageInnerView: {
        flexGrow: 1,
        paddingHorizontal: 16,
    },
    sectionHeader: {
        marginBottom: 18,
        fontSize: 20,
        fontWeight: '600',
        backgroundColor: '#DDEAF6',
        paddingHorizontal: 16,
        paddingVertical: 7,
    },
    conversationLink: {
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userIconView: {
        height: 64,
        aspectRatio: 1 / 1,
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userNameText: {
        fontSize: 16,
        fontWeight: '600',
    },
    lastMessageText: {
        color: 'dimgrey',
    },
    newMessageButton: {
        paddingVertical: 16,
        marginBottom: 16,
        borderRadius: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DDEAF6',
    },
    newMessageText: {
        color: 'black',
        fontSize: 18,
    },
});
