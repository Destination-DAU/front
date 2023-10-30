import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import ko from "date-fns/esm/locale/ko/index.js";
import { TouchableOpacity } from 'react-native-gesture-handler';

const Search_room = ({ navigation, route }) => {
    const [roomList, setRoomList] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [user_id, setUserId] = useState();
    const [personList, setPersonList] = useState([]);

    const RoomClick = (room) => {
        setSelectedRoom(room);
        navigation.navigate('Details_room', { room, user_id: user_id });
    }
    const fetchRoomList = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:3000/Search_room');
            console.log(response.data)
            if (response.status === 200) {
                setRoomList(response.data.result);
                // console.log(response.data);
            } else {
                console.log('방 목록을 불러올 수 없습니다. 응답 상태 코드: ' + response.status);
            }
        } catch (error) {
            console.error('방 목록을 불러올 수 없습니다.', error);
        }
    };



    useEffect(() => {
        fetchRoomList();
    }, []);

    React.useEffect(() => {
        console.log('route.params:', route.params);
        if (route.params && route.params.user_id) {
            setUserId(route.params.user_id)
        }
    }, [route.params]);

    return (
        <ScrollView>
            <View style={styles.container}>
                {roomList.length > 0 ? (
                    roomList.map((room, index) => (
                        <TouchableOpacity
                            key={index}
                            style={styles.roomBox}
                            onPress={() => RoomClick(room)}>
                            <Text style={styles.title}>{room.room_name}</Text>
                            <View style={styles.locationContainer}>
                                <Image
                                    style={styles.locationIcon}
                                    source={require('../assets/images/location.png')}
                                />
                                <Text style={styles.locationText}>
                                    {room.room_startPoint} - {room.room_endPoint}
                                </Text>
                            </View>
                            <View style={styles.locationContainer}>
                                <Image
                                    style={styles.locationIcon}
                                    source={require('../assets/images/time.png')}
                                />
                                <Text style={styles.locationText}>
                                    {format(new Date(room.room_startTime), 'yyyy-MM-dd (eee) HH:mm 출발', {
                                        locale: ko,
                                    })}
                                </Text>
                            </View>
                            <View style={styles.locationContainer}>
                                <Image
                                    style={styles.locationIcon}
                                    source={require('../assets/images/people.png')}
                                />
                                <Text style={styles.locationText}>
                                    {Object.values(room).filter(user => user !== null).length - 11} / {room.room_person} 인
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text>데이터를 로딩 중입니다...</Text>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    roomBox: {
        padding: 25,
        marginBottom: 10,
        alignSelf: 'center',
        width: '100%',
        borderRadius: 10,
        borderWidth: 1, // 테두리 두께 추가
        borderColor: "rgb(220, 220, 220)", // 테두리 색상
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        
    },
    locationIcon: {
        width: 20, // 이미지 너비 조절
        height: 20, // 이미지 높이 조절
        marginRight: 5, // 이미지와 텍스트 사이 간격
    },
    locationText: {
        fontSize: 12,
    },
});

export default Search_room;
