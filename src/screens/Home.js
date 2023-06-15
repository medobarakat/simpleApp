import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Home = ({navigation}) => {
  const onPressEmailHandler = () => {
    navigation.navigate('quick');
  };
  const onPressSignUpHandler = () => {
    navigation.navigate('Signup');
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={-100}>
      <View style={styles.firstSection}>
        <View style={styles.iconWrapper}>
          <Icon name="closecircleo" size={70} />
        </View>
      </View>
      <View style={styles.secondSection}>
        <Text style={styles.secondSectiontxt}>App Board</Text>
        <View style={{marginTop: height / 30, alignItems: 'center'}}>
          <TouchableOpacity onPress={onPressEmailHandler} style={styles.button}>
            <Text style={styles.buttonText}>Email Registration</Text>
          </TouchableOpacity>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={onPressSignUpHandler} style={styles.button}>
              <Text style={styles.buttonText}>Full Registration</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={onPressSignUpHandler} style={styles.button}>
              <Text style={styles.buttonText}>Business Registration</Text>
            </TouchableOpacity>
            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={onPressSignUpHandler} style={styles.button2}>
              <Text style={styles.buttonText}>Account Login</Text>
            </TouchableOpacity>
          </View>
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
    fontSize: 28,
  },
  btnContainer: {
    // marginTop: height / 19,
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
  button2:{
    backgroundColor:"#0e7490",
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
