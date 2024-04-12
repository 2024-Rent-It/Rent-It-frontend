import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { FontAwesome6, Ionicons, MaterialCommunityIcons, Octicons, Fontisto } from '@expo/vector-icons'; // 필요한 아이콘 추가

const HomeIcon = ({ title, onPress, iconName }) => {
  const renderIcon = () => {
    switch (iconName) {
      case 'heart-outline':
        return <Ionicons name="heart-outline" size={32} color="black" />;
      case 'bed-outline':
        return <Ionicons name="bed-outline" size={32} color="black" />;
      case 'shirt-outline':
        return <Ionicons name="shirt-outline" size={32} color="black" />;
      case 'face-woman-shimmer-outline':
        return <MaterialCommunityIcons name="face-woman-shimmer-outline" size={32} color="black" />;
      case 'baby-bottle-outline':
        return <MaterialCommunityIcons name="baby-bottle-outline" size={32} color="black" />;
      case 'umbrella-outline':
        return <Ionicons name="umbrella-outline" size={32} color="black" />;
      case 'tv-outline':
        return <Ionicons name="tv-outline" size={32} color="black" />;
      case 'book-outline':
        return <Ionicons name="book-outline" size={32} color="black" />;
      case 'color-palette-outline':
        return <Ionicons name="color-palette-outline" size={32} color="black" />;
      case 'alarm-light-outline':
        return <MaterialCommunityIcons name="alarm-light-outline" size={32} color="black" />;
      case 'phone-portrait-outline':
        return <Ionicons name="phone-portrait-outline" size={32} color="black" />;
      case 'tent':
        return <Fontisto name="tent" size={32} color="black" />;
      case 'barbell-outline':
        return <Ionicons name="barbell-outline" size={32} color="black" />;
      case 'balloon-outline':
        return <Ionicons name="balloon-outline" size={32} color="black" />;
      case 'cat':
        return <MaterialCommunityIcons name="cat" size={32} color="black" />;
      case 'ellipsis-horizontal-outline':
        return <Ionicons name="ellipsis-horizontal-outline" size={32} color="black" />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.iconContainer}>
        {renderIcon()}
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 15, 
    flexBasis: '20%', // 아이콘 컨테이너의 너비를 20%로 설정하여 5개씩 가로로 배치
  },
  title: {
    color: 'black',
    fontSize: 10,
    marginTop: '10%',
  },
});

export default HomeIcon;