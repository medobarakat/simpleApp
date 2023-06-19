import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// the screens
import Home from '../screens/Home';
import Signup from '../screens/Auth/SignUp';
import BusinessSignUp from '../screens/Auth/BusinessSignUp';
import Quick from '../screens/Auth/Quick';
import Login from '../screens/Auth/Login';


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
      <Stack.Screen name="Signup" component={Signup} 
       options={{
        title:"Full Registration",
        headerTransparent:false,
        headerTitleAlign: 'center',
      }}
      />
      <Stack.Screen name="BusinessSignup" component={BusinessSignUp} 
       options={{
        title:"Business Registration",
        headerTransparent:false,
        headerTitleAlign: 'center',
      }}
      />
      <Stack.Screen name="quick" component={Quick}
       options={{
        title:"Email Register",
        headerTransparent:true,
        headerTitleAlign: 'center',
      }} />
      <Stack.Screen name="login" component={Login}
       options={{
        title:"Login",
        headerTransparent:true,
        headerTitleAlign: 'center',
        headerShown:false
      }} />
    </Stack.Navigator>
  );
};

export default LoginNavigation;
