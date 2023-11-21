/**
 * "in_date": "2023-10-19T06:11:13.000Z"
 * "user_answer": "123"
 * "user_bank": null
 * "user_bnum": null
 * "user_gender": "남"
 * "user_id": "asd"
 * "user_name": "qq"
 * "user_pw": "123", 
 * "user_question": "졸업한 중학교는?"
 */


import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import ko from "date-fns/esm/locale/ko/index.js";
import { CommonActions } from '@react-navigation/native';

const My = ({ navigation, route }) => {
    const user_id = route.params.user_id;

    const myData = route.params.myData;
    const [user_name, setUser_name] = useState(myData[0].user_name);

    useEffect(() => {
        // user_name이 변경될 때 실행되는 코드
        setUser_name(myData[0].user_name);
    }, [myData[0].user_name]);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // 화면 포커스될 때 데이터 업데이트
            setUser_name(myData[0].user_name)
        });

        return unsubscribe;
    }, [navigation]);
    const goHome = () => {
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Home', params: { user_id, user_name: user_name } }, // 'Home' 화면으로 이동
                ],
            })
        )
    }

    const goMy = () => {
        // navigation.dispatch(
        //     CommonActions.reset({
        //         index: 0,
        //         routes: [
        //             { name: 'My', params: { user_id } }, // 'My' 화면으로 이동
        //         ],
        //     })
        // )
    }

    const changeBank = () => {
        console.log(myData[0].user_name);
    }

    const Logout = () => {
        console.log(myData[0].user_name);
    }


    return (
        <View style={styles.container}>
            <View style={styles.container2}>
                <Text style={styles.Text1}>개인정보 수정</Text>
                <Text style={styles.Text2}>사용자</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Update_user", { myData: myData, user_id: user_id, user_name: user_name })}>
                    <View style={styles.container6}>
                        <View style={styles.container7}>
                            <Image
                                style={styles.locationIcon8}
                                source={require('../assets/images/profile.png')}
                            />
                        </View>
                        <Text style={styles.Text3}>{myData[0].user_name}</Text>
                        <Image
                            style={styles.locationIcon9}
                            source={require('../assets/images/edit.png')}
                        />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 10 }}></View>
            <View style={styles.container2}>
                <View style={{ marginTop: 30 }}></View>
                <Text style={styles.Text2}>계정</Text>
                <Text style={styles.Text6}>{myData[0].user_id}</Text>
                <View style={{ marginBottom: 10 }}></View>
                <Text style={styles.Text2}>전화번호</Text>
                <Text style={styles.Text6}>{myData[0].user_phoneNumber}</Text>
                <View style={{ marginBottom: 30 }}></View>
            </View>
            <View style={{ marginBottom: 10 }}></View>

            <View style={styles.container2}>
                <View style={{ marginTop: 20 }}></View>
                <Text style={styles.Text2}>은행</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Update_bank", { myData: myData, user_id: user_id, user_name: user_name })}
                >
                    <View style={styles.container8}>
                        <Text style={myData[0].user_bnum ? styles.Text7 : styles.Text5}>{myData[0].user_bank ? myData[0].user_bank : "은행을 설정해 주세요."}</Text>
                        <Image
                            style={styles.locationIcon10}
                            source={require('../assets/images/edit.png')}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={styles.Text2}>계좌번호</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Update_bank", { myData: myData, user_id: user_id, user_name: user_name })}
                >
                    <View style={styles.container8}>
                        <Text style={myData[0].user_bnum ? styles.Text7 : styles.Text5}>{myData[0].user_bnum ? myData[0].user_bnum : "계좌번호를 설정해 주세요."}</Text>
                        <Image
                            style={styles.locationIcon10}
                            source={require('../assets/images/edit.png')}
                        />
                    </View>
                    <View style={{ marginTop: 20 }}></View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
                    <Text style={{
                        color: 'blue',
                        fontSize: 15,
                        fontWeight: '400',
                        padding: 15,
                    }}
                    >로그아웃</Text>
                </TouchableOpacity>
                <View style={{ marginBottom: 48 }}></View>
                
            </View>


            <View style={styles.container3}>
                <View style={styles.container4}>
                    <TouchableOpacity
                        onPress={goHome}
                    >
                        <Image
                            style={styles.locationIcon7}
                            source={require('../assets/images/home2.png')}
                        />
                        <Text style={{ marginLeft: 93, fontSize: 12 }}>홈</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.container5}>
                    <TouchableOpacity
                        onPress={goMy}
                    >
                        <Image
                            style={styles.locationIcon7}
                            source={require('../assets/images/person.png')}
                        />
                        <Text style={{ marginLeft: 81.8, fontSize: 12 }}>내 정보</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: "white",
    },
    container2: {
        // flex: 1,
        backgroundColor: "white",
        // alignItems: "center",
    },
    container3: {
        flexDirection: "row",
        alignItems: 'flex-end',  // 화면 하단에 정렬
        justifyContent: 'flex-end',  // 화면 하단에 정렬
        width: "100%",
        height: 60,
    },
    container4: {
        backgroundColor: "white",
        width: "50%",
        height: 60,
        backgroundColor: "rgb(248, 248, 248)",
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "rgb(235, 235, 235)",
    },
    container5: {
        backgroundColor: "white",
        width: "50%",
        height: 60,
        backgroundColor: "rgb(248, 248, 248)",
        borderRadius: 2,
        borderWidth: 1,
        borderColor: "rgb(235, 235, 235)",
    },
    container6: {
        flexDirection: "row",
        // backgroundColor: "red",
        width: "50%",
        height: 60,
        borderRadius: 2,
        // borderWidth: 1,
        borderColor: "rgb(235, 235, 235)",
        marginLeft: 30,
        marginBottom: 30,
    },
    container7: {
        // flexDirection: "row",
        // backgroundColor: "red",
        width: 60,  // 원 모양의 가로 크기
        height: 60,  // 원 모양의 세로 크기
        backgroundColor: "rgb(248, 248, 248)",
        borderRadius: 30,
        // borderWidth: 1,
        borderColor: "rgb(235, 235, 235)",
    },
    container8: {
        flexDirection: "row",
        width: "50%",
        height: 40,
        borderRadius: 2,
        // borderWidth: 1,
        borderColor: "rgb(235, 235, 235)",
        marginLeft: 30,
        marginBottom: 10,
    },

    locationIcon6: {
        marginLeft: 90,
        marginTop: 7,
        width: 30,
        height: 30,
        alignContent: "center",
    },
    locationIcon7: {
        marginLeft: 84,
        marginTop: 7,
        width: 30,
        height: 30,
        alignContent: "center",
    },
    locationIcon8: {
        width: 60,
        height: 60,
    },
    locationIcon9: {
        width: 20,
        height: 20,
        marginLeft: 20,
        marginTop: 20,
    },
    locationIcon10: {
        width: 20,
        height: 20,
        marginLeft: 20,
        marginTop: 11,
    },
    Text1: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginLeft: 30,
        marginBottom: 30,
    },
    Text2: {
        marginLeft: 30,
        fontSize: 14,
        marginBottom: 4
    },
    Text3: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        marginLeft: 20,
        marginTop: 15,
    },
    Text4: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        marginLeft: 5,
        marginTop: 15,
    },
    Text5: {
        // marginLeft: 10,
        fontSize: 14,
        marginTop: 15
    },
    Text6: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        marginLeft: 30,
        marginTop: 8
    },
    Text7: {
        fontSize: 16,
        fontWeight: "bold",
        color: "black",
        marginTop: 8
    },
    button: {
        alignItems: 'center',
        borderColor: "rgb(200, 200, 200)",
        borderRadius: 10,
        borderWidth: 1,
        marginTop: 14,
        marginLeft: 135,
        width: "30%"
    },
});

export default My;
