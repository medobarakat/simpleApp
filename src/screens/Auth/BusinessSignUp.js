import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Animated,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Box, Select, CheckIcon, Modal, Button} from 'native-base';
import CountryPicker from 'react-native-country-picker-modal';
import {Base_Url, Register_Api} from '../../constants/Apis';
import axios from 'axios';
import ButtonLoader from '../../Components/ButtonLoader';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const validationSchema = Yup.object().shape({
  BusinessName: Yup.string().required('Business Name is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  zipCode: Yup.string()
    .required('Zip Code is required')
    .min(5, 'you have entered wrong zip code')
    .max(5, 'you have entered wrong zip code'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().required('Phone is required'),
  address1: Yup.string().required('Address 1 is required'),
  address2: Yup.string().required('Address 2 is required'),
});

const BusinessSignUp = ({navigation}) => {
  const [country, setCountry] = useState('');
  const [countryError, setCountryError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [selectedService, setSelectedService] = useState();
  const [selectedServiceError, setSelectedServiceError] = useState('');

  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const onSelect = country => {
    setCountry(country);
    setCountryError(false);
  };

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

  const handleSubmitFormik = values => {
    // Form submission logic here
    if (country === '') {
      setCountryError(true);
      console.log('no country');
    } else if (selectedService === '') {
      setSelectedServiceError(true);
    } else {
      //  all validations passed
      // console.log(values);
      handleFormSubmitApi(values);
    }
  };

  const handleFormSubmitApi = values => {
    setLoading(true);
    setRequestError(false);
    // console.log(values)
    // console.log(body)
    const url = Base_Url + Register_Api;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      email: values.email,
      address1: values.address1,
      address2: values.address2,
      city: values.city,
      state: values.state,
      zipCode: values.zipCode,
      country: country,
      businessName: values.BusinessName,
      phoneNo: values.phone,
      businessServices: [
        {
          id: selectedService.id,
          service: selectedService.service,
        },
      ],
      registrationType: 'BUSINESS',
    };
    console.log(JSON.stringify(body));
    axios
      .post(url, body, config)
      .then(res => {
        console.log(res);
        setLoading(false);
        console.log(res.data.message);
        setModalVisible(true);
      })
      .catch(err => {
        setLoading(false);
        setRequestError(err.response.data[0].message);
        // setError(true);
      });
  };

  const handleServiceSelection = service => {
    setSelectedService(service);
    setSelectedServiceError(false);
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      {/* start of the modal */}
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>Success!</Modal.Header>
          <Modal.Body>
            <Text style={styles.modalText}>Registration Was Successfully</Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onPress={() => {
                setModalVisible(false);
                navigation.replace('login');
              }}>
              Okay
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* end of the modal */}
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
          BusinessName: '',
          city: '',
          state: '',
          zipCode: '',
          email: '',
          phone: '',
          address1: '',
          address2: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmitFormik}>
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
              <Text style={styles.span}>Business Name</Text>
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
                  placeholder="Business Name"
                  onChangeText={handleChange('BusinessName')}
                  onBlur={handleBlur('BusinessName')}
                  value={values.BusinessName}
                />
              </Animated.View>
              {touched.BusinessName && errors.BusinessName && (
                <Text style={styles.errorText}>{errors.BusinessName}</Text>
              )}

              <Text style={styles.span}>Services</Text>
              <Button
                onPress={() =>
                  navigation.navigate('selectService', {
                    selectedService,
                    handleServiceSelection,
                  })
                }
                borderRadius={10}>
                Select Services
              </Button>
              {selectedService && (
                <Text style={styles.span}>
                  selected Service Is {selectedService.service}
                </Text>
              )}
              {countryError == true && (
                <Text style={styles.errorText}>Select A Services Please</Text>
              )}

              {/*

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
              )} */}
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
              <>
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
              </>
              <>
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
                    placeholder="State"
                    onChangeText={handleChange('state')}
                    onBlur={handleBlur('state')}
                    value={values.state}
                  />
                </Animated.View>
                {touched.state && errors.state && (
                  <Text style={styles.errorText}>{errors.state}</Text>
                )}
              </>
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
                  placeholder="example@email.com"
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
                  keyboardType="number-pad"
                />
              </Animated.View>
              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>{errors.phone}</Text>
              )}
            </View>
            <>
              <Animated.View style={[styles.inputWrapper2]}>
                <CountryPicker onSelect={e => onSelect(e.name)} />
                {country && (
                  <Text style={styles.span}>Selected Country Is {country}</Text>
                )}
              </Animated.View>
              {countryError == true && (
                <Text style={styles.errorText}>Select A Country Please</Text>
              )}
            </>

            <ButtonLoader
              title={'Register'}
              handleSubmit={handleSubmit}
              loading={loading}
              errorMsg={requestError}
            />

            {/* <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              {loading === true ? (
                <>
                  <ActivityIndicator size={'large'} />
                </>
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
            {requestError && (
                <Text style={styles.errorText}>{requestError}</Text>
              )} */}
          </>
        )}
      </Formik>
    </KeyboardAwareScrollView>
  );
};

export default BusinessSignUp;

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
    marginVertical: 5,
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
  modalText: {
    color: 'black',
  },
});
