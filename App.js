import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./screens/Home";
import Maps from "./screens/Maps";
import Login from "./screens/Login";
import Sign_up from "./screens/Sign_up";
import Find_id from "./screens/Find_id";
import Find_pw from "./screens/Find_pw";
import New_pw from "./screens/New_pw";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Home" component={Home} options={{ title: '홈' }} />
        <Stack.Screen name="Maps" component={Maps} options={{ title: '맵' }} />
        <Stack.Screen name="Login" component={Login} options={{ title: '로그인' }} />
        <Stack.Screen name="Sign_up" component={Sign_up} options={{ title: '회원가입' }} />
        <Stack.Screen name="Find_id" component={Find_id} options={{ title: '아이디 찾기' }} />
        <Stack.Screen name="Find_pw" component={Find_pw} options={{ title: '비밀번호 찾기' }} />
        <Stack.Screen name="New_pw" component={New_pw} options={{ title: '비밀번호 변경' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}