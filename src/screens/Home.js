import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from "../icons/Icon"
const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.firstSection}></View>
      <View style={styles.secondSection}>
        <Icon />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  firstSection: {
    backgroundColor: '#111b31',
    height: 300, 
    borderBottomRightRadius: 130,
    borderBottomLeftRadius:130,
    borderColor: '#111b31', 
  },
});
