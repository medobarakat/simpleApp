import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import  Auth from "./src/navigation/Auth"
const App = () => {
  return (
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})