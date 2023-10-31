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
    Alert,
} from 'react-native'
import { Picker } from '@react-native-picker/picker';

const Find_id = ({ navigation }) => {
    const [user_name, setUser_name] = useState('');
    const [user_question, setUser_question] = useState('졸업한 중학교는?');
    const [user_answer, setUser_answer] = useState('');

    const handleFindID = async () => {
        if (!user_name || !user_question || !user_answer) {
           Alert.alert('알림', '모두 입력해주세요.');
           return; // 함수 종료
        }
        await axios.post('http://10.0.2.2:3000/find_id', {
           user_name: user_name,
           user_question: user_question,
           user_answer: user_answer,
        })
           .then((response) => {
              console.log(response.data);
              if (response.data.success) {
                Alert.alert("알림", `찾으시는 아이디는 ${response.data.user_id} 입니다.`)
                 navigation.navigate('Login');
              }
              if (response.data.msg == "일치하는 정보를 찾을 수 없습니다.") {
                 Alert.alert('알림', "일치하는 정보를 찾을 수 없습니다.");
              }
           })
           .catch((error) => {
              console.log(error);
           });
     };
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'flex-end',alignItems:'center', paddingBottom: 20 }}>
                <Image
                    // style={{ marginLeft: 75 }}
                    source={require('../assets/images/tmans.png')}>
                </Image>
            </View>
            <View style={styles.inputContainer}>
                <Text style={{ color: 'black', paddingBottom: 10 }}>이름 *</Text>
                <View style={styles.inputBox}>
                    <TextInput
                        onChangeText={(text) => setUser_name(text)}
                        placeholder={'이름을 입력해 주세요.'}
                        value={user_name}
                    />
                </View>
            </View>
            <View style={{ paddingLeft: 30, paddingRight: 30 }}>
                <Text style={{ color: 'black', fontSize: 15, fontWeight: '500' }}>질문 *</Text>
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
                        selectedValue={user_answer}
                    // underlineColorAndroid={'grey'}
                    />
                </View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'center' }}>
                <Text style={{ color: 'grey' }}>아이디가 없으신가요?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Sign_up')} style={{ backgroundColor: 'white' }}>
                    <Text style={{ fontWeight: '800' }}>    회원가입</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>
            <TouchableOpacity onPress={handleFindID} style={styles.button}>
                  <Text style={{
                     color: 'white',
                     fontSize: 15,
                     fontWeight: '400',
                     padding: 15,
                  }}
                  >아이디 찾기</Text>
               </TouchableOpacity>
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



export default Find_id