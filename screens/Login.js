import React, { useState } from 'react'
import axios from 'axios'
import { CommonActions } from '@react-navigation/native';

import {
   SafeAreaView,
   TextInput,
   TouchableOpacity,
   Text,
   StyleSheet,
   View,
   Image,
   Alert,
} from 'react-native'
import {KeyboardAvoidingView} from 'react-native';
//import AutoHeightImage from "react-native-auto-height-image";

const Login = ({ navigation }) => {
   const [user_id, setUser_id] = useState('');
   const [user_pw, setUser_pw] = useState('');

   const handleLogin = async () => {
      console.log(user_id);
      console.log(user_pw);
      if (!user_id || !user_pw) {
         Alert.alert('알림', '아이디와 비밀번호를 모두 입력해주세요.');
         return; // 함수 종료
      }
      await axios.post('http://10.0.2.2:3000/login', {
         user_id: user_id,
         user_pw: user_pw,
      })
         .then((response) => {
            console.log(response.data.user_name);
            if (response.data.success) {
               navigation.dispatch(
                  CommonActions.reset({
                     index: 0,
                     routes: [
                       { name: 'Home', params: { user_id, user_name: response.data.user_name } }, // 'Home' 화면으로 이동
                     ],
                   })
                );
            }
            if (response.data.msg == "존재하지 않는 아이디입니다.") {
               Alert.alert('알림', "존재하지 않는 아이디입니다.");
            }
            else if (response.data.msg == "비밀번호가 틀렸습니다.") {
               Alert.alert('알림', "비밀번호가 틀렸습니다.");
            }
         })
         .catch((error) => {
            console.log(error);
         });
   };


   return (
      <SafeAreaView style={styles.container}>
         <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 20 }}>
            <Image
               // style={{ marginLeft: 75 }}
               source={require('../assets/images/tmans.png')}></Image>
         </View>
         <View style={styles.inputContainer}>
         <KeyboardAvoidingView style={styles.inputBox} behavior="padding" enabled>
               <TextInput
                  placeholder={'아이디'}
                  value={user_id}
                  onChangeText={(text) => setUser_id(text)}
               />
            </KeyboardAvoidingView>
            <View style={styles.inputBox}>
               <TextInput
                  placeholder={'비밀번호'}
                  value={user_pw}
                  onChangeText={(text) => setUser_pw(text)}
                  secureTextEntry={true}
               />
            </View>
         </View>
         <View style={{ flex: 1 }}>
            <View style={{
               flex: 1,
               flexDirection: 'row',
               justifyContent: 'center',
            }}>
               <TouchableOpacity onPress={() => navigation.navigate('Sign_up')} style={styles.find_button}>
                  <Text style={{ fontWeight: '500' }}>회원가입</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('Find_id')} style={styles.find_button}>
                  <Text style={{ fontWeight: '500' }}>아이디 찾기</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('Find_pw')} style={styles.find_button}>
                  <Text style={{ fontWeight: '500' }}>비밀번호 찾기</Text>
               </TouchableOpacity>
            </View>
            <View style={{ flex: 1, padding: 20 }}>
               <TouchableOpacity onPress={handleLogin} style={styles.button}>
                  <Text style={{
                     color: 'white',
                     fontSize: 15,
                     fontWeight: '400',
                     padding: 15,
                  }}
                  >로그인</Text>
               </TouchableOpacity>
            </View>
         </View>
         <View style={{ flex: 1 }}>
            <View style={{ flex: 2 }}>

            </View>
         </View>

      </SafeAreaView>
   )
}



const styles = StyleSheet.create({
   container: {
      flex: 1,
      //justifyContent: 'center', // 가로 정렬
      //alignItems: 'center', //세로정렬
      backgroundColor: 'white',
   },

   button: {
      alignItems: 'center',
      backgroundColor: 'blue',
      borderRadius: 10,
   },

   find_button: {
      justifyContent: 'center',
      alignContent: 'center',
      backgroundColor: 'white',
      padding: 20,
   },
   inputContainer: {
      paddingHorizontal: 30,
      marginTop: 5,
   },
   inputBox: {
      marginBottom: 5,
      borderColor: 'grey',
      borderWidth: 1,
      borderRadius: 5,
      padding: 4,
      height: 50,
   },
   image: {
      width: '100%',
      height: 500,
   },

});



export default Login