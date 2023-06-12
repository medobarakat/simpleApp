import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import {Formik} from 'formik';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Signup = ({navigation}) => {
  const goBack = () => {
    navigation.goBack();
  };

  const validateForm = values => {
    // Validation logic here
  };

  const handleSubmit = values => {
    // Form submission logic here
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Icon name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        initialValues={{name: '', email: '', password: '', confirmPassword: ''}}
        validate={validateForm}
        onSubmit={handleSubmit}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Business Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
                  <TextInput
                style={styles.input}
                placeholder="Services Name"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
                 <TextInput
                style={styles.input}
                placeholder="Adress"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
                 <TextInput
                style={styles.input}
                placeholder="Phone"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
          
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: width - 60,
    marginVertical:10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#111b31',
    height: 50,
    width: width - 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderRadius:40
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
