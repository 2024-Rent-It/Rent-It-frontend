import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HomeIcon = ({ title, onPress, iconName }) => {
  const IconComponent = iconName.startsWith('md') || iconName.startsWith('ios') ? Ionicons : MaterialCommunityIcons;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.iconContainer}>
        <IconComponent name={iconName} size={33} color="black" />
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    paddingHorizontal: 10, // 왼쪽 여백 추가
    marginBottom: 15, // 아이콘들 사이의 간격 조절
  },
  title: {
    color: 'black',
    fontSize: 10,
    marginTop: 5,
  },
});

export default HomeIcon;