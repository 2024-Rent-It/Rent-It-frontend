import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity, Alert, Image, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from '../../contexts/AuthContext';
import { BASE_URL } from '../../constants/api.js';
import { useNavigation } from '@react-navigation/native';

const EditPost = ({ route }) => {
    const { token } = useAuth();
    const navigation = useNavigation();
    const { productId } = route.params;

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [description, setDescription] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);

    useEffect(() => {
        fetchProductData(productId);
    }, [productId]);

    const fetchProductData = async (productId) => {
        try {
            const response = await fetch(`${BASE_URL}/products/${productId}`);
            if (!response.ok) {
                throw new Error('제품 데이터를 가져오는 데 실패했습니다.');
            }
            const productData = await response.json();
            setTitle(productData.title);
            setCategory(productData.category);
            setPrice(productData.price.toString());
            setDuration(productData.duration);
            setDescription(productData.description);
            setSelectedImages(productData.images);
        } catch (error) {
            console.error('제품 데이터를 가져오는 중 오류 발생:', error);
        }
    };

    const handlePhotoUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            selectionLimit: 3,
            quality: 1,
        });

        if (!result.cancelled && result.assets) {
            setSelectedImages([...selectedImages, ...result.assets]);
            console.log(result.assets); // 이미지 URI 확인용
        }
    };

    const handleRemoveImage = (index) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };

    const updateProduct = async () => {
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('duration', duration);
            formData.append('description', description);
            selectedImages.forEach((image, index) => {
                formData.append(`images`, {
                    uri: image.uri,
                    name: image.uri.split('/').pop(),
                    type: `image/${image.uri.split('.').pop()}`,
                });
            });
            const response = await fetch(`${BASE_URL}/products/${productId}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            if (response.ok) {
                Alert.alert('제품이 성공적으로 업데이트되었습니다.');
                navigation.navigate('HomeTab');
            } else {
                throw new Error('제품 업데이트에 실패했습니다.');
            }
        } catch (error) {
            console.error('제품 업데이트 중 오류 발생:', error);
            Alert.alert('제품 업데이트에 실패했습니다.');
        }
    };

    return (
        <ScrollView style={{ backgroundColor: '#FFFFFF', padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
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
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: '10%' }}>사진 등록</Text>
                </TouchableOpacity>
                <FlatList
                    horizontal
                    data={selectedImages}
                    renderItem={({ item, index }) => (
                        <View style={{ position: 'relative' }}>
                            <Image key={index} source={{ uri: item.uri }} style={{ width: 100, height: 100, borderRadius: 10, marginRight: 10 }} />
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
                                <Feather name="x" size={20} color="#fff" />
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
                style={{ marginBottom: 20, padding: 10, borderBottomWidth: 1, borderColor: 'gray', fontSize: 20 }}
            />
            {/* 카테고리 선택 UI */}
            <View style={{ marginBottom: 20, padding: 10, borderBottomWidth: 1, borderColor: 'gray', zIndex: 1 }}>
                {/* 카테고리 선택 코드 */}
            </View>
            <TextInput
                placeholder="₩ 가격을 입력해주세요."
                value={price}
                onChangeText={setPrice}
                style={{ marginBottom: 20, padding: 10, borderBottomWidth: 1, borderColor: 'gray', fontSize: 20 }}
            />
          
            <View style={{ marginBottom: 20, padding: 10, borderBottomWidth: 1, borderColor: 'gray', zIndex: 1 }}>
               
            </View>
            <TextInput
                placeholder="상품 설명"
                value={description}
                onChangeText={setDescription}
                multiline
                style={{ marginBottom: 20, padding: 10, borderBottomWidth: 1, borderColor: 'gray', minHeight: 200, fontSize: 20 }}
            />
            
            <TouchableOpacity
                onPress={updateProduct}
                style={{ backgroundColor: '#A7C8E7', padding: 13, alignItems: 'center', borderRadius: 20, alignSelf: 'center' }}
            >
                <Text style={{ color: '#000000', fontSize: 18, fontWeight: 'bold' }}>수정 완료</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default EditPost;
