import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation, CommonActions } from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import CommonStyles from '@/assets/styles/styles';

interface Course {
  courseCode: string;
  courseTitle: string;
  category: string;
}

interface RouteParams {
  course: Course;
}

const EditCourse: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { course } = route.params as RouteParams;

  useEffect(() => {
    if (!course) {
      Alert.alert('Error', 'No course data found!');
    }
  }, [course]);

  const [courseCode, setCourseCode] = useState(course?.courseCode || '');
  const [courseTitle, setCourseTitle] = useState(course?.courseTitle || '');
  const [category, setCategory] = useState(course?.category || '');
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Edit Course' });
  }, [navigation]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/courses/updatecourse', {
        courseCode: courseCode,
        courseTitle: courseTitle,
        category: category,
      });

      console.log('API response:', response.data);

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'CourseList' }],
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API error:', error.response?.data);
      } else {
        console.error('Unknown error:', error);
      }
      Alert.alert('Error', 'Could not update the course. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Edit Course</Text>
      <TextInput
        style={CommonStyles.input}
        value={courseTitle}
        onChangeText={setCourseTitle}
        placeholder="Course Title"
      />
      <TextInput
        style={CommonStyles.input}
        value={category}
        onChangeText={setCategory}
        placeholder="Course Category"
      />
      <TouchableOpacity
        style={CommonStyles.button}
        onPress={handleSave}
        disabled={isLoading}
      >
        {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={CommonStyles.buttonText}>Save</Text>}
      </TouchableOpacity>
    </View>
  );
};

export default EditCourse;
