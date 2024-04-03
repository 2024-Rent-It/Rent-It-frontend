import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Entypo } from "@expo/vector-icons";
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AuthProvider } from '../../contexts/AuthContext';


import MyFav from "../../screens/myPage/MyFav";
import Writing from "../../screens/userTrans/Writing";
import Home from "../../screens/Home";
import Chating from "../../screens/userTrans/Chating";
import MyPage from "../../screens/myPage/MyPage";
import MyRent from "../../screens/myPage/MyRent";
import MyThing from "../../screens/myPage/MyThing";
import LocationService from "../../screens/Service/LocationService";
import PrivacyPolicy from "../../screens/Service/PrivacyPolicy";
import TermsOfService from "../../screens/Service/TermsOfService";
import VersionInfo from "../../screens/Service/VersionInfo";
import EditInfo from "../../screens/myPage/EditInfo";
import MyInfo from "../../screens/myPage/Edit/MyInfo";
import ChangeNickName from "../../screens/myPage/Edit/ChangeNickName";
import ChangePw from "../../screens/myPage/Edit/ChangePw";
import ChangeEmail from "../../screens/myPage/Edit/ChangeEmail";
import LocationSetting from "../../screens/myPage/Edit/LocationSetting";
import Onboarding from "../../screens/onboarding/Onboarding";
import SignUpTest from "../../screens/onboarding/SignUpTest";
import LoginScreen from "../../screens/onboarding/LoginScreen";
import AddressScreen from "../../screens/onboarding/AddressScreen";
import Product from "../../screens/Product.js"
import EmailLogin from "../../screens/onboarding/EmailLogin.js"



const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            tabBarOptions={{ labelPosition: 'beside-icon', showLabel: false }}
        >
            <BottomTab.Screen
                name="찜한목록"
                component={MyFav}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name="heart-o" size={24} color="grey" />
                    ),
                }}
            />
            <BottomTab.Screen
                name="글쓰기"
                component={Writing}
                options={{
                    tabBarIcon: () => (
                        <FontAwesome6 name="pencil" size={24} color="grey" />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: () => (
                        <AntDesign name="home" size={24} color="grey" />
                    ),
                }}
            />
            <BottomTab.Screen
                name="채팅"
                component={Chating}
                options={{
                    tabBarIcon: () => (
                        <Ionicons name="chatbox-ellipses-outline" size={24} color="grey" />
                    ),
                }}
            />
            <BottomTab.Screen
                name="마이페이지"
                component={MyPage}
                options={{
                    tabBarIcon: () => (
                        <Octicons name="person" size={24} color="grey" />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name='Onboarding' options={{ headerShown: false }} component={Onboarding} />
            <Stack.Screen name="Root" component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            
            {/* <Stack.Screen name='서비스 이용약관' component={TermsOfService} /> */}
            {/* <Stack.Screen name='개인정보 처리방침' component={PrivacyPolicy} /> */}
            {/* <Stack.Screen name='회원가입' component={SignUp} /> */}
            {/* <Stack.Screen name='회원가입스크린' component={SignUpScreen} /> */}
            <Stack.Screen name='회원가입테스트' component={SignUpTest} />
            <Stack.Screen name='로그인' component={LoginScreen} />

            <Stack.Screen name="MyFav" component={MyFav} />
            <Stack.Screen name="MyRent" component={MyRent} />
            <Stack.Screen name="MyThing" component={MyThing} />
            <Stack.Screen name="LocationService" component={LocationService} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="TermsOfService" component={TermsOfService} />
            <Stack.Screen name="VersionInfo" component={VersionInfo} />
            <Stack.Screen name="EditInfo" component={EditInfo} />
            <Stack.Screen name="MyInfo" component={MyInfo} />
            <Stack.Screen name="ChangeNickName" component={ChangeNickName} />
            <Stack.Screen name="ChangePw" component={ChangePw} />
            <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
            <Stack.Screen name="LocationSetting" component={LocationSetting} />
            <Stack.Screen name="AddressScreen" component={AddressScreen} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="EmailLogin" component={EmailLogin} />
        </Stack.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
        <AuthProvider>
            <RootNavigator />
        </AuthProvider>
        </NavigationContainer>
    );
}