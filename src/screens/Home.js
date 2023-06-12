import {Box, Input} from 'native-base';
import React, {useRef, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/AntDesign';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const Home = ({navigation}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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
      <Animated.View style={[styles.secondSection, {opacity: fadeAnim}]}>
        <Text style={styles.secondSectiontxt}>App Board</Text>
        <View style={{marginTop: height / 14}}>
          <View>
            <Box marginLeft={10} marginBottom={5}>
              <Text>Quick Registration</Text>
            </Box>
            <Box alignItems="center">
              <Input placeholder="Type Your Email" w="80%" />
            </Box>
          </View>
          <View style={styles.btnContainer}>
            <Text>OR</Text>
            <TouchableOpacity onPress={onPressHandler} style={styles.button}>
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
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
    marginTop: height / 26,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
