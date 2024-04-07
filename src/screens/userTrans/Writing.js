import React, { useState } from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity, Alert, Modal } from 'react-native';

const WritePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [showCategoryList, setShowCategoryList] = useState(false); // 카테고리 목록 표시 여부

  const handlePhotoUpload = () => {
    Alert.alert('사진 등록 버튼 클릭', '사진을 업로드할 수 있습니다.');
  };

  const categories = ['애완용품', '유아용품', '가구/인테리어', '도서/문구', '미용소품']; // 카테고리 목록

  return (
    <ScrollView style={{ padding: 20 }}>
      <TouchableOpacity onPress={handlePhotoUpload} style={{ marginBottom: 20, borderBottomWidth: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>사진 등록</Text>
      </TouchableOpacity>

      <TextInput
        placeholder="제목"
        value={title}
        onChangeText={setTitle}
        style={{ 
          marginBottom: '10%',
          padding: '5%',
          borderBottomWidth: 1,
          borderColor: 'gray',
          fontSize: 20,
        }}
      />

      <View style={{ marginBottom: 20, padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}>
        <Text style={{ marginBottom: 5, fontSize: 20 }}>카테고리</Text>
        <TouchableOpacity onPress={() => setShowCategoryList(true)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ padding: 5, borderBottomWidth: 1, borderRadius: 5, flex: 1, fontSize: 20 }}>{category || '카테고리 선택'}</Text>
            <Text style={{ fontSize: 24 }}>{'▼'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="가격"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
        style={{
          marginBottom: '10%',
          padding: '5%',
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
          marginBottom: '10%',
          padding: '5%',
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

      {/* 카테고리 목록 모달 */}
      <Modal
        visible={showCategoryList}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCategoryList(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 10 }}>카테고리 선택</Text>
            {categories.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => {
                setCategory(item);
                setShowCategoryList(false);
              }}>
                <Text style={{ paddingVertical: 10, fontSize: 20 }}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </ScrollView> 
  );
};

export default WritePost;