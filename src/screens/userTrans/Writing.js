import React from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';

const WritePost = () => {
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [description, setDescription] = React.useState('');

  const handlePhotoUpload = () => {
    Alert.alert('사진 등록 버튼 클릭', '사진을 업로드할 수 있습니다.');
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <TouchableOpacity onPress={handlePhotoUpload} style={{ marginBottom: 20, borderBottomWidth: 1 }}>
        <Text style={{ fontSize: 20 }}>사진 등록</Text>
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
        }}/>

      <View style={{ marginBottom: 20, padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}>
        <Text style={{ marginBottom: 5 }}>카테고리</Text>
        <ScrollView horizontal>
          <TouchableOpacity onPress={() => setCategory('애완용품')} style={{ marginRight: 10 }}>
            <Text style={{ padding: 5, borderBottomWidth: 1, borderRadius: 5 }}>{'애완용품'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setCategory('유아용품')}>
            <Text style={{ padding: 5, borderBottomWidth: 1, borderRadius: 5 }}>{'유아용품'}</Text>
          </TouchableOpacity>
        </ScrollView>
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
        }}/>

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
        }}/>

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
        }}/>
    </ScrollView> 
  );
};

export default WritePost;