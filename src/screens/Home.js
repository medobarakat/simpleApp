import { Box, Input } from 'native-base';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import { Formik } from 'formik';
import * as Yup from 'yup';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const Home = ({ navigation }) => {
  const onPressHandler = () => {
    navigation.navigate('Signup');
  };

  const handleFormSubmit = (values) => {
    // Handle form submission here
    console.log(values);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container} extraScrollHeight={-100}>
      <View style={styles.firstSection}>
        <View style={styles.iconWrapper}>
          <Icon name="closecircleo" size={70} />
        </View>
      </View>
      <View style={styles.secondSection}>
        <Text style={styles.secondSectiontxt}>App Board</Text>
        <View style={{ marginTop: height / 30, alignItems: 'center' }}>
          <View>
            <Box marginLeft={10} marginBottom={5}>
              <Text>Quick Registration</Text>
            </Box>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={validationSchema}
              onSubmit={handleFormSubmit}
            >
              {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
                <>
                  <Box alignItems="center">
                    <Input
                    borderRadius={10}
                      height={50}
                      placeholder="Type Your Email"
                      w="150%"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorText}>{errors.email}</Text>
                    )}
                  </Box>
                  <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Quick Register</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
          <View style={styles.btnContainer}>
            <Text>OR</Text>
            <TouchableOpacity onPress={onPressHandler} style={styles.button}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  firstSection: {
    backgroundColor: '#111b31',
    height: 250,
    borderBottomRightRadius: 130,
    borderBottomLeftRadius: 130,
    borderColor: '#111b31',
    position: 'relative',
  },
  iconWrapper: {
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'absolute',
    bottom: -40,
    left: '40%',
  },
  secondSection: {
    marginTop: height / 12,
    alignItems: 'center',
  },
  secondSectiontxt: {
    textAlign: 'center',
    marginBottom: height / 40,
    fontSize: 24,
  },
  btnContainer: {
    marginTop: height / 19,
    width: width / 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#111b31',
    width: 200,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height / 26,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
