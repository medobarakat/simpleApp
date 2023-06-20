import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Box, Input, Button, Text } from 'native-base';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Primary_color, Sec_color } from '../../constants/Colors';
import Icon from 'react-native-vector-icons/AntDesign';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  const handleFormSubmit = (values) => {
    console.log(values);
    // Perform login logic here
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <View style={styles.formWrapper}>
        <Box marginBottom={75}>
        <View style={styles.titleWrapper}>
            <Icon name="closecircleo" size={35} />
            <Text style={styles.titleText}>App Board</Text>
          </View>
        </Box>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
            <>
              <Box>
                <Text style={styles.span}>Email</Text>
                <Input
                  borderRadius={20}
                  height={50}
                  placeholder="Email"
                  w="80%"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </Box>

              <Box marginTop={10}>
                <Text style={styles.span}>Password</Text>
                <Input
                  borderRadius={20}
                  height={50}
                  placeholder="Password"
                  type="password"
                  w="80%"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </Box>

              <Button
                style={styles.button}
                backgroundColor={Primary_color}
                _pressed={{ backgroundColor: Sec_color }}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Login</Text>
              </Button>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  formWrapper: {
    marginTop: height / 4.5,
    alignItems: 'center',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
    fontWeight: '400',
    marginLeft: 10,
    marginTop:10
  },
  span: {
    marginBottom: 10,
    color: 'black',
  },
  button: {
    width: width / 1.25,
    height: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height / 20,
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

export default Login;
