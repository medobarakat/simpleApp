import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import SignUp from '../screens/SignUp';
import Quick from '../screens/Quick';
// the screens

const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Signup" component={SignUp} 
       options={{
        title:"Business Registration",
        headerTransparent:false,
        headerTitleAlign: 'center',
      }}
      />
      <Stack.Screen name="quick" component={Quick}
       options={{
        title:"Quick Registration",
        headerTransparent:true,
        headerTitleAlign: 'center',
      }} />
    </Stack.Navigator>
  );
};

export default LoginNavigation;
