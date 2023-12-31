import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {Box, Button, Input, Modal} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import {Base_Url, Register_Api} from '../../constants/Apis';
import {ActivityIndicator} from 'react-native';
import ButtonLoader from '../../Components/ButtonLoader';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const Quick = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const handleFormSubmit = values => {
    setError("")
    setLoading(true);
    const url = Base_Url + Register_Api;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = {
      "email": values.email,
      "registrationType": 'EMAIL',
    };

    console.log("body is ",body)
    console.log("headers is" , config)
    axios
      .post(url, body, config)
      .then(res => {
        console.log(res);
        setModalVisible(true);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err.response.data[0].message);
        //console.warn(err.response.data[0].message);
        console.warn(err)
        setError(err.response.data[0].message);
      });
  };

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {/* start of the modal */}
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Header>Success!</Modal.Header>
          <Modal.Body>
            <Text style={styles.modalText}>
            Your Information Was Registered
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onPress={() => {
                setModalVisible(false);
                navigation.replace('Home');
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {/* end of the modal */}
      <View style={styles.formWrapper}>
        <Box marginBottom={75}>
          <View style={styles.titleWrapper}>
            <Icon name="closecircleo" size={35} />
            <Text style={styles.titleText}>App Board</Text>
          </View>

          {/* <Text style={styles.DescText}>Quick Registration With Email</Text> */}
        </Box>
        <Formik
          initialValues={{email: ''}}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <>
              <Box>
                <Text style={styles.span}>Email</Text>
                <Input
                  borderRadius={20}
                  height={50}
                  placeholder="example@email.com"
                  w="80%"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  errorBorderColor="red"
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </Box>
              <ButtonLoader title={"Register"} handleSubmit={handleSubmit} loading={loading} errorMsg={error}/>
             
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
  },
  DescText: {
    fontSize: 16,
    color: 'black',
  },
  span: {
    marginBottom: 20,
    color: 'black',
  },
  button: {
    backgroundColor: '#111b31',
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
    marginTop: 15,
  },
  modalText:{
    color:"black"
  }
});

export default Quick;
