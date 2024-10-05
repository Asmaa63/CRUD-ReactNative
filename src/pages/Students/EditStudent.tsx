import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute, useNavigation, CommonActions } from '@react-navigation/native';
import axios from 'axios';
import CommonStyles from '@/assets/styles/styles';
import Toast from 'react-native-toast-message';
import CourseDropdown from './CourseDropdown'; // Import the refactored dropdown component

interface Student {
  studentId: string;
  studentName: string;
  studentPhone: string;
}

interface Course {
  courseCode: string;
  courseTitle: string;
}

interface RouteParams {
  student: Student;
}

const EditStudent: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { student } = route.params as RouteParams;

  const [name, setName] = useState(student?.studentName || '');
  const [phone, setPhone] = useState(student?.studentPhone || '');
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [courseItems, setCourseItems] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    // Fetch courses from the API
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/courses/listcourses');
        const courseData = response.data.map((course: Course) => ({
          label: course.courseTitle,
          value: course.courseCode,
        }));
        setCourseItems(courseData);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    
    fetchCourses();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Edit Student' });
  }, [navigation]);

  const handleSave = async () => {
    if (!student.studentId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Student ID is missing.',
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/students/updatestudent', {
        studentId: student.studentId,
        studentName: name,
        studentPhone: phone,
        courses: selectedCourses.map((courseCode) => ({ courseCode })),
      });

      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Student information updated successfully!',
        });

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'StudentList' }],
          })
        );
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to update student. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error updating student:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'There was an issue updating the student. Please try again.',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={CommonStyles.container}>
      <Text style={CommonStyles.title}>Edit Student</Text>

      <TextInput
        style={CommonStyles.input}
        value={name}
        onChangeText={setName}
        placeholder="Student Name"
      />

      <TextInput
        style={CommonStyles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />

      <CourseDropdown
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
        courseItems={courseItems}
      />

      <TouchableOpacity style={CommonStyles.button} onPress={handleSave}>
        <Text style={CommonStyles.buttonText}>Save</Text>
      </TouchableOpacity>

      <Toast />
    </ScrollView>
  );
};

export default EditStudent;
