import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import CommonStyles from '@/assets/styles/styles';

const CreateCourse = () => {
  const [courseCode, setCourseCode] = useState('');
  const [courseTitle, setCourseTitle] = useState('');
  const [category, setCategory] = useState('');

  const handleCreateCourse = async () => {
    if (courseCode && courseTitle && category) {
      try {
        // Sending the course data to the API
        const response = await axios.post('http://localhost:8080/courses/savecourse', {
          courseCode,
          courseTitle,
          category,
        });
        
        // If the course is successfully created
        Alert.alert('Course Created', `Code: ${courseCode}\nTitle: ${courseTitle}\nCategory: ${category}`);

        // Clear the fields after creation
        setCourseCode('');
        setCourseTitle('');
        setCategory('');
      } catch (error) {
        // If there is an error in the API request
        Alert.alert('Error', 'There was an issue creating the course. Please try again.');
        console.error('Error creating course:', error);
      }
    } else {
      Alert.alert('Error', 'Please fill in all fields.');
    }
  };

  return (
    <View style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Create a New Course</Text>
      
      <TextInput
        style={CommonStyles.input}
        placeholder="Course Code"
        value={courseCode}
        onChangeText={setCourseCode}
      />
      
      <TextInput
        style={CommonStyles.input}
        placeholder="Course Title"
        value={courseTitle}
        onChangeText={setCourseTitle}
      />

      <TextInput
        style={CommonStyles.input}
        placeholder="Course Category"
        value={category}
        onChangeText={setCategory}
      />

      <TouchableOpacity style={CommonStyles.button} onPress={handleCreateCourse}>
        <Text style={CommonStyles.buttonText}>Create Course</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreateCourse;
