/*import React, { useState, useEffect, useRef } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, Text, TextInput, Alert, Pressable, Modal, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../contexts/AuthContext'; // AuthContext 파일의 useAuth 훅 가져오기
import axios from 'axios';
import { BASE_URL } from '../../constants/api.js';

const Tab = createMaterialTopTabNavigator();

const MyThing = () => {
    const [modalVisible, setModalVisible] = useState(false);  //토글 누르면 열리는 모달임
    const [selectedProduct, setSelectedProduct] = useState(null);
    const tabRef = useRef(null); // Ref for controlling tabs
    const [nickname, setNickname] = useState('');

    const [products, setProducts] = useState([
        { id: 1, name: '퍼렁별 침략', price: '3000원', period: '1일', sellerName: '', status: '렌트중', image: require('../../../assets/images/coat.jpg') },
        { id: 2, name: '바보 개구리', price: '2000000원', period: '2일', selsellerNameler: '', status: '렌트중', image: require('../../../assets/images/k.png') },
        { id: 3, name: '그냥 개구리', price: '800000원', period: '8일', sellerName: '', status: '렌트완료', image: require('../../../assets/images/plate.jpg') },
        { id: 4, name: '진짜 개구리', price: '5000원', period: '3일', sellerName: '', status: '렌트완료', image: require('../../../assets/images/tools.png') },
    ]);

    const toggleModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(!modalVisible);
    };


    //얜 건들지마셈
    // const handleStatusChange = (status) => {
    //     const confirmStatusChange = () => {
    //         // 선택한 상품의 상태를 변경하고 모달을 닫음
    //         const updatedProducts = products.map(prod => {
    //             if (prod.id === selectedProduct.id) {
    //                 return { ...prod, status: status };
    //             }
    //             return prod;
    //         });
    //         setProducts(updatedProducts);
    //         setModalVisible(false);
    //     };

    //     if (status === '렌트완료') {
    //         // Alert를 사용하여 확인 요청 -> 수정해야함
    //         Alert.alert(
    //             '확인',
    //             '상품 상태를 렌트완료로 변경하시겠습니까?',
    //             [
    //                 {
    //                     text: '취소',
    //                     onPress: () => console.log('Cancel Pressed'),
    //                     style: 'cancel'
    //                 },
    //                 {
    //                     text: '확인',
    //                     onPress: () => {
    //                         // 선택한 상품의 상태를 변경하고 모달을 닫음
    //                         const updatedProducts = products.map(prod => {
    //                             if (prod.id === selectedProduct.id) {
    //                                 return { ...prod, status: status };
    //                             }
    //                             return prod;
    //                         });
    //                         setProducts(updatedProducts);
    //                         setModalVisible(false);
    //                     }
    //                 }
    //             ],
    //             { cancelable: false }
    //         );
    //     } else if (status === '렌트중') { // '렌트중' 상태일 때
    //         confirmStatusChange(); // 바로 상태 변경 함수 호출
    //     } else {
    //         // '렌트완료'나 '렌트중'이 아닌 다른 상태일 때는 모달만 닫음
    //         setModalVisible(false);
    //     }
    // };  //여기까지 건들지마셈

    //New
    // const handleStatusChange = (status) => {
    //     const confirmStatusChange = () => {
    //         // 선택한 상품의 상태를 변경하고 모달을 닫음
    //         const updatedProducts = products.map(prod => {
    //             if (prod.id === selectedProduct.id) {
    //                 return { ...prod, status: status, sellerName: nickname }; // SellerName 추가
    //             }
    //             return prod;
    //         });
    //         setProducts(updatedProducts);
    //         setModalVisible(false);
    //     };

    //     if (status === '렌트완료') {
    //         // '렌트완료' 상태로 변경할 때 SellerName을 입력받는 팝업 모달 표시
    //         setModalVisibleForDoneRent(true);
    //         setModalVisible(false); // 모달 닫기
    //     } else if (status === '렌트중') {
    //         confirmStatusChange(); // 바로 상태 변경 함수 호출
    //     } else {
    //         // '렌트완료'나 '렌트중'이 아닌 다른 상태일 때는 모달만 닫음
    //         setModalVisible(false);
    //     }
    // };

    const handleStatusChange = (status) => {
        const confirmStatusChange = () => {
            const updatedProducts = products.map(prod => {
                if (prod.id === selectedProduct.id) {
                    return { ...prod, status: status, sellerName: sellerName };
                }
                return prod;
            });
            setProducts(updatedProducts);
            setModalVisible(false);
        };

        if (status === '렌트완료') {

            setModalVisible(false);
            setTimeout(() => {
                setModalVisibleForSeller(true); // 판매자 이름 입력 모달 열기
            }, 200);
            // Alert.alert('sss');
        } else if (status === '렌트중') {
            confirmStatusChange();
        } else {
            setModalVisible(false);
        }
    };



    const handleDeleteProduct = () => {
        Alert.alert(
            '삭제 확인',
            '정말 삭제하시겠습니까?',
            [
                {
                    text: '네',
                    onPress: () => {
                        // '네'를 눌렀을 때, 선택한 상품을 제외한 새로운 상품 목록을 생성하여 설정
                        const updatedProducts = products.filter(prod => prod.id !== selectedProduct.id);
                        setProducts(updatedProducts);
                        setModalVisible(false);

                        Alert.alert('알림', '삭제되었습니다.');
                    }
                },
                {
                    text: '아니오',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },

            ],
            { cancelable: false }
        );
    };


    const ProductItem = ({ product }) => (
        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail')}>
            <View style={styles.productContainer}>
                <View style={styles.imageContainer}>
                    <View style={styles.image}>
                        <Image source={{uri:`${BASE_URL}/images/${product.productImages}`}} style={styles.image} />
                    </View>

                </View>
            </Pressable>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>{product.price}</Text>
                <Text style={styles.period}>{product.period}</Text>
            </View>
            <Pressable style={styles.button} onPress={() => toggleModal(product)}>
                <Icon name="more-vert" size={24} color="black" />
            </Pressable>
        </View>
    );



    const DoingRentScreen = () => (
        <View>
            {products.filter(product => product.status === '거래가능').map((product) => (
                // <ProductItem key={product.id} product={product} />
                <ProductItem product={product} />
            ))}

            {/* <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleForSeller}
                onRequestClose={() => {
                    setModalVisibleForSeller(!modalVisibleForSeller);
                }}
            >
                <View style={styles.modalContainer_Seller}>
                    <Text>판매자 닉네임을 입력해주세요</Text>
                    <TextInput placeholder="SellerName?"></TextInput>
                </View>
            </Modal> */
            /*}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleForSeller}
                onRequestClose={() => {
                    setModalVisibleForSeller(!modalVisibleForSeller);
                }}
            >
                <View style={styles.modalContainer_Seller}>
                    <View style={styles.modalView_Seller}>
                        <Text>판매자 닉네임을 입력해주세요</Text>
                        <TextInput
                            style={styles.SellerInput}
                            placeholder="SellerName?"></TextInput>
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => setModalVisibleForSeller(false)}>
                            <Text style={styles.confirmText}>확인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >

                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                style={styles.modalButtonTop}
                                onPress={() => handleStatusChange('렌트중')}>
                                <Text style={styles.modalText}>예약중</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => handleStatusChange('렌트완료')}>
                                <Text style={styles.modalText}>렌트 완료</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => handleStatusChange('게시글 수정')}>
                                <Text style={styles.modalText}>게시글 수정</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={handleDeleteProduct}>
                                <Text style={[styles.modalText, { color: 'red' }]}>삭제</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButtonBottom}
                                onPress={() => handleStatusChange('닫기')}>
                                <Text style={styles.modalText}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>

        </View >
    );

















    // const DoingRentScreen = () => (
    //     <View>
    //         {products.filter(product => product.status === '렌트중').map((product) => (
    //             <ProductItem key={product.id} product={product} />
    //         ))}
    //         <Modal
    //             animationType="slide"
    //             transparent={true}
    //             visible={modalVisible}
    //             onRequestClose={() => {
    //                 setModalVisible(!modalVisible);
    //             }}
    //         >
    //             <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>

    //                 <View style={styles.modalContainer}>
    //                     <View style={styles.modalView}>
    //                         <TouchableOpacity
    //                             style={styles.modalButtonTop}
    //                             onPress={() => handleStatusChange('렌트중')}>
    //                             <Text style={styles.modalText}>예약중</Text>
    //                         </TouchableOpacity>
    //                         <TouchableOpacity
    //                             style={styles.modalButton}
    //                             onPress={() => handleStatusChange('렌트완료')}>
    //                             <Text style={styles.modalText}>렌트 완료</Text>
    //                         </TouchableOpacity>
    //                         <TouchableOpacity
    //                             style={styles.modalButton}
    //                             onPress={() => handleStatusChange('게시글 수정')}>
    //                             <Text style={styles.modalText}>게시글 수정</Text>
    //                         </TouchableOpacity>
    //                         <TouchableOpacity
    //                             style={styles.modalButton}
    //                             onPress={handleDeleteProduct}>
    //                             <Text style={[styles.modalText, { color: 'red' }]}>삭제</Text>
    //                         </TouchableOpacity>
    //                         <TouchableOpacity
    //                             style={styles.modalButtonBottom}
    //                             onPress={() => handleStatusChange('닫기')}>
    //                             <Text style={styles.modalText}>닫기</Text>
    //                         </TouchableOpacity>
    //                     </View>
    //                 </View>
    //             </TouchableWithoutFeedback>

    //         </Modal>
    //     </View>
    // );

    const DoneRentScreen = () => {
        return (
            <View>
                {products.filter(product => product.status === '렌트완료').map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>

                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <TouchableOpacity
                                    style={styles.modalButtonTop}
                                    onPress={() => handleStatusChange('렌트중')}>
                                    <Text style={styles.modalText}>예약중</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => handleStatusChange('렌트완료')}>
                                    <Text style={styles.modalText}>렌트 완료</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => handleStatusChange('게시글 수정')}>
                                    <Text style={styles.modalText}>게시글 수정</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleDeleteProduct}>
                                    <Text style={[styles.modalText, { color: 'red' }]}>삭제</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButtonBottom}
                                    onPress={() => handleStatusChange('닫기')}>
                                    <Text style={styles.modalText}>닫기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        );
    };

    return (
        <Tab.Navigator>
            <Tab.Screen name="렌트중" component={DoingRentScreen} />
            <Tab.Screen name="렌트완료" component={DoneRentScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: 'lightgray',
        marginRight: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: 'gray',
    },
    infoContainer: {
        flex: 1,
        // backgroundColor:'grey',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: 'gray',
    },
    period: {
        fontSize: 14,
        color: 'gray',
    },
    button: {
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        // backgroundColor: 'rgba(0, 0, 0, 0.05)', // 반투명한 배경색
    },
    modalContainer_Seller: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명한 배경색
    },
    modalView_Seller: {
        backgroundColor: 'white',
        width: '70%', // 모달의 너비를 설정할 수 있습니다.
        height: '20%',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    SellerInput:{
        width:'45%',
        height:'30%',
        backgroundColor:'lightgray',
        borderRadius:'10%',
    },
    confirmButton: {
        borderRadius: '10%',
        padding: '5%',
        marginTop: 10,
        width: '30%',
        backgroundColor: '#A7C8E7',
        color: 'black',
    },
    confirmText: {
        color: 'black',
        justifyContent: 'center',
        alignContent: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        height: '45%',
        paddingTop: '0%',
        padding: 35,
        borderRadius: '20%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        width: '120%',
        height: '19%',
        padding: '1.5%',
        marginHorizontal: '1.5%', // 좌우 여백 설정
        marginTop: '1%', // 상단 여백 설정
        justifyContent: 'center', // 수직 중앙 정렬
        alignItems: 'center', // 수평 중앙 정렬
        backgroundColor: '#BBB9B9',
    },
    modalButtonTop: {
        borderTopStartRadius: '20%',
        width: '120%',
        height: '19%',
        padding: '1.5%',
        marginHorizontal: '1.5%', // 좌우 여백 설정
        marginTop: '1%', // 상단 여백 설정
        justifyContent: 'center', // 수직 중앙 정렬
        alignItems: 'center', // 수평 중앙 정렬
        backgroundColor: '#BBB9B9',
    },
    modalButtonBottom: {
        borderBottomEndRadius: '20%',
        width: '120%',
        height: '19%',
        padding: '1.5%',
        marginHorizontal: '1.5%', // 좌우 여백 설정
        marginTop: '1%', // 상단 여백 설정
        justifyContent: 'center', // 수직 중앙 정렬
        alignItems: 'center', // 수평 중앙 정렬
        backgroundColor: '#BBB9B9',
    },
    modalText: {
        textAlign: 'center',
        fontSize: 20,
        borderBottomWidth: 1,
        fontWeight: 'normal',
    },
});

export default MyThing;
*/

import React, { useState, useEffect, useRef } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, Text, TextInput, Alert, Pressable, Modal, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';


const Tab = createMaterialTopTabNavigator();

const MyThing = () => {
    const [modalVisible, setModalVisible] = useState(false);  //토글 누르면 열리는 모달임
    const [modalVisibleForDoneRent, setModalVisibleForDoneRent] = useState(false); // 닉네임 입력받는 모달임
    const [selectedProduct, setSelectedProduct] = useState(null);
    const tabRef = useRef(null); // Ref for controlling tabs
    const [nickname, setNickname] = useState('');

    const [products, setProducts] = useState([
        { id: 1, name: '퍼렁별 침략', price: '3000원', period: '1일', sellerName: '', status: '렌트중', image: require('../../../assets/images/coat.jpg') },
        { id: 2, name: '바보 개구리', price: '2000000원', period: '2일', selsellerNameler: '', status: '렌트중', image: require('../../../assets/images/k.png') },
        { id: 3, name: '그냥 개구리', price: '800000원', period: '8일', sellerName: '', status: '렌트완료', image: require('../../../assets/images/plate.jpg') },
        { id: 4, name: '진짜 개구리', price: '5000원', period: '3일', sellerName: '', status: '렌트완료', image: require('../../../assets/images/tools.png') },
    ]);

    const toggleModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(!modalVisible);
    };

    //얜 건들지마셈
    const handleStatusChange = (status) => {
        const confirmStatusChange = () => {
            // 선택한 상품의 상태를 변경하고 모달을 닫음
            const updatedProducts = products.map(prod => {
                if (prod.id === selectedProduct.id) {
                    return { ...prod, status: status };
                }
                return prod;
            });
            setProducts(updatedProducts);
            setModalVisible(false);
        };

        if (status === '렌트완료') {
            // Alert를 사용하여 확인 요청 -> 수정해야함
            Alert.alert(
                '확인',
                '상품 상태를 렌트완료로 변경하시겠습니까?',
                [
                    {
                        text: '취소',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: '확인',
                        onPress: () => {
                            // 선택한 상품의 상태를 변경하고 모달을 닫음
                            const updatedProducts = products.map(prod => {
                                if (prod.id === selectedProduct.id) {
                                    return { ...prod, status: status };
                                }
                                return prod;
                            });
                            setProducts(updatedProducts);
                            setModalVisible(false);
                        }
                    }
                ],
                { cancelable: false }
            );
        } else if (status === '렌트중') { // '렌트중' 상태일 때
            confirmStatusChange(); // 바로 상태 변경 함수 호출
        } else {
            // '렌트완료'나 '렌트중'이 아닌 다른 상태일 때는 모달만 닫음
            setModalVisible(false);
        }
    };  //여기까지 건들지마셈

    const handleDeleteProduct = () => {
        // 선택한 상품을 제외한 새로운 상품 목록을 생성하여 설정
        const updatedProducts = products.filter(prod => prod.id !== selectedProduct.id);
        setProducts(updatedProducts);
        setModalVisible(false);
    };

    const ProductItem = ({ product }) => (
        <View style={styles.productContainer}>
            <Pressable onPress={() => toggleModal(product)}>
                <View style={styles.imageContainer}>
                    <View style={styles.image}>
                        <Image source={product.image} style={styles.image} />
                    </View>

                </View>
            </Pressable>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>{product.price}</Text>
                <Text style={styles.period}>{product.period}</Text>
            </View>
            <Pressable style={styles.button} onPress={() => toggleModal(product)}>
                <Icon name="more-vert" size={24} color="black" />
            </Pressable>
        </View>
    );

    const DoingRentScreen = () => (
        <View>
            {products.filter(product => product.status === '렌트중').map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>



                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <TouchableOpacity
                                style={styles.modalButtonTop}
                                onPress={() => handleStatusChange('렌트중')}>
                                <Text style={styles.modalText}>예약중</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => handleStatusChange('렌트완료')}>
                                <Text style={styles.modalText}>렌트 완료</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => handleStatusChange('게시글 수정')}>
                                <Text style={styles.modalText}>게시글 수정</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={handleDeleteProduct}>
                                <Text style={[styles.modalText, { color: 'red' }]}>삭제</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButtonBottom}
                                onPress={() => handleStatusChange('닫기')}>
                                <Text style={styles.modalText}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );

    const DoneRentScreen = () => {
        return (
            <View>
                {products.filter(product => product.status === '렌트완료').map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>

                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <TouchableOpacity
                                    style={styles.modalButtonTop}
                                    onPress={() => handleStatusChange('렌트중')}>
                                    <Text style={styles.modalText}>예약중</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => handleStatusChange('렌트완료')}>
                                    <Text style={styles.modalText}>렌트 완료</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => handleStatusChange('게시글 수정')}>
                                    <Text style={styles.modalText}>게시글 수정</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={handleDeleteProduct}>
                                    <Text style={[styles.modalText, { color: 'red' }]}>삭제</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButtonBottom}
                                    onPress={() => handleStatusChange('닫기')}>
                                    <Text style={styles.modalText}>닫기</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        );



    }

    return (
        <Tab.Navigator>
            <Tab.Screen name="렌트중" component={DoingRentScreen} />
            <Tab.Screen name="렌트완료" component={DoneRentScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    productContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray',
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    imageContainer: {
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: 'lightgray',
        marginRight: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: 'gray',
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 14,
        color: 'gray',
    },
    period: {
        fontSize: 14,
        color: 'gray',
    },
    button: {
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.05)', // 반투명한 배경색
    },
    modalView: {
        backgroundColor: 'white',
        height: '45%',
        paddingTop: '0%',
        padding: 35,
        borderRadius: '20%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalButton: {
        width: '120%',
        height: '19%',
        padding: '1.5%',
        marginHorizontal: '1.5%', // 좌우 여백 설정
        marginTop: '1%', // 상단 여백 설정
        justifyContent: 'center', // 수직 중앙 정렬
        alignItems: 'center', // 수평 중앙 정렬
        backgroundColor: '#BBB9B9',
    },
    modalButtonTop: {
        borderTopStartRadius: '20%',
        width: '120%',
        height: '19%',
        padding: '1.5%',
        marginHorizontal: '1.5%', // 좌우 여백 설정
        marginTop: '1%', // 상단 여백 설정
        justifyContent: 'center', // 수직 중앙 정렬
        alignItems: 'center', // 수평 중앙 정렬
        backgroundColor: '#BBB9B9',
    },
    modalButtonBottom: {
        borderBottomEndRadius: '20%',
        width: '120%',
        height: '19%',
        padding: '1.5%',
        marginHorizontal: '1.5%', // 좌우 여백 설정
        marginTop: '1%', // 상단 여백 설정
        justifyContent: 'center', // 수직 중앙 정렬
        alignItems: 'center', // 수평 중앙 정렬
        backgroundColor: '#BBB9B9',
    },
    modalText: {
        textAlign: 'center',
        fontSize: 20,
        borderBottomWidth: 1,
        fontWeight: 'normal',
    },
});

export default MyThing;