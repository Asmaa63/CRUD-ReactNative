import { Image, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import CommonStyles from '@/assets/styles/styles';

// Define the navigation stack params for the Home screen
type HomeStackParamList = {
  'List Students': undefined;
  'List Courses': undefined;
};

const Home = () => {
  // Initialize navigation with the correct type
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />; // Display loader while fonts are loading
  }

  return (
    <View style={StyleSheet.flatten([CommonStyles.container, styles.container])}>
      <Image source={require("../../../assets/images/Home.jpg")} style={styles.image} />
      <View style={styles.content}>
        <Text style={StyleSheet.flatten([CommonStyles.title, styles.text])}>
          Welcome to Student Management App
        </Text>
        <View style={styles.buttonContainer}>
          {/* Navigate to the student list when the button is pressed */}
          <Text 
            style={StyleSheet.flatten([CommonStyles.button, styles.button])} 
            onPress={() => navigation.navigate('List Students')}
          >
            Students
          </Text>
          <Text 
            style={StyleSheet.flatten([CommonStyles.button, styles.button])} 
            onPress={() => navigation.navigate('List Courses')}
          >
            Courses
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    justifyContent: "center",
    alignItems:"center",
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    width: "90%",
  },
  text: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: "800",
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '70%',
    gap: 10,
  },
  button: {
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    color:"#fff",
    textAlign:"center",
    fontWeight:"700",
    fontFamily:"MochiyPop",
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
  },
});
