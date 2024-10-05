// src/navigation/CourseStack.tsx
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CommonActions } from '@react-navigation/native';
import CustomHeader from '../Components/CustomHeader';
import CourseList from '../pages/Courses/CourseList';
import EditCourse from '../pages/Courses/EditCourse';

const Stack = createStackNavigator();

const CourseStack = ({ navigation }: { navigation: any }) => {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'CourseList' }],
        })
      );
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="CourseList"
      screenOptions={{
        header: ({ route }) => (
          <CustomHeader title={route.name === 'CourseList' ? 'Courses List' : 'Edit Course'} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen name="CourseList" component={CourseList} />
      <Stack.Screen name="EditCourse" component={EditCourse} />
    </Stack.Navigator>
  );
};

export default CourseStack;
