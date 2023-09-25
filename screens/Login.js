import React, { useState } from 'react'
import axios from 'axios'

// import {
//    widthPercentageToDP as wp,
//    heightPercentageToDP as hp,
//  } from 'react-native-responsive-screen';

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

//import AutoHeightImage from "react-native-auto-height-image";

const Login = ({ navigation }) => {
   const [user_id, setUser_id] = useState('');
   const [user_pw, setUser_pw] = useState('');

   const handleLogin = async() => {
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
        console.log(response.data);
        if(response.data.success){
          navigation.navigate('Home');
        }
         if(response.data.msg == "존재하지 않는 아이디입니다."){
            Alert.alert('알림',"존재하지 않는 아이디입니다.");
         }
         else if(response.data.msg == "비밀번호가 틀렸습니다."){
            Alert.alert('알림',"비밀번호가 틀렸습니다.");
         }
      })
      .catch((error) => {
        console.log(error);
      });
    };


   return (
      <SafeAreaView style={styles.container}>
         <View style={{flex:1, justifyContent:'flex-end', alignItems:'center',paddingBottom:20}}>
            <Text style={{color:'black', fontSize:33, fontWeight: '400'}}>
               Welcome Back,
               </Text>
            <Text style={{color:'grey', fontSize:22, fontWeight: '500'}}>Sign in to continue</Text>
         </View>
         <View style={{flex:1, padding:30}}>
         <TextInput
          placeholder={'ID'}
          underlineColorAndroid={'grey'}
          value={user_id}
          onChangeText={(text) => setUser_id(text)}
        />
         <TextInput
          placeholder={'Password'}
          underlineColorAndroid={'grey'}
          value={user_pw}
          onChangeText={(text) => setUser_pw(text)}
          secureTextEntry={true}
        />
         </View>
         <View style={{flex:1}}>
            <View style={{
               flex:1, 
               flexDirection:'row', 
               justifyContent:'center',
               }}>
               <TouchableOpacity onPress={() => navigation.navigate('find_id')} style = {styles.find_button}>
                  <Text style={{fontWeight:'500'}}>아이디 찾기</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() => navigation.navigate('find_pw')} style = {styles.find_button}>
                  <Text style={{fontWeight:'500'}}>비밀번호 찾기</Text>
               </TouchableOpacity>
            </View>
            <View style={{flex:1, padding:20 }}>
            <TouchableOpacity onPress={handleLogin} style = {styles.button}>
                  <Text style={{
                     color:'white', 
                     fontSize:15, 
                     fontWeight: '400', 
                     padding:15,
                  }}
                  >Sign in</Text>
               </TouchableOpacity>
            </View>
         </View>
         <View style={{flex:1}}>
            <View style={{flex:2}}>

            </View>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
               <Text style={{color:'grey'}}>Don't have an account?</Text>
               <TouchableOpacity onPress={() => navigation.navigate('sign_up')} style = {{backgroundColor:'white'}}>
                     <Text style={{fontWeight:'800'}}>    Sign up</Text>
               </TouchableOpacity>
            </View>
         </View>

      </SafeAreaView>
   )
}



const styles = StyleSheet.create({
   container: {
      flex:1,
      //justifyContent: 'center', // 가로 정렬
      //alignItems: 'center', //세로정렬
      backgroundColor: 'white',
   },

   button: {
      alignItems: 'center',
      backgroundColor: 'black',
      borderRadius:10,
   },

   find_button:{
      justifyContent:'center',
      alignContent:'center',
      backgroundColor:'white',
      padding:20,
   },



});



export default Login