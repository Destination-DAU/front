import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import Maps from "./screens/Maps";
import Login from "./screens/Login";
import Sign_up from "./screens/Sign_up";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Home" component={Home} options={{ title: '홈' }} />
        <Stack.Screen name="Maps" component={Maps} options={{ title: '맵' }} />
        <Stack.Screen name="Login" component={Login} options={{ title: '로그인' }} />
        <Stack.Screen name="Sign_up" component={Sign_up} options={{ title: '회원가입' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}