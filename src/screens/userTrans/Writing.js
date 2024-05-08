import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity, Alert, Image, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../contexts/AuthContext';
import { BASE_URL } from '../../constants/api.js';
import { useNavigation } from '@react-navigation/native';

const WritePost = () => {
    const { token } = useAuth();
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [showCategoryList, setShowCategoryList] = useState(false);
    const [showDurationList, setShowDurationList] = useState(false);

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert(
                'Permission denied',
                'You need to grant permission to access the media library.'
            );
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('blur', () => {
            // 화면이 벗어날 때 상태 초기화
            setTitle('');
            setCategory('');
            setPrice('');
            setDuration('');
            setDescription('');
            setSelectedImages([]);
        });
    
        return unsubscribe;
    }, [navigation]);

    const handlePhotoUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 3,
            quality: 1,
        });

        if (!result.cancelled && result.assets) {
            setSelectedImages([...selectedImages, ...result.assets]);
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };

    const registerProduct = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('duration', duration);
        formData.append('description', description);
        console.log("선택된 이미지들", selectedImages);
        selectedImages.forEach((image, index) => {
            formData.append(`images`, {
                uri: image.uri,
                name: image.uri.split('/').pop(),
                type: `image/${image.uri.split('.').pop()}`,
            });
        });
    
        try {
            const response = await fetch(`${BASE_URL}/products/register`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
    
            if (response.ok) {
                Alert.alert('등록되었습니다');
                // 글 등록 후 상태 초기화
                setTitle('');
                setCategory('');
                setPrice('');
                setDuration('');
                setDescription('');
                setSelectedImages([]);
                navigation.navigate('HomeTab');
            } else
            {
                // 오류 처리
                Alert.alert('등록에 실패했습니다');
            }
        } catch (error) {
            console.error(error);
            // 오류 처리해야댐
        }
        
    }; 

    const categories = [
        '주방용품',
        '가구/인테리어',
        '패션잡화',
        '미용소품',
        '유아용품',
        '생활용품',
        '생활가전',
        '도서/문구',
        '미술품',
        '구합니다',
        '디지털기기',
        '스포츠/레저',
        '운동기구',
        '파티용품',
        '반려동물용품',
        '기타',
    ]; // 카테고리 목록
    const durations = [
        '1개월',
        '2개월',
        '3개월',
        '4개월',
        '5개월',
        '6개월',
        '12개월',
    ]; // 대여 기간 목록

    return (
        <KeyboardAvoidingView 
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null} 
            contentContainerStyle={{ flexGrow: 1 }}
        >
            <ScrollView style={{ backgroundColor: '#FFFFFF', padding: 20 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 50,
                    }}
                >
                    <TouchableOpacity
                        onPress={handlePhotoUpload}
                        style={{
                            backgroundColor: '#8A8A8A',
                            width: '27%',
                            height: 100,
                            paddingVertical: 15,
                            alignItems: 'center',
                            borderRadius: 10,
                            marginRight: 10,
                            justifyContent: 'center',
                        }}
                    >
                        <Feather name="camera" size={30} color="#fff" />
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 18,
                                fontWeight: 'bold',
                                marginTop: '10%',
                            }}
                        >
                            사진 등록
                        </Text>
                    </TouchableOpacity>
                    <FlatList
                        horizontal
                        data={selectedImages}
                        renderItem={({ item, index }) => (
                            <View style={{ position: 'relative' }}>
                                <Image
                                    key={index}
                                    source={{ uri: item.uri }}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 10,
                                        marginRight: 10,
                                    }}
                                />
                                <TouchableOpacity
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 10,
                                        borderRadius: 10,
                                        padding: 1,
                                        zIndex: 2,
                                        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                                    }}
                                    onPress={() => handleRemoveImage(index)}
                                >
                                    <Feather
                                        name="x"
                                        size={20}
                                        color="#fff"
                                    />
                                </TouchableOpacity>
                            </View>
                        )}
                        style={{ flexGrow: 1 }}
                    />
                </View>

                <TextInput
                    placeholder="제목"
                    value={title}
                    onChangeText={setTitle}
                    style={{
                        marginBottom: 20,
                        padding: 10,
                        borderBottomWidth: 1,
                        borderColor: 'gray',
                        fontSize: 20,
                    }}
                />

                <View
                    style={{
                        marginBottom: 20,
                        padding: 10,
                        borderBottomWidth: 1,
                        borderColor: 'gray',
                        zIndex: 1,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setShowCategoryList(!showCategoryList)}
                    >
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Text
                                style={{
                                    padding: 5,
                                    borderBottomWidth: 1,
                                    borderRadius: 5,
                                    flex: 1,
                                    fontSize: 20,
                                    color: 'rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                {category || '카테고리'}
                            </Text>
                            <Text style={{ fontSize: 24 }}>
                                {showCategoryList ? '▲' : '▼'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {showCategoryList && (
                        <ScrollView
                            style={{
                                maxHeight: 200,
                                marginTop: 10,
                                
                                width: '100%',
                                zIndex: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                                elevation: 2,
                            }}
                        >
                            {categories.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setCategory(item);
                                        setShowCategoryList(false);
                                    }}
                                >
                                    <Text
                                        style={{
                                            paddingVertical: 10,
                                            fontSize: 20,
                                        }}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </View>

                <TextInput
                    placeholder="₩ 가격을 입력해주세요."
                    value={price}
                    onChangeText={setPrice}
                    style={{
                        marginBottom: 20,
                        padding: 10,
                        borderBottomWidth: 1,
                        borderColor: 'gray',
                        fontSize: 20,
                    }}
                />

                <View
                    style={{
                        marginBottom: 20,
                        padding: 10,
                        borderBottomWidth: 1,
                        borderColor: 'gray',
                        zIndex: 1,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => setShowDurationList(!showDurationList)}
                    >
                        <View
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                        >
                            <Text
                                style={{
                                    padding: 5,
                                    borderBottomWidth: 1,
                                    borderRadius: 5,
                                    flex: 1,
                                    fontSize: 20,
                                    color: 'rgba(0, 0, 0, 0.5)',
                                }}
                            >
                                기간 {duration || '최대 개월 선택'}{' '}
                                {showDurationList ? '▲' : '▼'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    {showDurationList && (
                        <ScrollView
                            style={{
                                maxHeight: 200,
                                marginTop: 10,
                                
                                width: '100%',
                                zIndex: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                                elevation: 2,
                            }}
                        >
                            {durations.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        setDuration(item);
                                        setShowDurationList(false);
                                    }}
                                >
                                    <Text
                                        style={{
                                            paddingVertical: 10,
                                            fontSize: 20,
                                        }}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    )}
                </View>

                <TextInput
                    placeholder="상품 설명"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                    style={{
                        marginBottom: 20,
                        padding: 10,
                        borderBottomWidth: 1,
                        borderColor: 'gray',
                        minHeight: 200,
                        fontSize: 20,
                    }}
                />

                <TouchableOpacity
                    onPress={registerProduct}
                    style={{
                        backgroundColor: '#A7C8E7',
                        padding: 13,
                        alignItems: 'center',
                        borderRadius: 20,
                        alignSelf: 'center',
                        marginBottom: 50,
                    }}
                >
                    <Text
                        style={{
                            color: '#000000',
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}
                    >
                        작성 완료
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default WritePost;
