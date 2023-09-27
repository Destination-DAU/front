import React, { useState } from 'react'
import Find_pw from "./Find_pw";
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

const New_pw = ({ navigation, route }) => {
    const [user_pw, setUser_pw] = useState('');
    const [confirmPsword, setUser_confirmPsword] = useState('');
    const { user_id } = route.params;

    const handleNewpw = async () => {
        if (!user_pw || !confirmPsword) {
            Alert.alert('알림', '모두 입력해주세요.');
            return; // 함수 종료
        }
        if (user_pw != confirmPsword) {
            Alert.alert('알림', '비밀번호가 일치하지 않습니다.')
            return;
        }
        await axios.post('http://10.0.2.2:3000/new_pw', {
            user_id: user_id,
            user_pw: user_pw,
        })
            .then((response) => {
                console.log(response.data);
                if (response.data.success) {
                    Alert.alert("알림", `비밀번호가 성공적으로 변경되었습니다.`)
                    navigation.navigate('Login');
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
                    source={require('../assets/images/tmans.png')}>
                </Image>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.inputBox}>
                    <TextInput
                        onChangeText={(text) => setUser_pw(text)}
                        placeholder={'비밀번호'}
                        value={user_pw}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        onChangeText={(text) => setUser_confirmPsword(text)}
                        placeholder={'비밀번호 확인'}
                        value={confirmPsword}
                        secureTextEntry={true}
                    />
                </View>
            </View>
            <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>
                <TouchableOpacity onPress={handleNewpw} style={styles.button}>
                    <Text style={{
                        color: 'white',
                        fontSize: 15,
                        fontWeight: '400',
                        padding: 15,
                    }}
                    >비밀번호 변경</Text>
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
        backgroundColor: 'black',
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



export default New_pw