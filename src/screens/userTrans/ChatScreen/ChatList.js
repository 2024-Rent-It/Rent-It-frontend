import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext';
import { BASE_URL } from '../../../constants/api';


const ChatRoomList = ({ navigation }) => {
    const { userId } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentUser = {
    id: userId, // 로그인한 사용자 ID
  };

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/chat/room`, {
          params: { memberId: currentUser.id }
        });
        const chatRooms = response.data.data;

        // 각 채팅방의 마지막 메시지를 가져오는 작업
        const chatRoomsWithLastMessage = await Promise.all(chatRooms.map(async (room) => {
          const roomDetailResponse = await axios.get(`${BASE_URL}/chat/room/${room.id}/last-message`);
          const lastMessage = roomDetailResponse.data.data ? roomDetailResponse.data.data.message : '메시지가 없습니다';
          return { ...room, lastMessage };
        }));

        setConversations(chatRoomsWithLastMessage);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.pageView}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.pageView}>
      <View style={styles.pageInnerView}>
        <Text style={styles.sectionHeader}>나의 채팅방 목록</Text>
        {currentUser && (
          <FlatList
            style={{ flexGrow: 1 }}
            data={conversations}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.conversationLink}
                onPress={() => {
                  navigation.navigate('Message', {
                    roomId: item.id,
                  });
                }}
              >
                <View style={styles.userIconView}>
                  <Image
                    source={{ uri: `${BASE_URL}/images/${item.product.productImages[0]}` }}
                    style={styles.productImage}
                  />
                </View>
                <View>
                  <Text style={styles.userNameText}>
                    {item.seller.nickname}
                  </Text>
                  <Text style={styles.lastMessageText}>
                    {item.lastMessage}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pageInnerView: {
    padding: 20,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  conversationLink: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userIconView: {
    marginRight: 15,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userNameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  lastMessageText: {
    color: 'grey',
  },
});

export default ChatRoomList;
