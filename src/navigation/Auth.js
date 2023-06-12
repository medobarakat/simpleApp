import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import SignUp from "../screens/SignUp";
// the screens


const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Signup" component={SignUp} />
        </Stack.Navigator>
    );
};

export default LoginNavigation;

