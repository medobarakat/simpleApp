import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// the screens
import BusinessSignUp from '../screens/Auth/BusinessSignUp';



const Stack = createNativeStackNavigator();

const BusinessSignUpNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="BusinessSignup1">
      <Stack.Screen name="BusinessSignup1" component={BusinessSignUp} 
       options={{
        title:"Business Registration",
        headerTransparent:false,
        headerTitleAlign: 'center',
      }}
      />
     
    </Stack.Navigator>
  );
};

export default BusinessSignUpNavigation;
