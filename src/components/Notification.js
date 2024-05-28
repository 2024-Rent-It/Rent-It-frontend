import React, { useState , useEffect} from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, Text, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useAuth } from '../../src/contexts/AuthContext.js'; // AuthContext 파일의 useAuth 훅 가져오기
import axios from 'axios';
import { BASE_URL } from '../../src/constants/api.js';

const Tab = createMaterialTopTabNavigator();

const Notification = ({ navigation }) => {
  const { token } = useAuth(); // 로그인된 사용자 토큰 가져오기

  

  // const [notifications, setNotifications] = useState([
  //   { id: 1, type: '활동 알람', message: '상품 가격이 내려갔습니다.', productId: 1, priceChange: '-1,000원', keyword: '', timestamp: new Date() },
  //   { id: 2, type: '키워드 알람', message: '내가 등록한 키워드를 포함한 상품이 등록되었습니다.', productId: 1, priceChange: '-1,000원', keyword: '케론인', timestamp: new Date() },
  // ]);

  const [notifications, setNotifications] = useState([]);
  // [{"createdAt": "2024-05-27T23:23:58.903585", "id": 4, "keyword": "의자", "message": "\"의자\" 상품이 등록되었습니다! 확인하러 가 볼까요?", "productId": 21, "type": "키워드 알람"}]

  useEffect(() => {
    fetchKeywordNotifications();
}, []);

  const fetchKeywordNotifications = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/keyword-notification`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    });
    setNotifications([...response.data]);

      console.log("확인하자",response.data);


    } catch (error) {
      console.error('알림 데이터 받아오는 에러:', error);
    } finally {
      setIsLoading(false);
    }
  };
  // = async () => {
//     try {
//         const response = await fetch('${BASE_URL}/keyword-notification', {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}` // 토큰을 헤더에 포함
//             }
//         });
//         if (response.ok) {
//             const data = await response.data;
//             console.log("키워드 알림 보자", data);
//             setKeywordNotifications(data);
//         } else {
//             console.error('Failed to fetch notifications');
//         }
//     } catch (error) {
//         console.error('Error fetching notifications:', error);
//     }
// };

  const getDaysAgo = (timestamp) => {
    const now = new Date();
    const alarmDate = new Date(timestamp);

    // 두 날짜 간의 밀리초 단위 차이를 계산
    const difference = now.getTime() - alarmDate.getTime();

    // 차이를 일 단위로 변환하여 소수점 이하를 버리고 정수값으로 반환
    const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));

    return daysAgo;
  };



  const NotificationItem = ({ notification, keywordNotifications }) => (

    <View style={styles.notificationContainer}>

      <Pressable
        onPress={() => {
          navigation.navigate('상세 화면', { id: notification.id });
        }}>

        <View style={[styles.imageContainer, { alignItems: 'center', justifyContent: 'center' }]}>
          <AntDesign name="home" size={50} color="black" />
        </View>

      </Pressable>

      <View style={styles.infoContainer}>
        {notification.type === '활동 알람' && (
          <>
            <Pressable
              onPress={() => {
                navigation.navigate('상세 화면', { id: notification.id });
              }}>
              <Text style={styles.message}>{notification.message}</Text>
              <Text style={styles.priceChange}>{notification.priceChange}</Text>
              <Text style={styles.daysAgo}>{`${notification.daysAgo}일 전`}</Text>
            </Pressable>
          </>
        )}
        {notification.type === '키워드 알람' && (
          <>
            <Pressable
              onPress={() => {
                navigation.navigate('상세 화면', { id: notification.productId });
              }}>
              <Text style={styles.message}>{`\"${notification.keyword}\" 상품이 등록되었습니다! \n 확인하러 가 볼까요?`}</Text>
              {/* <Text>{`${notification.daysAgo}일 전`}</Text> */}
            </Pressable>

          </>
        )}

      </View>
    </View>

  );

  const ActivityNoti = ({ navigation }) => (
    <View style={{ backgroundColor: 'white' }}>
      {notifications.map(notification => (
        notification.type === '활동 알람' && <NotificationItem key={notification.id} notification={notification} />
      ))}
    </View>

  );

  const KeywordNoti = ({ navigation }) => (
    <View >
      {notifications.map(notification => (
        notification.type === '키워드 알람' && <NotificationItem key={notification.id} notification={notification} />
      ))}

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('키워드 알림 설정')}>
          <Text style={styles.keyword}>
            키워드 등록하러 가기
          </Text>
        </Pressable>
      </View>
    </View>
  );




  return (
    <Tab.Navigator>
      <Tab.Screen name="활동 알림" component={ActivityNoti} />
      <Tab.Screen name="키워드 알림" component={KeywordNoti} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({

  notificationContainer: {
    height: 105,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
    backgroundColor: 'white',

  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    paddingVertical: 10,
    // backgroundColor: 'white',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 0.4,
    marginLeft: '5%',
    borderRadius: 40,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
  },
  infoContainer: {
    flex: 1,
    width: 20,
    marginBottom: '1%',
  },
  message: {
    fontSize: 17,
    marginBottom: '1%',
  },
  priceChange: {
    fontSize: 12,
  },
  daysAgo: {
    marginTop: '1.5%',
    color: 'gray',
  },
  buttonContainer: {
    alignItems: 'center', // 수평 중앙 정렬
    width: '100%', // 부모 View와 같은 너비
  },
  button: {
    borderRadius: 20,
    width: '50%',
    height: 50, // 버튼의 높이 조정
    backgroundColor: '#A7C8E7',
    marginTop: 20,
    justifyContent: 'center', // 버튼 내 텍스트를 수직 중앙 정렬
  },
  keyword: {
    textAlign: 'center',
    fontSize: 18,
    paddingVertical: 10,
    fontWeight: 'bold', // 텍스트를 볼드체로 변경
  },
});

export default Notification;