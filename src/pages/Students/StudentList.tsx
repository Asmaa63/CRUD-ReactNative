import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, NavigationProp } from '@react-navigation/native'; 
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios'; 
import Colors from '../../../assets/Shared/Colors';
import CommonStyles from '@/assets/styles/styles';
import Toast from 'react-native-toast-message';

// Define the types for the student and navigation params
type Course = {
  courseCode: string;
  courseTitle: string;
};

type Student = {
  studentId: string; // Still need this for UI
  studentName: string;
  studentPhone: string;
  courses: Course[];
};

type StudentStackParamList = {
  StudentList: undefined;
  EditStudent: { student: Student };
};

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true); 
  const navigation = useNavigation<NavigationProp<StudentStackParamList>>();

  // Fetch students from the API and assign local student IDs
  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:8080/students/liststudents');
      const validStudents = response.data.filter((student: Student) => student.studentId);

      // Generate local student IDs based on the length of the list
      const studentsWithLocalId = validStudents.map((student: Student, index: number) => ({
        ...student,
        studentId: (index + 1).toString(), // Generate IDs sequentially
      }));

      setStudents(studentsWithLocalId);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not fetch students. Please try again later.',
      });
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchStudents();
      return () => {};
    }, [])
  );

  const deleteStudent = async (studentId: string) => {
    try {
      await axios.delete(`http://localhost:8080/students/deletestudent/${studentId}`);
      setStudents(prevStudents => prevStudents.filter(student => student.studentId !== studentId));
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Student deleted successfully.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Could not delete the student. Please try again later.',
      });
      console.error('Error deleting student:', error);
    }
  };

  const renderStudent = ({ item }: { item: Student }) => (
    <View style={CommonStyles.Card}>
      <View style={CommonStyles.Info}>
        {/* Do not display the ID from the API */}
        <Text style={CommonStyles.Name}>Name: {item.studentName}</Text>
        <Text style={CommonStyles.Phone}>Phone: {item.studentPhone}</Text>
        <Text style={CommonStyles.Name}>Courses</Text>
        {item.courses.map((course: Course, index: number) => ( // Specify the type for course and index
          <View key={index} style={styles.CourseInfo}>
            <Text style={CommonStyles.Phone}>Code: {course.courseCode}</Text>
            <Text style={CommonStyles.Phone}>Title: {course.courseTitle}</Text>
          </View>
        ))}
      </View>
      <View style={CommonStyles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditStudent', { student: item })}>
          <Icon name="edit" size={20} color={Colors.Primary} style={CommonStyles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteStudent(item.studentId)}>
          <Icon name="trash" size={20} color={Colors.DeleteIcon} style={CommonStyles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator size="large" color={Colors.Primary} style={CommonStyles.loader} />;
  }

  return (
    <View style={CommonStyles.container}>
      <Text style={CommonStyles.title}>Students List</Text>
      {students.length === 0 ? (
        <Text>No students found.</Text>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item) => item.studentId.toString()}
          renderItem={renderStudent}
          contentContainerStyle={CommonStyles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  CourseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
});

export default StudentList;
