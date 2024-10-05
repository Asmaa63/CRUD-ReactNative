import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Colors from '../../../assets/Shared/Colors';
import CommonStyles from '@/assets/styles/styles';

// Define the type for the courses and the navigation params
type Course = {
  courseCode: string;
  courseTitle: string;
  category: string;
};

type CourseStackParamList = {
  CourseList: undefined;
  EditCourse: { course: Course };
};

const CourseList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<CourseStackParamList>>();

  // Function to fetch courses from API
  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8080/courses/listcourses');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
      Alert.alert('Error', 'Could not fetch courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (courseCode: string) => {
    try {
      await axios.delete(`http://localhost:8080/courses/deletecourse/${courseCode}`); // Replace with your delete API link
      setCourses(prevCourses => prevCourses.filter(course => course.courseCode !== courseCode));
      Alert.alert('Success', 'Course deleted successfully.');
    } catch (error) {
      Alert.alert('Error', 'Could not delete the course. Please try again later.');
    }
  };

  const renderCourse = ({ item }: { item: Course }) => (
    <View style={CommonStyles.Card}>
      <View style={CommonStyles.Info}>
        <Text style={CommonStyles.Id}>{item.courseCode}</Text>
        <Text style={CommonStyles.Name}>{item.courseTitle}</Text>
        <Text style={CommonStyles.Phone}>{item.category}</Text>
      </View>
      <View style={CommonStyles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('EditCourse', { course: item })}>
          <Icon name="edit" size={20} color={Colors.Primary} style={CommonStyles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteCourse(item.courseCode)}>
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
      <Text style={CommonStyles.title}>Courses List</Text>
      <FlatList
        data={courses}
        renderItem={renderCourse}
        keyExtractor={(item) => item.courseCode} // Ensure this key is unique
        contentContainerStyle={CommonStyles.list}
      />
    </View>
  );
};

export default CourseList;
