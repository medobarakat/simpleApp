import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,Dimensions
} from 'react-native';
import {Primary_color, Sec_color} from '../constants/Colors';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const ButtonLoader = ({title, handleSubmit, loading, errorMsg}) => {
  return (
    <>
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        {loading === true ? (
          <>
            <ActivityIndicator size={'large'} />
          </>
        ) : (
          <Text style={styles.buttonText}>{title}</Text>
        )}
      </TouchableOpacity>
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}
    </>
  );
};

export default ButtonLoader;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Sec_color,
    height: 50,
    width: width / 1.4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 35,
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    marginVertical: 5,
  },
});
