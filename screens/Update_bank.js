import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput,    Alert, } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import ko from "date-fns/esm/locale/ko/index.js";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';
import { KeyboardAvoidingView } from 'react-native';

const Update_bank = ({ navigation, route }) => {
    const user_id = route.params.user_id;
    const myData = route.params.myData;
    const [users_bank, setUsers_bank] = useState(null);
    const [users_bnum, setUsers_bnum] = useState(null);


    const save = async () => {

        if (!users_bank || !users_bnum) {
            Alert.alert('알림', '은행과 계좌번호를 모두 입력해주세요.');
            return; // 함수 종료
         }
        await axios.post('http://10.0.2.2:3000/Update_bank', {
            user_bank: users_bank,
            user_bnum: users_bnum,
            user_id: user_id,
        })
            .then((response) => {
                // console.log(users_bank);
                if (response.data.success) {
                    // console.log(response.data)
                    Alert.alert('알림', '정상적으로 변경이 완료되었습니다');
                    navigation.dispatch(
                          CommonActions.reset({
                             index: 0,
                             routes: [
                                { name: 'My', params: { user_id, myData: [{ ...myData[0], user_bank: users_bank, user_bnum: users_bnum }] } },
                             ],
                           })
                        );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Text1}>
                은행과 계좌번호를 설정해 주세요.
            </Text>
            <Text style={styles.Text2}>
                은행을 설정하여 서비스를 이용해보세요!
            </Text>
            <Text style = {{ marginLeft: 30, fontSize: 13, marginTop: 10}}>
                은행과 계좌번호를 통해 더욱 간편하게 정산을 할 수 있습니다.
            </Text>

            <View style={styles.container2}>
                <View style={styles.container3}>
                    <Image
                        style={styles.locationIcon}
                        source={require('../assets/images/profile.png')}
                    />
                </View>
                <View style = {{marginTop: 40}}></View>
                <View style={styles.inputBox}>
                    <TextInput
                        placeholder="ex) 국민은행, 농협은행, 카카오뱅크 등"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setUsers_bank(text)}
                    />
                </View>
                <View style = {{marginTop: 20}}></View>
                <KeyboardAvoidingView behavior = 'height' style={styles.inputBox}>
                    <TextInput
                        placeholder="계좌번호를 입력해주세요."
                        placeholderTextColor="gray"
                        onChangeText={(text) => setUsers_bnum(text)}
                    />
                </KeyboardAvoidingView>
            </View>
            <View style = {{marginTop: 140}}>
            <TouchableOpacity onPress={save} style={styles.button}>
                <Text style={{
                    color: 'white',
                    fontSize: 15,
                    fontWeight: '400',
                    padding: 15,
                }}
                >저장하기</Text>
            </TouchableOpacity>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    container2: {
        // flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    container3: {
        // flexDirection: "row",
        // backgroundColor: "red",
        width: 60,  // 원 모양의 가로 크기
        height: 60,  // 원 모양의 세로 크기
        backgroundColor: "rgb(248, 248, 248)",
        borderRadius: 30,
        // borderWidth: 1,
        borderColor: "rgb(235, 235, 235)",
        marginTop: 40,
    },
    Text1: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginLeft: 30,
        marginTop: 80,
    },
    Text2: {
        fontSize: 13,
        marginLeft: 30,
        marginTop: 30,
    },
    locationIcon: {
        width: 60,
        height: 60,
    },
    inputBox: {
        borderColor: 'grey',
        borderRadius: 5,
        padding: 4,
        height: 50,
        width: "84%",
        marginRight: 10,
        backgroundColor: "rgb(240, 240, 240)",
    },
    button: {
        alignItems: 'center',
        borderColor: "rgb(200, 200, 200)",
        borderRadius: 10,
        borderWidth: 1,
        marginLeft: 20,
        marginBottom: 20,
        backgroundColor: "blue",
        width: "90%",
    },
});

export default Update_bank;
