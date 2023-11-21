import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from 'react-native';

const Chat = ({navigation, route}) => {
  const {user_id, room} = route.params
    return (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Text style={styles.header}>Header</Text>
              <Text style={user_id}>Header</Text>
              <Text style={room.room_number}>Header</Text>
              <TextInput placeholder="Username" style={styles.textInput} />
              <View style={styles.btnContainer}>
                <Button title="Submit" onPress={() => null} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      inner: {
        padding: 24,
        flex: 1,
        justifyContent: 'space-around',
      },
      header: {
        fontSize: 36,
        marginBottom: 500,
      },
      textInput: {
        height: 40,
        borderColor: '#000000',
        borderBottomWidth: 1,
        marginBottom: 36,
      },
      btnContainer: {
        backgroundColor: 'white',
        marginTop: 12,
      },
});

export default Chat;


// server.js
// import {io} from "socket.io-client"


// import React, { useState, useEffect } from 'react';
// import { 
//     View, 
//     Text, 
//     StyleSheet, 
//     SafeAreaView,
//     ScrollView, 
//     Image,
//     StatusBar,
//     TextInput
//  } from 'react-native';
// import axios from 'axios';
// import { format } from 'date-fns';
// import ko from "date-fns/esm/locale/ko/index.js";
// import { TouchableOpacity } from 'react-native-gesture-handler';

// const  Jh_chat= ({navigation, route}) => {
//   const { user_id } = route.params;
//   const { user_name } = route.params;
//   const { room } = route.params;
//   const socket = io.connect('http://localhost:3000')
//   const [token,settoken] = useState('')
//   const [messageList, setMessageList]=useState([])

  

//   // const sendMessage=()=>{
//   //   socket.emit("sendMessage", message)
//   // }



//   const sendMessage = (user_id, room_number, token) => {
//     const data = {
//       user_id: user_id, //중괄호 하는지
//       room_number: room_number,
//       token: token,
//     }
//     socket.emit('sendMessage', data);
//   }

//   useEffect(()=>{
//     //socket.emit("login", usename)
//     socket.on('message',(token)=>{
//       setMessageList((prevState)=>prevState.concat(token))
//     })
//   },[])

  
//     return (
//         <SafeAreaView style={{ flex: 1, backgroundColor: '#9bbbd4' }}>
//           {/* <Text>{user_id}</Text>
//           <Text>{room.user4}</Text>
//           <Text>{room.user2}</Text>
//           <Text>{room.user3}</Text> */}
//           <View style={{ flex: 6 }}></View>
//           <View style={{ flex: 1, flexDirection: 'row' }}>
//             <TextInput
//               style={styles.chat_view}
//               placeholder="CHAT"
//               value = {token}
//               onChange={(Event) => settoken(Event.target.value)}
//             />
//             <TouchableOpacity
//               onPress={sendMessage}
//               type="submit"
//             >
//               <Image
//                 source={require('../assets/images/send.png')}
//                 style={{ height: 35, width: 35, marginTop: 4, marginLeft: 20 }}
//               />
//             </TouchableOpacity>
//           </View>
//           <View style={styles.render_chat}>
//           </View>
//         </SafeAreaView>
//       );
// }

// const styles = StyleSheet.create({
//     goto:{
//         marginTop:20,
//         marginBottom:20,
//         borderRadius: 7, 
//         borderWidth:2,
//         borderColor:'black',
//         backgroundColor:'white',
//     },
//     my_chat_container:{
//       display:'flex',
//       justifyContent:'flex-end',
//       marginBottom:5,
//     },
//     my_chat:{
//         maxWidth:200,
//         padding:8,
//         fontSize:12,
//         color:"black",
//         borderRadius: 8, 
//         borderWidth:1,
//         backgroundColor:'#f7e600',
//     },
//     you_chat_container:{
//       display:'flex',
//       justifyContent:'flex-start',
//       alignItems:'center',
//     },
//     you_chat:{
//         padding:8,
//         fontSize:12,
//         color:"black",
//         borderRadius: 8, 
//         maxWidth:200,
//         backgroundColor:'white',
//     },
//     profile_image:{
//       width:38,
//       height:38,
//       borderRadius:100,
//       fontSize:12,
//       marginRight:10,
//     },
//     chat_view:{
//         marginLeft:15,
//         height:45,
//         borderRadius: 15, 
//         borderWidth:2, 
//         borderColor:'black',
//         backgroundColor:'white', 
//         width:'75%'
//     },
//     render_chat: {
//         flex: 1,
//         padding: 20,
//     },
//     system_message:{
//       backgroundColor:'#55667758',
//       borderRadius:100,
//       textAlign:'center',
//       color:'white',
//       fontSize:14,
//       padding:2,
//       display:'flex',
//       justifyContent:'center',
//       alignItems:'center',
//     },


// })

// export default Jh_chat;