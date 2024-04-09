/*import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Feather 아이콘을 사용하기 위해 추가
import * as ImagePicker from 'expo-image-picker';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지
  const [showCategoryList, setShowCategoryList] = useState(false); // 카테고리 목록 표시 여부

  // 권한 요청
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'You need to grant permission to access the media library.');
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const handlePhotoUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      console.log(result.uri); // 이미지 URI 확인용
    }
  };

  const categories = ['애완용품', '유아용품', '가구/인테리어', '도서/문구', '미용소품']; // 카테고리 목록

  return (
    <ScrollView style={{ padding: 20 }}>
      <TouchableOpacity onPress={handlePhotoUpload} style={{ 
        backgroundColor: '#8A8A8A', // 배경색 진한 회색
        width: '27%', // 화면 전체 너비
        height: '16%',
        paddingVertical: 15, // 상하 여백
        alignItems: 'center', // 수직 가운데 정렬
        borderRadius: 10, // 버튼 모양 정사각형
        marginBottom: 50, // 중간보다 더 아래에 위치
        justifyContent: 'center', // 수평 가운데 정렬
      }}>
        <Feather name="camera" size={30} color="#fff" /> 
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: '10%' }}>사진 등록</Text>
      </TouchableOpacity>

      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginBottom: 20, alignSelf: 'center' }} />}

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

      <View style={{ marginBottom: 20, padding: 10, borderBottomWidth: 1, borderColor: 'gray', zIndex: 1 }}>
        <TouchableOpacity onPress={() => setShowCategoryList(!showCategoryList)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ padding: 5, borderBottomWidth: 1, borderRadius: 5, flex: 1, fontSize: 20, color: 'rgba(0, 0, 0, 0.5)' }}>{category || '카테고리'}</Text>
            <Text style={{ fontSize: 24 }}>{showCategoryList ? '▲' : '▼'}</Text>
          </View>
        </TouchableOpacity>
        {showCategoryList && (
          <ScrollView style={{ maxHeight: 200, marginTop: 10, position: 'absolute', width: '100%', zIndex: 2, backgroundColor: 'rgba(200, 200, 200, 0.8)', elevation: 2 }}>
            {categories.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => {
                setCategory(item);
                setShowCategoryList(false);
              }}>
                <Text style={{ paddingVertical: 10, fontSize: 20 }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <TextInput
        placeholder="가격"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{
          marginBottom: 20,
          padding: 10,
          borderBottomWidth: 1,
          borderColor: 'gray',
          fontSize: 20,
        }}
      />

      <TextInput
        placeholder="대여 기간 (일)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
        style={{
          marginBottom: 20,
          padding: 10,
          borderBottomWidth: 1,
          borderColor: 'gray',
          fontSize: 20,
        }}
      />

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

      <TouchableOpacity onPress={() => {}} style={{ backgroundColor: 'skyblue', padding: 13, alignItems: 'center', borderRadius: 20, alignSelf: 'center', marginBottom: 50 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>작성 완료</Text>
      </TouchableOpacity>
    </ScrollView> 
  );
};

export default WritePost;
*/


import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity, Alert, Modal, Image } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Feather 아이콘을 사용하기 위해 추가
import * as ImagePicker from 'expo-image-picker';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지
  const [showCategoryList, setShowCategoryList] = useState(false); // 카테고리 목록 표시 여부
  const [showDurationList, setShowDurationList] = useState(false); // 대여 기간 목록 표시 여부

  // 권한 요청
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'You need to grant permission to access the media library.');
    }
  };

  useEffect(() => {
    requestPermission();
  }, []);

  const handlePhotoUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      console.log(result.uri); // 이미지 URI 확인용
    }
  };

  const categories = ['인기렌탈', '가구/인테리어', '패션잡화', '미용소품', '유아용품', '생활용품', '생활가전', '도서/문구', '미술품', '구합니다', '디지털기기', '스포츠/레저', '운동기구', '파티용품', '반려동물용품', '기타']; // 카테고리 목록
  const durations = ['1주', '2주', '3주', '4주', '2개월', '3개월', '6개월', '12개월']; // 대여 기간 목록

  return (
    <ScrollView style={{ backgroundColor: '#FFFFFF', padding: 20 }}>
      <TouchableOpacity onPress={handlePhotoUpload} style={{ 
        backgroundColor: '#8A8A8A', // 배경색 진한 회색
        width: '27%', // 화면 전체 너비
        height: '16%',
        paddingVertical: 15, // 상하 여백
        alignItems: 'center', // 수직 가운데 정렬
        borderRadius: 10, // 버튼 모양 정사각형
        marginBottom: 50, // 중간보다 더 아래에 위치
        justifyContent: 'center', // 수평 가운데 정렬
      }}>
        <Feather name="camera" size={30} color="#fff" /> 
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: '10%' }}>사진 등록</Text>
      </TouchableOpacity>

      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginBottom: 20, alignSelf: 'center' }} />}

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

      <View style={{ marginBottom: 20, padding: 10, borderBottomWidth: 1, borderColor: 'gray', zIndex: 1 }}>
        <TouchableOpacity onPress={() => setShowCategoryList(!showCategoryList)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ padding: 5, borderBottomWidth: 1, borderRadius: 5, flex: 1, fontSize: 20, color: 'rgba(0, 0, 0, 0.5)' }}>{category || '카테고리'}</Text>
            <Text style={{ fontSize: 24 }}>{showCategoryList ? '▲' : '▼'}</Text>
          </View>
        </TouchableOpacity>
        {showCategoryList && (
          <ScrollView style={{ maxHeight: 200, marginTop: 10, position: 'absolute', width: '100%', Index: 2, backgroundColor: '#F1F1F1', elevation: 2 }}>
            {categories.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => {
                setCategory(item);
                setShowCategoryList(false);
              }}>
                <Text style={{ paddingVertical: 10, fontSize: 20 }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>

      <View style={{ marginBottom: 20, padding: 10, borderBottomWidth: 1, borderColor: 'gray', zIndex: 1 }}>
        <TouchableOpacity onPress={() => setShowDurationList(!showDurationList)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ padding: 5, borderBottomWidth: 1, borderRadius: 5, flex: 1, fontSize: 20, color: 'rgba(0, 0, 0, 0.5)' }}>{price ? `최대 ${price}원` : '대여 기간'}</Text>
            <Text style={{ fontSize: 24 }}>{showDurationList ? '▲' : '▼'}</Text>
          </View>
        </TouchableOpacity>
        {showDurationList && (
          <ScrollView style={{ maxHeight: 240, marginTop: 10, position: 'absolute', width: '100%', Index: 2, backgroundColor: '#f1f1f1', elevation: 2 }}>
            {durations.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => {
                setDuration(item);
                setShowDurationList(false);
              }}>
                <Text style={{ paddingVertical: 10, fontSize: 20 }}>{item}</Text>
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

      {/* '글 등록' 버튼 */}
      <TouchableOpacity onPress={() => {}} style={{ backgroundColor: 'skyblue', padding: 13, alignItems: 'center', borderRadius: 20, alignSelf: 'center', marginBottom: 50 }}>
        <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>작성 완료</Text>
      </TouchableOpacity>
    </ScrollView> 
  );
};

export default WritePost;