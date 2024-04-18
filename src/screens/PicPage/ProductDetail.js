import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BASE_URL } from '../../constants/api.js';


const ProductDetailPage = ({ route }) => {
  const { product } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [categoryWidth, setCategoryWidth] = useState(0);

  const toggleLike = () => {
    setIsLiked(prevState => !prevState);
  };

  const showProductList= () =>{

  }



  useEffect(() => {
    if (categoryWidth === 0) {
      // Calculate the width of the category text
      const categoryTextWidth = Dimensions.get('window').width * 0.27 - 10; // Assuming marginLeft: '5%' and paddingHorizontal: 20
      setCategoryWidth(categoryTextWidth);
    }
  }, [categoryWidth]);

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Image source={{uri:`${BASE_URL}/images/${product.productImages}`}} style={{ width: '100%', height: '40%' }} />
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingTop: 10, paddingBottom: 10, }}> 
        <Ionicons name="person-circle-outline" size={50} color="black" />
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', paddingBottom: 2 }}>{product.sellerName}</Text>
          <Text style={{ fontSize: 13, paddingTop: 2, }}>{product.Location}</Text>
        </View>
      </View>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#EAEAEA' }}></View>
      <View style={{ padding: 10, marginLeft: '5%', marginRight: '5%',  }}> 
        <Text style={{ fontSize: 19, marginBottom: 2, marginTop: '2%', fontWeight: 'bold',  }}>{product.title}</Text>
      </View>
      <View style={{ backgroundColor: '#DDEAF6', borderRadius: 20, flexDirection: 'row', width: categoryWidth + 10, marginLeft: '5%', justifyContent: 'center' }}>
        <Text style={{ fontSize: 15, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 5 }}>{product.category}</Text>
      </View>
      <View style={{ padding: 10, marginLeft: '5%', marginRight: '5%' }}> 
        <Text style={{ fontSize: 17, marginBottom: 5, marginTop: '4%' }}>{product.description}</Text>
      </View>
      
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#ECECEC', height: 165, borderTopLeftRadius: 30, borderTopRightRadius: 30 }}>
  <View style={{ flexDirection: 'row',  alignItems: 'center', paddingHorizontal: 20, paddingTop: 10, marginTop:'2%' }}>
    <TouchableOpacity onPress={toggleLike}>
      {isLiked ? (
        <Ionicons name="heart" size={43} color="black" />
      ) : (
        <Ionicons name="heart-outline" size={43} color="black" />
      )}
    </TouchableOpacity>
       <Text style={{ fontSize: 24, color: 'black', marginLeft: '4%', fontWeight: 'bold', marginRight: '16%'}}>₩{product.price}</Text>
    
      <View style={{ backgroundColor: '#FFF', borderRadius: 20, justifyContent: 'center', width: '37%', alignSelf: 'center', marginLeft: '2%' }}>
       <Text style={{ color: '#000', fontSize: 15, textAlign: 'center', paddingVertical: 5 }}>최대 {product.duration} 가능</Text>
     </View>
  </View>
 

  <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop:'3%' }}>
    <TouchableOpacity style={{ backgroundColor: '#A7C8E7', paddingHorizontal: 130, paddingVertical: 17, borderRadius: 25 }}>
      <Text style={{ color: '#000000', fontSize: 20 }}>채팅 보내기</Text>
    </TouchableOpacity>
  </View>
</View>
    </View>
  );
};

export default ProductDetailPage;
