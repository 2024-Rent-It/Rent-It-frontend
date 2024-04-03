import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const HomeIcon = ({ title, onPress, iconName }) => {
 
  const IconComponent = iconName.startsWith('md') || iconName.startsWith('ios') ? Ionicons : MaterialCommunityIcons;

  return (
    <TouchableOpacity onPress={onPress} style={{ alignItems: 'center' }}>
      <View style={{ alignItems: 'center', marginTop: 30 }}>
        <IconComponent name={iconName} size={37} color="black" /> 
        <Text style={{ color: 'black', fontSize: 10, marginTop: 5 }}>{title}</Text> 
      </View>
    </TouchableOpacity>
  );
};

export default HomeIcon;