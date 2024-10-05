import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import CommonStyles from '@/assets/styles/styles';
import Toast from 'react-native-toast-message';
import CourseDropdown from './CourseDropdown'; // Import the refactored dropdown component

interface Course {
  courseCode: string;
  courseTitle: string;
}

const CreateStudent: React.FC = () => {
  const [student, setStudent] = useState({
    name: '',
    phone: '',
  });
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [courseItems, setCourseItems] = useState<{ label: string; value: string }[]>([]);

  // Fetch courses from the API when the component loads
  useEffect(() => {
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

  // Handle student creation
  const handleCreate = async () => {
    if (student.name && student.phone && selectedCourses.length > 0) {
      try {
        const response = await axios.post('http://localhost:8080/students/savestudent', {
          studentName: student.name,
          studentPhone: student.phone,
          courses: selectedCourses.map((courseCode) => ({ courseCode })),
        });

        if (response.status === 200 || response.status === 201) {
          // Clear form fields
          setStudent({ name: '', phone: '' });
          setSelectedCourses([]);

          Toast.show({
            type: 'success',
            text1: 'Student Created!',
            text2: `Student with Name: ${student.name} was added successfully.`,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Failed to create student. Please try again.',
          });
        }
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'There was an issue creating the student. Please try again.',
        });
        console.error('Error creating student:', error);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill out all fields and select at least one course.',
      });
    }
  };

  return (
    <ScrollView contentContainerStyle={CommonStyles.container}>
      <Text style={CommonStyles.title}>Create Student</Text>

      <TextInput
        style={CommonStyles.input}
        placeholder="Name"
        value={student.name}
        onChangeText={(text) => setStudent({ ...student, name: text })}
      />
      <TextInput
        style={CommonStyles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={student.phone}
        onChangeText={(text) => setStudent({ ...student, phone: text })}
      />

      <CourseDropdown
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        selectedCourses={selectedCourses}
        setSelectedCourses={setSelectedCourses}
        courseItems={courseItems}
      />

      <TouchableOpacity style={CommonStyles.button} onPress={handleCreate}>
        <Text style={CommonStyles.buttonText}>Create</Text>
      </TouchableOpacity>

      <Toast />
    </ScrollView>
  );
};

export default CreateStudent;
