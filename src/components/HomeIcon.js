import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HomeIcon = ({ title, onPress, iconName }) => {
  const IconComponent = iconName.startsWith('md') || iconName.startsWith('ios') ? Ionicons : MaterialCommunityIcons;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.iconContainer}>
        <IconComponent name={iconName} size={37} color="black" />
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
  },
  title: {
    color: 'black',
    fontSize: 10,
    marginTop: 5,
  },
});

export default HomeIcon;