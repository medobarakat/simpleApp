import {Box, Input} from 'native-base';
import React from 'react';
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
  const onPressHandler = () => {
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
        <View>
          <View>
            <Box marginLeft={10} marginBottom={5}>
              <Text>Quick Registration</Text>
            </Box>
            <Box alignItems="center">
              <Input placeholder="Input" w="80%" />
            </Box>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity onPress={onPressHandler} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
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
    height: 300,
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
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
