// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../pages/Home/Home';
import StudentStack from './StudentStack';
import CourseStack from './CourseStack';
import CreateStudent from '../pages/Students/CreateStudent';
import CreateCourse from '../pages/Courses/CreateCourse';
import CustomHeader from '../Components/CustomHeader';
import Colors from '@/assets/Shared/Colors';

const Drawer = createDrawerNavigator();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator
        initialRouteName="Home"
        screenOptions={{
          drawerActiveTintColor:Colors.Primary,
          drawerInactiveTintColor: '#333',
          drawerLabelStyle: {
            fontSize: 18,
            fontFamily: 'MochiyPop',
            paddingLeft:20,
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            header: ({ navigation }) => <CustomHeader title="Home Page" navigation={navigation} />,
            title: 'Home Page',
          }}
        />
        <Drawer.Screen
          name="List Students"
          component={StudentStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Create Student"
          component={CreateStudent}
          options={{
            header: ({ navigation }) => <CustomHeader title="Create Student" navigation={navigation} />,
            title: 'Create Student',
          }}
        />
        <Drawer.Screen
          name="List Courses"
          component={CourseStack}
          options={{ headerShown: false }}
        />
        <Drawer.Screen
          name="Create Course"
          component={CreateCourse}
          options={{
            header: ({ navigation }) => <CustomHeader title="Create Course" navigation={navigation} />,
            title: 'Create Course',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
