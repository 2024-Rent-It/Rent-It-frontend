import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AuthProvider } from '../../contexts/AuthContext';
import { SimpleLineIcons } from '@expo/vector-icons';
import { View } from 'react-native';

import MyFav from '../../screens/myPage/MyFav';
import Writing from '../../screens/userTrans/Writing';
import Home from '../../screens/Home';
import Chating from '../../screens/userTrans/Chating';
import MyPage from '../../screens/myPage/MyPage';
import MyRent from '../../screens/myPage/MyRent';
import MyThing from '../../screens/myPage/MyThing';
import LocationService from '../../screens/Service/LocationService';
import PrivacyPolicy from '../../screens/Service/PrivacyPolicy';
import TermsOfService from '../../screens/Service/TermsOfService';
import VersionInfo from '../../screens/Service/VersionInfo';
import EditInfo from '../../screens/myPage/EditInfo';
import MyInfo from '../../screens/myPage/Edit/MyInfo';
import ChangeNickName from '../../screens/myPage/Edit/ChangeNickName';
import ChangePw from '../../screens/myPage/Edit/ChangePw';
import ChangeEmail from '../../screens/myPage/Edit/ChangeEmail';
import LocationSetting from '../../screens/myPage/Edit/LocationSetting';
import Onboarding from '../../screens/onboarding/Onboarding';
import SignUp from '../../screens/onboarding/SignUpScreen.js';
import LoginScreen from '../../screens/onboarding/LoginScreen';
import AddressScreen from '../../screens/onboarding/AddressScreen';
import ProductDetailPage from '../../screens/PicPage/ProductDetail.js';
import ProductDetailPage2 from '../../screens/IconPage/ProductDetail2.js';
import Product from '../../screens/Product.js';
import EmailLogin from '../../screens/onboarding/EmailLogin.js';
import ChangePw2 from '../../screens/myPage/Edit/ChangePW2.js';
import Notice from '../../screens/myPage/Notice.js';
import NoticeDetail from '../../screens/myPage/NoticeDetail.js';
import SearchScreen from '../../../src/components/SearchScreen.js';
import Notification from '../../../src/components/Notification.js';
import Gomain from '../../screens/onboarding/Gomain.js';
import KeywordRegis from '../KeywordRegis.js';
import SellerInfo from '../../screens/userTrans/SellerInfo.js';
import TraderInput from '../../screens/myPage/TraderInput.js';
import EditPost from '../../screens/userTrans/ReWriting.js';
import ChatingScreen from '../../screens/userTrans/ChatingScreen.js'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SharedStack = ({ tabName }) => (
    <Stack.Navigator>
        {tabName === 'MyFavTab' ? (
            <Stack.Screen name="관심 상품" component={MyFav} />
        ) : null}
        {tabName === 'WritingTab' ? (
            <Stack.Screen name="글쓰기" component={Writing} />
        ) : null}
        {tabName === 'HomeTab' ? (
            <>
                <Stack.Screen
                    name="HomeTab"
                    component={Home}
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <View style={{ flexDirection: 'row', marginRight: 15 }}>
                                <AntDesign
                                    name="bells"
                                    size={24}
                                    color="black"
                                    style={{ marginRight: 20 }}
                                    onPress={() => navigation.navigate('알림')}

                                />
                                <AntDesign
                                    name="search1"
                                    size={24}
                                    color="black"
                                    onPress={() => navigation.navigate('SearchScreen')}
                                />
                            </View>
                        ),
                    })}
                />

                <>
                    <Stack.Screen
                        name="SearchScreen"
                        component={SearchScreen}
                    />

                    <Stack.Screen
                        name="ProductDetail2"
                        component={ProductDetailPage2}
                    />

                    <Stack.Screen
                        name="키워드 알림 설정"
                        component={KeywordRegis}
                    />
                </>
            </>
        ) : null}
        {tabName === 'ChattingTab' ? (
            <Stack.Screen name="채팅" component={Chating} />
            
        ) : null}
        {tabName === 'MyPageTab' ? (
            <>
                <Stack.Screen name="마이페이지" component={MyPage} />
                {/* 상단 */}
                <>
                    <Stack.Screen name="정보 수정" component={EditInfo} />
                    <>
                        <Stack.Screen name="내 정보" component={MyInfo} />
                        <>
                            <Stack.Screen
                                name="닉네임 변경"
                                component={ChangeNickName}
                            />
                            <Stack.Screen
                                name="비밀번호 확인"
                                component={ChangePw}
                            />
                            <Stack.Screen
                                name="이메일 변경"
                                component={ChangeEmail}
                            />
                        </>
                    </>
                    <Stack.Screen
                        name="지역 설정"
                        component={LocationSetting}
                    />
                </>

                {/* 나의 거래 */}
                <Stack.Screen name="관심 상품" component={MyFav} />
                <Stack.Screen name="내 상품 관리" component={MyThing} />
                <Stack.Screen name="게시글 수정" component={EditPost} />
                <Stack.Screen name="대여 내역" component={MyRent} />
                {/* 서비스 정보 */}
                <Stack.Screen
                    name="이용 약관"
                    component={TermsOfService}
                />
                <Stack.Screen name="개인정보 처리방침" component={PrivacyPolicy} />
                {/* <Stack.Screen
                    name="LocationService"
                    component={LocationService}
                /> */}
                <Stack.Screen name="버전 정보" component={VersionInfo} />
                {/* 하단 */}
                <Stack.Screen name="공지사항" component={Notice} />
            </>
        ) : null}
    </Stack.Navigator>
);

function TabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: [
                    {
                        display: 'flex',
                    },
                    null,
                ],
            }}
        >
            <Tab.Screen
                name="MyFavTab"
                options={{
                    tabBarIcon: () => (
                        <FontAwesome name="heart-o" size={24} color="grey" />
                    ),
                }}
            >
                {() => <SharedStack tabName={'MyFavTab'} />}
            </Tab.Screen>
            <Tab.Screen
                name="WritingTab"
                options={{
                    tabBarIcon: () => (
                        <SimpleLineIcons name="pencil" size={24} color="grey" />
                    ),
                }}
            >
                {() => <SharedStack tabName={'WritingTab'} />}
            </Tab.Screen>
            <Tab.Screen
                name="HomeTab"
                options={{
                    tabBarIcon: () => (
                        <AntDesign name="home" size={24} color="grey" />
                    ),
                }}
            >
                {() => <SharedStack tabName={'HomeTab'} />}
            </Tab.Screen>
            <Tab.Screen
                name="ChattingTab"
                options={{
                    tabBarIcon: () => (
                        <Ionicons
                            name="chatbox-ellipses-outline"
                            size={24}
                            color="grey"
                        />
                    ),
                }}
            >
                {() => <SharedStack tabName={'ChattingTab'} />}
            </Tab.Screen>
            <Tab.Screen
                name="MyPageTab"
                options={{
                    tabBarIcon: () => (
                        <Octicons name="person" size={24} color="grey" />
                    ),
                }}
            >
                {() => <SharedStack tabName={'MyPageTab'} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Onboarding"
                options={{ headerShown: false }}
                component={Onboarding}
            />
            <Stack.Screen name="회원가입" component={SignUp} />
            <Stack.Screen name="AddressScreen" component={AddressScreen} />
            <Stack.Screen
                name="Root"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="상세 화면" component={ProductDetailPage} />
            <Stack.Screen name="판매자 정보" component={SellerInfo} />
            <Stack.Screen name="예약 전환을 위한 정보 입력" component={TraderInput} />
            {/* <Stack.Screen name='서비스 이용약관' component={TermsOfService} /> */}
            {/* <Stack.Screen name='개인정보 처리방침' component={PrivacyPolicy} /> */}
            {/* <Stack.Screen name='회원가입' component={SignUp} /> */}
            {/* <Stack.Screen name='회원가입스크린' component={SignUpScreen} /> */}
            <Stack.Screen name="로그인" component={LoginScreen} />

            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="EmailLogin" component={EmailLogin} />
            <Stack.Screen name="NoticeDetail" component={NoticeDetail} />
            <Stack.Screen name="비밀번호 변경" component={ChangePw2} />
            <Stack.Screen name="알림" component={Notification} />
            <Stack.Screen name="Gomain" component={Gomain} />
            <Stack.Screen name="ChatingScreen" component={ChatingScreen} />
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
