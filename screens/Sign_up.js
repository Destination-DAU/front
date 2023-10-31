import React, { useState } from 'react'
import axios from 'axios'

import {
   SafeAreaView,
   TextInput,
   TouchableOpacity,
   Text,
   StyleSheet,
   View,
   Image,
   ScrollView,
   Alert,
} from 'react-native'
import { Picker } from '@react-native-picker/picker';

const Sign_up = ({ navigation }) => {
   const [pickerValue, setPickerValue] = useState('');
   const [user_id, setUser_id] = useState('');
   const [user_pw, setUser_pw] = useState('');
   const [user_name, setUser_name] = useState('');
   const [user_gender, setUser_gender] = useState('남');
   const [user_question, setUser_question] = useState('졸업한 중학교는?');
   const [user_answer, setUser_answer] = useState('');
   const [confirmPsword, setUser_confirmPsword] = useState('');
   const [user_phoneNumber, setUser_phoneNumber] = useState('');


   const handleSignUp = async () => {
      console.log(user_id);
      console.log(user_pw);
      if (!user_id || !user_pw || !user_name || !user_gender || !user_question || !user_answer || !confirmPsword || !user_phoneNumber) {
         Alert.alert('알림', '모두 입력해주세요.');
         return; // 함수 종료
      }
      if (user_pw !== confirmPsword) {
         Alert.alert('알림', '비밀번호가 일치하지 않습니다.');
         return; // 함수 종료
      }
      await axios.post('http://10.0.2.2:3000/sign_up', {
         user_name: user_name,
         user_id: user_id,
         user_pw: user_pw,
         user_gender: user_gender,
         user_question: user_question,
         user_answer: user_answer,
         user_phoneNumber: user_phoneNumber,
      })
         .then((response) => {
            console.log(response.data);
            if (response.data.success) {
               Alert.alert('알림', "회원가입이 완료되었습니다.")
               navigation.navigate('Login');
            }
            console.log(response.data.success);
            if (response.data.msg == "이미 존재하는 아이디 입니다.") {
               Alert.alert('알림', "이미 존재하는 아이디 입니다.");
            }
         })
         .catch((error) => {
            console.log(error);
         });
   };


   return (
      <SafeAreaView style={styles.container}>
         <ScrollView>
            <View style={{ flex: 1, justifyContent: 'flex-end', paddingTop: 10 }}>
               <Image
                  style={{ marginLeft: 75 }}
                  source={require('../assets/images/tmans.png')}></Image>
            </View>
            <View style={styles.inputContainer}>
               <Text style={{ color: 'black', paddingBottom: 10 }}>이름 *</Text>
               <View style={styles.inputBox}>
                  <TextInput
                     onChangeText={(text) => setUser_name(text)}
                     placeholder={'이름을 입력해 주세요.'}
                     // underlineColorAndroid={'grey'}
                     value={user_name}
                  //numberOfLines={}
                  />
               </View>
               <Text style={{ color: 'black', paddingBottom: 10 }}>아이디 *</Text>
               <View style={styles.inputBox}>
                  <TextInput
                     placeholder={'아이디를 입력해 주세요.'}
                     // underlineColorAndroid={'grey'}
                     value={user_id}
                     onChangeText={(text) => setUser_id(text)}
                     style={{ flex: 1 }}
                  />
               </View>
               <Text style={{ color: 'black', paddingBottom: 10 }}>비밀번호 *</Text>
               <View style={styles.inputBox}>
                  <TextInput
                     onChangeText={(text) => setUser_pw(text)}
                     placeholder={'비밀번호'}
                     value={user_pw}
                     // underlineColorAndroid={'grey'}
                     secureTextEntry={true}
                  />
               </View>
               <Text style={{ color: 'black', paddingBottom: 10 }}>비밀번호 확인 *</Text>
               <View style={styles.inputBox}>
                  <TextInput
                     onChangeText={(text) => setUser_confirmPsword(text)}
                     placeholder={'비밀번호 확인'}
                     value={confirmPsword}
                     // underlineColorAndroid={'grey'}
                     secureTextEntry={true}
                  />
               </View>
               <Text style={{ color: 'black', paddingBottom: 10 }}>성별 *</Text>
               <View style={[styles.radioContainer, { flexDirection: 'row' }]}>
                  <TouchableOpacity
                     style={[
                        styles.radioOption,
                        user_gender === '남' && styles.radioSelected,
                     ]}
                     onPress={() => setUser_gender('남')}
                  >
                     <Text style={[styles.radioText, user_gender === '남' && styles.radioTextSelected]}>남자</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     style={[
                        styles.radioOption,
                        user_gender === '여' && styles.radioSelected,
                     ]}
                     onPress={() => setUser_gender('여')}
                  >
                     <Text style={[styles.radioText, user_gender === '여' && styles.radioTextSelected]}>여자</Text>
                  </TouchableOpacity>
               </View>
               {/* <TextInput
                  onChangeText={(text) => setUser_gender(text)}
                  placeholder={'성별'}
                  value={user_gender}
               underlineColorAndroid={'grey'}
               /> */}
            </View>
            <View style={{ paddingLeft: 30, paddingRight: 30 }}>
               <Text style={{ color: 'grey', fontSize: 15, fontWeight: '500' }}>QUESTION</Text>
               <Picker
                  selectedValue={user_question}
                  onValueChange={(itemValue) => setUser_question(itemValue)}
               >
                  <Picker.Item label="졸업한 중학교는?" value="졸업한 중학교는?" />
                  <Picker.Item label="아버지 성함은?" value="아버지 성함은?" />
                  <Picker.Item label="태어난 지역은?" value="태어난 지역은?" />
               </Picker>
               <View style={styles.inputBox}>
                  <TextInput
                     onChangeText={(text) => setUser_answer(text)}
                     placeholder={'답변'}
                  // underlineColorAndroid={'grey'}
                  />
               </View>

               <Text style={{ color: 'black', paddingBottom: 10 }}>전화번호 *</Text>
               <View style={styles.inputBox}>
                  <TextInput
                     onChangeText={(text) => setUser_phoneNumber(text)}
                     placeholder={'010-1111-2222'}
                  // underlineColorAndroid={'grey'}
                  />
               </View>
               <View style = {{marginBottom: 10}}></View>
               <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                  <Text style={{
                     color: 'white',
                     fontSize: 15,
                     fontWeight: '400',
                     padding: 15,
                  }}
                  >회원가입</Text>
               </TouchableOpacity>
               <View style = {{marginBottom: 20}}></View>
            </View>
            <View >
               <View >

               </View>
               {/* <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ color: 'grey' }}>You have an account?</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ backgroundColor: 'white' }}>
                     <Text style={{ fontWeight: '800' }}>    Sign in</Text>
                  </TouchableOpacity>
               </View> */}
            </View>
         </ScrollView>
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
      marginTop: 5, // 입력란과 이전 요소 사이에 간격을 추가합니다.
   },
   inputBox: {
      marginBottom: 5,
      borderColor: 'grey', // 입력란의 테두리 색상을 정의합니다.
      borderWidth: 1, // 입력란의 테두리 두께를 정의합니다.
      borderRadius: 5, // 입력란의 모서리를 둥글게 만듭니다.
      padding: 4, // 입력란의 안쪽 여백을 설정합니다.
      height: 50,
   },
   radioContainer: {
      justifyContent: 'space-between', // 여기서 변경하여 간격을 맞출 수 있습니다.
      marginBottom: 10,
   },
   radioOption: {
      flex: 1, // 이 부분을 조절하여 하나의 줄에 나오도록 만들 수 있습니다.
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      width: 150,
      borderWidth: 1,
      borderColor: 'grey',
      borderRadius: 5,
      marginRight: 5,
   },
   radioSelected: {
      backgroundColor: 'blue', // 선택된 항목의 배경색을 파란색으로 설정합니다.
   },
   radioText: {
      color: 'black',
   },
   radioTextSelected: {
      color: 'white', // 선택된 항목의 텍스트 색상을 하얀색으로 설정합니다.
   },
});



export default Sign_up