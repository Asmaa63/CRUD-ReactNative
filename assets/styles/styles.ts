import { StyleSheet } from "react-native";
import Colors from "../Shared/Colors";

 const textStyles = {
  fontFamily: 'MochiyPop',
};

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    ...textStyles, 
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.Primary, 
    backgroundColor: '#fff',
    paddingVertical: 10,
    zIndex: 1,
  },
  Card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  Info: {
    flex: 1,
  },
  Id: {
    ...textStyles,
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  Name: {
    ...textStyles, 
    fontSize: 16,
    color: Colors.Primary,
    marginBottom: 5,
  },
  Phone: {
    ...textStyles, 
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  icon: {
    marginLeft: 15,
  },
  list: {
    paddingBottom: 20,
  },
  actions: {
    flexDirection: 'row',
  },
  input: {
    ...textStyles, 
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  button: {
    backgroundColor: Colors.Primary,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    ...textStyles, 
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommonStyles;
