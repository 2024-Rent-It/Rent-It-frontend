import { StatusBar } from "expo-status-bar";
import React, { useLayoutEffect, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Animated, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import LottieView from "lottie-react-native";
import BottomSheet from "./BottomSheet";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../contexts/AuthContext'; // AuthContext 파일의 useAuth 훅 가져오기


const DATA = [
  {
    title: "RENT",
    description: "취향인 아이템, 마음껏 사용하세요!",
    plus: "나한테는 없는 아이템\n처분 걱정없는 일상\n마음껏 사용",
    lottie: require("../../../assets/bed1.json"),
  },
  {
    title: "HOME",
    description: "내 집 앞에서, 바로 빌려보세요!",
    plus: "당장 필요한 아이템\n멀리갈 필요 없이\n집앞에서 거래",
    lottie: require("../../../assets/monitor1.json"),

  },
  {
    title: "TAKE",
    description: "마음에 든다면, 가질 수도 있어요!",
    plus: "직접 사용해본 후\n마음에 든다면\n소장하자",
    lottie: require("../../../assets/phone.json"),
  },
  {
    title: "YOU CAN RENT EVERYTHING",
    description: "RENT IT,\n렌팃!",
    plus: "지금, 사용해보세요",
    lottie: null,
  },

];


export default function Onboarding({navigation}) {
  const scrollX = new Animated.Value(0);
  const animation = React.useRef(null);

  const [status, setStatus] = React.useState(false);

  const { login } = useAuth();

  useEffect(() => {
    // 앱이 시작될 때 AsyncStorage에서 데이터 로드
    const loadAuthData = async () => {
      try {
        console.log("토큰있냐",savedToken, savedNickname, savedEmail, savedLocation);

        const savedToken = await AsyncStorage.getItem('token');
        const savedNickname = await AsyncStorage.getItem('userNickname');
        const savedEmail = await AsyncStorage.getItem('userEmail');
        const savedLocation = await AsyncStorage.getItem('userLocation');
        // const savedUserID = await AsyncStorage.getItem('userID');

        if (savedToken) {
          login(savedToken, savedNickname, savedEmail, savedLocation); // 로그인 함수 호출하여 토큰 저장
          navigation.navigate('Root'); // Root 화면으로 이동
        }

       
      } catch (error) {
        console.error('Error loading auth data:', error);
      }

    };

    loadAuthData();
  }, []);

  const handleSignUp = () => {
    // 회원가입 버튼이 클릭되었을 때 실행되는 함수
    console.log("회원가입 버튼이 클릭되었습니다.");
  };

  const handleLogin = () => {
    // 로그인 버튼이 클릭되었을 때 실행되는 함수
    console.log("로그인 버튼이 클릭되었습니다.");
    navigation.navigate("로그인");
  };
  const renderItem = ({ item, index }) => {
    if (item.title != "YOU CAN RENT EVERYTHING") {
      return (

        <View style={{ width: wp(100), height: hp(100), backgroundColor: "#ddd", paddingTop: hp(10) }}>

          <Text style={{ textAlign: "center", marginTop: hp(5), fontSize: hp(5), fontWeight: "bold" }}>{item.title}</Text>
          <Text style={{ width: wp(70), alignSelf: "center", textAlign: "center", marginTop: hp(2), fontSize: hp(2), color: "#284967" }}>{item.description}</Text>
          <Text style={{ width: wp(70), alignSelf: "center", textAlign: "center", marginTop: hp(3), fontSize: hp(2) }}>{item.plus}</Text>
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: hp(50),
              height: hp(50),
              alignSelf: "center",
            }}
            source={item.lottie}
          />
        </View>
      );
    } else

      return (

        <View style={{ width: wp(100), height: hp(100), backgroundColor: "#284967", paddingTop: hp(10) }}>
          <Text style={{ width: wp(70), alignSelf: "center", textAlign: "center", marginTop: hp(2), fontSize: hp(2), color: "#A7C8E7", fontWeight: "bold" }}>{item.title}</Text>
          <Text style={{ textAlign: "center", marginTop: hp(5), fontSize: hp(5), fontWeight: "bold", color: "#FFFFFF" }}>{item.description}</Text>

          <Text style={{ width: wp(70), alignSelf: "center", textAlign: "center", marginTop: hp(8), fontSize: hp(3), fontWeight: "bold", color: "#FFFFFF" }}>{item.plus}</Text>
          <View style={styles.buttonContainer}>
            {/* 회원가입 버튼 */}
            <TouchableOpacity onPress={() => setStatus(true)} style={[styles.button, styles.signUpButton]}>
              <Text style={styles.buttonText}>회원가입</Text>
            </TouchableOpacity>

            {/* 로그인 버튼 */}
            <TouchableOpacity onPress={handleLogin} style={[styles.button, styles.loginButton]}>
              <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>

          </View>
          

          {/* <BottomSheet setStatus={ setStatus } />  */}

        </View>
        

      );

  };

  //밑에 동그라미 네 개
  return (
    <View style={styles.container}>
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        data={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
      />
      <View style={{ position: "absolute", bottom: hp(10), flexDirection: "row" }}>
        {DATA.map((item, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [(index - 1) * wp(100), index * wp(100), (index + 1) * wp(100)],
            outputRange: [0.4, 1, 0.4],
            extrapolate: "clamp",
          });
          const scale = scrollX.interpolate({
            inputRange: [(index - 1) * wp(100), index * wp(100), (index + 1) * wp(100)],
            outputRange: [0.8, 1.4, 0.8],
            extrapolate: "clamp",
          });
          return (
            <Animated.View
              key={index}
              style={{
                width: hp(2),
                height: hp(2),
                marginHorizontal: wp(5),
                backgroundColor: "#fff",
                borderRadius: 100,
                opacity: opacity,
                transform: [
                  {
                    scale: scale,
                  },
                ],
              }}
            />
          );
        })}
      </View>
      <StatusBar style="auto" />
      
      {/* 회원가입 버튼 누르면 bottomsheet 나옴 */}
      {status && <BottomSheet setStatus={setStatus} />}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    alignItems: "center", // 버튼을 수평으로 가운데 정렬
  },
  button: {
    borderRadius: 50, // 원의 반지름을 컨테이너의 너비/높이의 절반으로 설정하여 동그란 모양으로 만듭니다
    paddingVertical: 25, // 버튼의 세로 여백
    paddingHorizontal: 45, // 버튼의 가로 여백
    marginBottom: 20, // 버튼 간의 간격 조정을 위해 추가
    alignItems: "center", // 가로 방향으로 가운데 정렬
    justifyContent: "center", // 세로 방향으로 가운데 정렬
    width: 230, // 버튼의 너비를 230으로 설정


  },
  signUpButton: {
    marginTop: 100,
    backgroundColor: '#A7C8E7',
  
  },
  loginButton: {
    backgroundColor: '#ECECEC',
  },
  buttonText: {
    fontSize: 16,
  },
});
