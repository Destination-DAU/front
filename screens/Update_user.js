import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput,    Alert, } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import ko from "date-fns/esm/locale/ko/index.js";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonActions } from '@react-navigation/native';

const Update_user = ({ navigation, route }) => {
    const user_id = route.params.user_id;
    const myData = route.params.myData;
    const [users_name, setUser_name] = useState();

    const save = async () => {
        await axios.post('http://10.0.2.2:3000/Update_user', {
            user_name: users_name,
            user_id: user_id,
        })
            .then((response) => {
                // console.log(users_name);
                if (response.data.success) {
                    // console.log(response.data)
                    Alert.alert('알림', '정상적으로 변경이 완료되었습니다');
                    navigation.dispatch(
                          CommonActions.reset({
                             index: 0,
                             routes: [
                                { name: 'My', params: { user_id, myData: [{ ...myData[0], user_name: users_name }] } },
                             ],
                           })
                        );
                }
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('알림', '이미 존재하는 닉네임입니다.');
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Text1}>
                프로필을 설정해 주세요.
            </Text>
            <Text style={styles.Text2}>
                상대방에게 나의 닉네임이 공개됩니다.
            </Text>
            <View style={styles.container2}>

                <View style={styles.container3}>
                    <Image
                        style={styles.locationIcon}
                        source={require('../assets/images/profile.png')}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        placeholder="한글, 영어 또는 숫자로 입력해주세요."
                        placeholderTextColor="gray"
                        onChangeText={(text) => setUser_name(text)}
                    />
                </View>
            </View>
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
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    container2: {
        flex: 1,
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
        marginTop: 100,
    },
    Text2: {
        fontSize: 14,
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
        marginTop : 40,
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

export default Update_user;
