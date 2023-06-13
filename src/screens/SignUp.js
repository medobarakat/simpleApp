import React, { useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import { Formik } from 'formik';
import * as Yup from 'yup';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Business Name is required'),
  serviceName: Yup.string().required('Services Name is required'),
  address: Yup.string().required('Address is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
});

const Signup = ({ navigation }) => {
  const goBack = () => {
    navigation.goBack();
  };

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleSubmit = (values) => {
    // Form submission logic here
    console.log(values);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={goBack} style={styles.backButton}>
        <Icon name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Sign Up</Text>
      <Formik
        initialValues={{
          name: '',
          serviceName: '',
          address: '',
          email: '',
          phone: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
          <>
            <View style={styles.inputContainer}>
              <Animated.View style={[styles.inputWrapper, { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [200, 0] }) }] }]}>
                <TextInput
                  style={styles.input}
                  placeholder="Business Name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                  </Animated.View>
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}

              <Animated.View style={[styles.inputWrapper, { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [200, 0] }) }] }]}>
                <TextInput
                  style={styles.input}
                  placeholder="Services Name"
                  onChangeText={handleChange('serviceName')}
                  onBlur={handleBlur('serviceName')}
                  value={values.serviceName}
                />
                  </Animated.View>
                {touched.serviceName && errors.serviceName && (
                  <Text style={styles.errorText}>{errors.serviceName}</Text>
                )}

              <Animated.View style={[styles.inputWrapper, { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [200, 0] }) }] }]}>
                <TextInput
                  style={styles.input}
                  placeholder="Address"
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                  />
                  </Animated.View>
                {touched.address && errors.address && (
                  <Text style={styles.errorText}>{errors.address}</Text>
                )}

              <Animated.View style={[styles.inputWrapper, { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [200, 0] }) }] }]}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                />
                  </Animated.View>
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}

              <Animated.View style={[styles.inputWrapper, { transform: [{ translateY: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [200, 0] }) }] }]}>
                <TextInput
                  style={styles.input}
                  placeholder="Phone"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
                  </Animated.View>
                {touched.phone && errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}
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
    marginBottom: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    marginBottom: 10,
    paddingHorizontal: 10,
    width: width - 60,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
  },
  input: {
    height: 60,
  },
  button: {
    backgroundColor: '#111b31',
    height: 50,
    width: width /1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
