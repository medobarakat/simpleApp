import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Select, CheckIcon} from 'native-base';
import CountryPicker from 'react-native-country-picker-modal';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  LastName: Yup.string().required('Last Name is required'),
  serviceName: Yup.string().required('Services Name is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string()
    .required('Zip Code is required')
    .min(5, 'you have entered wrong zip code')
    .max(5, 'you have entered wrong zip code'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  address1: Yup.string().required('Address is required'),
  address2: Yup.string().required('Address 2 is required'),
});

const Signup = ({navigation}) => {
  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState(false);

  const onSelect = country => {
    setCountry(country);
    setCountryError(false);
  };
  // return (
  // const goBack = () => {
  //   navigation.goBack();
  // };

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleSubmit = values => {
    // Form submission logic here
    if (country === '') {
      setCountryError(true);
      console.log('yes');
    } else {
      console.log('no');
      console.log(values);
      console.warn(country);
    }
  };

 

  const [selectedService, setSelectedService] = useState('');

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Box>
        <View style={styles.titleWrapper}>
          <Icon name="closecircleo" size={35} />
          <Text style={styles.titleText}>App Board</Text>
        </View>
        {/* any description will be here */}
        {/* <Text style={styles.DescText}>Quick Registration With Email</Text> */}
      </Box>
      <Formik
        initialValues={{
          firstName: '',
          LastName: '',
          serviceName: '',
          city: '',
          state: '',
          zipCode: '',
          email: '',
          phone: '',
          address1: '',
          address2: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => (
          <>
            <View style={styles.inputContainer}>
              <Animated.View
                style={[
                  styles.inputWrapper2,
                  
                ]}>
                <CountryPicker onSelect={e => onSelect(e.name)} />
                <Text style={styles.span}>{country}</Text>
              </Animated.View>

              {countryError && (
                <Text style={styles.errorText}>Select A Country Please</Text>
              )}
              <Text style={styles.span}>First Name</Text>
              <Animated.View
                style={[
                  styles.inputWrapper,
                  {
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [200, 0],
                        }),
                      },
                    ],
                  },
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                />
              </Animated.View>
              {touched.firstName && errors.firstName && (
                <Text style={styles.errorText}>{errors.firstName}</Text>
              )}
              <Text style={styles.span}>Last Name</Text>
              <Animated.View
                style={[
                  styles.inputWrapper,
                  {
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [200, 0],
                        }),
                      },
                    ],
                  },
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  onChangeText={handleChange('LastName')}
                  onBlur={handleBlur('LastName')}
                  value={values.LastName}
                />
              </Animated.View>
              {touched.LastName && errors.LastName && (
                <Text style={styles.errorText}>{errors.LastName}</Text>
              )}

              <Text style={styles.span}>Services</Text>

              <Animated.View
                style={[
                  styles.SelectWrapper,
                  {
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [200, 0],
                        }),
                      },
                    ],
                  },
                ]}>
                <Box maxW={width}>
                  <Select
                    selectedValue={selectedService}
                    accessibilityLabel="Choose Service"
                    placeholder="Choose Service"
                    _selectedItem={{
                      bg: 'teal.600',
                      endIcon: <CheckIcon size="5" />,
                    }}
                    onValueChange={itemValue => {
                      handleChange('serviceName')(itemValue);
                      setSelectedService(itemValue);
                    }}>
                    <Select.Item label="UX Research" value="ux" />
                    <Select.Item label="Web Development" value="web" />
                    <Select.Item
                      label="Cross Platform Development"
                      value="cross"
                    />
                    <Select.Item label="UI Designing" value="ui" />
                    <Select.Item label="Backend Development" value="backend" />
                  </Select>
                </Box>
              </Animated.View>
              {touched.serviceName && errors.serviceName && (
                <Text style={styles.errorText}>{errors.serviceName}</Text>
              )}
              <Text style={styles.span}>Address 1</Text>
              <Animated.View
                style={[
                  styles.inputWrapper,
                  {
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [200, 0],
                        }),
                      },
                    ],
                  },
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Adress 1"
                  onChangeText={handleChange('address1')}
                  onBlur={handleBlur('address1')}
                  value={values.address1}
                />
              </Animated.View>
              {touched.address1 && errors.address1 && (
                <Text style={styles.errorText}>{errors.address1}</Text>
              )}
              <Text style={styles.span}>Address 2</Text>

              <Animated.View
                style={[
                  styles.inputWrapper,
                  {
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [200, 0],
                        }),
                      },
                    ],
                  },
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Address 2"
                  onChangeText={handleChange('address2')}
                  onBlur={handleBlur('address2')}
                  value={values.address2}
                />
              </Animated.View>

              {touched.address2 && errors.address2 && (
                <Text style={styles.errorText}>{errors.address2}</Text>
              )}
              <Text style={styles.span}>City</Text>
              <Animated.View
                style={[
                  styles.inputWrapper,
                  {
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [200, 0],
                        }),
                      },
                    ],
                  },
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="City name"
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                />
              </Animated.View>
              {touched.city && errors.city && (
                <Text style={styles.errorText}>{errors.city}</Text>
              )}
              <Text style={styles.span}>State</Text>
              <Animated.View
                style={[
                  styles.inputWrapper,
                  {
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [200, 0],
                        }),
                      },
                    ],
                  },
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Zip Code"
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  value={values.state}
                />
              </Animated.View>
              {touched.state && errors.state && (
                <Text style={styles.errorText}>{errors.state}</Text>
              )}
              <Text style={styles.span}>Zip Code</Text>
              <Animated.View
                style={[
                  styles.inputWrapper,
                  {
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [200, 0],
                        }),
                      },
                    ],
                  },
                ]}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  placeholder="Zip Code"
                  onChangeText={handleChange('zipCode')}
                  onBlur={handleBlur('zipCode')}
                  value={values.zipCode}
                />
              </Animated.View>
              {touched.zipCode && errors.zipCode && (
                <Text style={styles.errorText}>{errors.zipCode}</Text>
              )}
              <Text style={styles.span}>Email</Text>

              <Animated.View
                style={[
                  styles.inputWrapper,
                  {
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [200, 0],
                        }),
                      },
                    ],
                  },
                ]}>
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
              <Text style={styles.span}>Phone</Text>

              <Animated.View
                style={[
                  styles.inputWrapper,
                  {
                    transform: [
                      {
                        translateY: slideAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [200, 0],
                        }),
                      },
                    ],
                  },
                ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Phone"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  keyboardType='number-pad'
                />
              </Animated.View>
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>

            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
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
    marginTop: 10,
  },
  inputWrapper: {
    marginBottom: 10,
    paddingHorizontal: 10,
    width: width - 60,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 3,
  },
  inputWrapper2: {
    marginBottom: 10,
    width: width - 60,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  SelectWrapper: {
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
    width: width / 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginBottom: 16,
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
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: -height / 24,
  },
  titleText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
    fontWeight: '400',
    marginLeft: 10,
  },
  DescText: {
    fontSize: 16,
    color: 'black',
  },
  span: {
    marginVertical: 15,
    color: 'black',
  },
});
