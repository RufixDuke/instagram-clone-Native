import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Homescreen from "./screens/Homescreen";
import NewPost from "./screens/NewPost";
import LoginForm from "./screens/LoginForm";
import SignUpForm from "./screens/SignUpForm";
import React from "react";

const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false,
};

export const MyStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="Homescreen"
            screenOptions={screenOptions}
        >
            <Stack.Screen name="Homescreen" component={Homescreen} />
            <Stack.Screen name="NewPost" component={NewPost} />
        </Stack.Navigator>
    </NavigationContainer>
);

export const SignedOutStack = () => (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="LoginForm"
            screenOptions={screenOptions}
        >
            <Stack.Screen name="LoginForm" component={LoginForm} />
            <Stack.Screen name="SignUpForm" component={SignUpForm} />
        </Stack.Navigator>
    </NavigationContainer>
);
