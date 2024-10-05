// src/navigation/StudentStack.tsx
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import CustomHeader from '../Components/CustomHeader';
import StudentList from '../pages/Students/StudentList';
import EditStudent from '../pages/Students/EditStudent';

const Stack = createStackNavigator();

const StudentStack = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'StudentList' }],
        })
      );
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="StudentList"
      screenOptions={{
        header: ({ route }) => (
          <CustomHeader title={route.name === 'StudentList' ? 'Students List' : 'Edit Student'} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen name="StudentList" component={StudentList} />
      <Stack.Screen name="EditStudent" component={EditStudent} />
    </Stack.Navigator>
  );
};

export default StudentStack;
