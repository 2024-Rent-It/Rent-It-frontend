import React, { useState } from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View, StyleSheet, Text, Alert, Pressable, Modal, Image, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';


const Tab = createMaterialTopTabNavigator();


const MyThing = ({ navigation }) => {


    const [modalVisible, setModalVisible] = useState(false);  //토글 누르면 열리는 모달임
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [products, setProducts] = useState([
        { id: 1, title: '퍼렁별 침략', price: '3000원', duration: '1개월', traderName: '', startDate: '', endDate: '', status: '렌트가능', selectedImage: require('../../../assets/images/coat.jpg') },
        { id: 2, title: '바보 개구리', price: '2000000원', duration: '2개월', traderName: '', startDate: '', endDate: '', status: '렌트가능', selectedImage: require('../../../assets/images/k.png') },
        { id: 3, title: '그냥 개구리', price: '800000원', duration: '8개월', traderName: '장원영', startDate: '2024-08-11', endDate: '2024-12-31', status: '렌트완료', selectedImage: require('../../../assets/images/plate.jpg') },
        { id: 4, title: '그냥 개구리', price: '800000원', duration: '5개월', traderName: '장원영', startDate: '2024-08-11', endDate: '2024-09-21', status: '렌트완료', selectedImage: require('../../../assets/images/plate.jpg') },
        { id: 5, title: '진짜 개구리', price: '5000원', duration: '3개월', traderName: '카리나', startDate: '2024-08-11', endDate: '2024-10-16', status: '렌트완료', selectedImage: require('../../../assets/images/tools.png') },
        { id: 6, title: '귀여운 타마마', price: '500원', duration: '8개월', traderName: '침착맨', startDate: '2024-08-11', endDate: '2024-11-11', status: '렌트중', selectedImage: require('../../../assets/images/tree.jpg') },

    ]);



    const toggleModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(!modalVisible);
        setModalVisible(true);
    };

    //예약가능->예약중 (TraderInput.js로 이동)
    const closeAndNavigate = (id, traderName, startDate, endDate) => {
        setModalVisible(false);
        navigation.navigate('예약 전환을 위한 정보 입력', { productId: id, updateProductStatus, handleStatusChange, productInfo: { traderName, startDate, endDate } });
    };

    const updateProductStatus = (id, traderName, startDate, endDate) => {
        setProducts(products.map(product => {
            if (product.id === id) {
                return { ...product, status: '렌트중', traderName, startDate, endDate };
            } else {
                return product;
            }
        }));
    };



    //얜 건들지마셈
    const handleStatusChange = (status, traderName, startDate, endDate) => {
        console.log('시~~발 제발제발', traderName, startDate, endDate);

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

        if (status === '렌트중') {
            Alert.alert(
                '확인',
                '상품 상태를 렌트중으로 변경하시겠습니까?',
                [
                    {
                        text: '취소',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                    },
                    {
                        text: '확인',
                        onPress: () => {
                            console.log('여기까진 괜춘')
                            // 선택한 상품의 상태를 변경하고 모달을 닫음
                            const updatedProducts = products.map(prod => {
                                if (prod.id === selectedProduct.id) {
                                    return { ...prod, status: status, traderName: traderName, startDate: startDate, endDate: endDate };
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
        } else if (status === '렌트완료' || status === '렌트가능') { // '렌트중' 상태일 때
            confirmStatusChange(); // 바로 상태 변경 함수 호출
        } else {
            // '렌트완료'나 '렌트중'이 아닌 다른 상태일 때는 모달만 닫음
            setModalVisible(false);
        }
    };  //여기까지 건들지마셈


    const handleDeleteProduct = () => {
        Alert.alert(
            '삭제 확인',
            '정말 삭제하시겠습니까?',
            [
                {
                    text: '네',
                    onPress: () => {
                        const updatedProducts = products.filter(prod => prod.id !== selectedProduct.id);
                        setProducts(updatedProducts);
                        setModalVisible(false);
                        setSelectedProduct(null); // 선택한 상품 초기화
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
        <View style={styles.productContainer}>
            <Pressable onPress={() => navigation.navigate('상세 화면')}>
                <View style={styles.imageContainer}>
                    <View style={styles.image}>
                        <Image source={product.selectedImage} style={styles.image} />
                    </View>

                </View>
            </Pressable>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.price}>{product.price}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.status}>
                        {/* product.status가 없으면 '거래자' 표시 */}
                        <Text style={{ color: 'gray' }}>{product.status}</Text>
                    </View>
                    <View style={styles.trader}>
                        {/* product.traderName이 없으면 '거래자' 표시 */}
                        <Text style={{ color: 'gray' }}>{product.traderName || '거래자 미정'}</Text>
                    </View>
                    <View style={styles.date}>
                        {/* product.endDate가 없으면 '반납예정일' 표시 */}
                        <Text style={{ color: 'gray' }}>{product.endDate || '반납예정일 미정'}</Text>
                    </View>
                </View>
            </View>
            <Pressable style={styles.button} onPress={() => toggleModal(product)}>
                <Icon name="more-vert" size={24} color="black" />
            </Pressable>
        </View>
    );




    const DoingRentScreen = ({ }) => (
        <View>
            {products.filter(product => product.status === '렌트가능').map((product) => (
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
                            <Pressable
                                style={styles.modalButtonTop}
                                onPress={closeAndNavigate}>
                                <Text style={styles.modalText}>렌트 중</Text>
                            </Pressable>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => navigation.navigate('ReWriting.js')}>
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

    const ReservationScreen = () => {
        return (
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
                                    onPress={() => handleStatusChange('렌트가능')}>
                                    <Text style={styles.modalText}>렌트 가능</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => handleStatusChange('렌트완료')}>
                                    <Text style={styles.modalText}>렌트 완료</Text>
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

                        <View style={styles.modalContainerDone}>
                            <View style={styles.modalViewDone}>
                                <TouchableOpacity
                                    style={styles.modalButtonTop}
                                    onPress={() => handleStatusChange('렌트가능')}>
                                    <Text style={styles.modalText}>렌트 가능</Text>
                                </TouchableOpacity>
                                {/* <TouchableOpacity
                                    style={styles.modalButton}
                                    onPress={() => handleStatusChange('렌트중')}>
                                    <Text style={styles.modalText}>렌트 중</Text>
                                </TouchableOpacity> */}
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
        <Tab.Navigator
            screenOptions={({ route }) => ({
            })}
        >
            <Tab.Screen name="렌트가능" component={DoingRentScreen} />
            <Tab.Screen name="렌트중" component={ReservationScreen} />
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
        marginLeft: '5%',
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    price: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 4,
    },
    status: {
        height: 25,
        fontSize: 14,
        backgroundColor: '#DDEAF6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10, // 양쪽으로 패딩 추가
        minWidth: '22%', // 최소 너비 설정
    },
    trader: {
        height: 25,
        fontSize: 14,
        marginLeft: 5,
        backgroundColor: '#DDEAF6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10, // 양쪽으로 패딩 추가
        minWidth: '22%', // 최소 너비 설정
    },
    date: {
        height: 25,
        fontSize: 14,
        marginLeft: 5,
        backgroundColor: '#DDEAF6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10, // 양쪽으로 패딩 추가
        minWidth: '30%', // 최소 너비 설정
    },

    button: {
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.05)', // 반투명한 배경색
    },
    modalContainerDone: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalView: {
        // borderWidth:1,
        backgroundColor: 'white',
        height: '45%',
        paddingTop: '0%',
        paddingBottom: 0,
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
        addingBottom: 0,
    },
    modalViewDone: {
        height: 365,
        backgroundColor:'white',
        paddingTop: '0%',
        paddingBottom: 0,
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
        addingBottom: 0,
    },
    modalButton: {
        width: '120%',
        height: 90,
        padding: '1.5%',
        marginHorizontal: '1.5%', // 좌우 여백 설정
        marginTop: '1%', // 상단 여백 설정
        justifyContent: 'center', // 수직 중앙 정렬
        alignItems: 'center', // 수평 중앙 정렬
        backgroundColor: '#BBB9B9',
    },
    modalButtonTop: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        width: '120%',
        height: 90,
        padding: '1.5%',
        marginHorizontal: '1.5%', // 좌우 여백 설정
        marginTop: '1%', // 상단 여백 설정
        justifyContent: 'center', // 수직 중앙 정렬
        alignItems: 'center', // 수평 중앙 정렬
        backgroundColor: '#BBB9B9',
    },
    modalButtonBottom: {
        borderBottomEndRadius: '20%',
        borderBottomStartRadius: '20%',
        width: '120%',
        height: 90,
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