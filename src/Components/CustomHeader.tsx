// src/components/CustomHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import Colors from '@/assets/Shared/Colors';

interface CustomHeaderProps {
  title: string;
  navigation: any;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({ title, navigation }) => {
  return (
    <View style={{ height: 60, flexDirection: 'row', alignItems: 'center', backgroundColor:Colors.Primary, paddingHorizontal: 15, borderBottomWidth: 1, borderColor: '#CCC' }}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Ionicons name="menu" size={28} color="#FFF" />
      </TouchableOpacity>
      <Text style={{ fontSize: 22, color: '#FFF', marginLeft: 20, fontFamily: 'MochiyPop' }}>{title}</Text>
    </View>
  );
};

export default CustomHeader;
