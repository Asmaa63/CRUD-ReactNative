import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import AppNavigator from '../navigation/AppNavigator';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const Index: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    'MochiyPop': require('../../assets/fonts/MochiyPopPOne-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return <AppNavigator />;
};

export default Index;
