import 'react-native-gesture-handler';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Auth from './src/navigation/Auth';
import {NativeBaseProvider, Box} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Auth />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
