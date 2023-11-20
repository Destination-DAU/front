import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Alert, } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import ko from "date-fns/esm/locale/ko/index.js";

const Explain = ({ navigation, route }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text1}>자주 묻는 질문</Text>
            <Text style={styles.text2}>Q.이용을 마치고 결제는 어떻게 진행이되나요?</Text>
            <Text style={styles.text3}>이용을 마친 후, 채팅 기능을 통해서 정산을 진행하시면
            </Text>
            <Text style={styles.text4}>됩니다. 하단 네비게이션 내 정보 탭에서 은행과 계좌번호를
            </Text>
            <Text style={styles.text4}>설정하시면 더욱 편리하게 이용하실 수 있습니다.
            </Text>

            <Text style={styles.text2}>Q.출발지와 목적지가 설정한대로 나오지 않아요.</Text>
            <Text style={styles.text3}>방을 생성할 때 출발지와 목적지를 설정하면 
            </Text>
            <Text style={styles.text4}>출발지와 목적지 상세 주소 입력 칸이 활성화됩니다. 
            </Text>
            <Text style={styles.text4}>상세주소를 통해서 사용자에게 출발지와 목적지가
            </Text>
            <Text style={styles.text4}>표시되니, 이 점 유의해주시기 바랍니다.
            </Text>

            <Text style={styles.text2}>Q.설정된 이름을 변경하고 싶어요.</Text>
            <Text style={styles.text3}>하단 네비게이션 내 정보 탭에서 사용자의
            </Text>
            <Text style={styles.text4}>이름을 변경하실 수 있습니다. 내 정보 탭에서
            </Text>
            <Text style={styles.text4}>은행정보와 사용자 명을 변경하고 로그아웃
            </Text>
            <Text style={styles.text4}>기능을 이용하실 수 있습니다.
            </Text>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },

    text1: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
        marginLeft: 30,
        marginTop: 30,
    },
    text2: {
        fontSize: 15,
        color: "black",
        marginLeft: 40,
        marginTop: 30,
    },
    text3: {
        fontSize: 13,
        marginLeft: 40,
        marginTop: 30,
    },
    text4: {
        fontSize: 13,
        marginLeft: 40,
    },
});

export default Explain;
