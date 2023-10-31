import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { format } from 'date-fns';
import ko from "date-fns/esm/locale/ko/index.js";

const My_room = ({ navigation, route }) => {
    const [roomList, setRoomList] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [user_id, setUserId] = useState();

    const RoomClick = (room) => {
        setSelectedRoom(room);
        navigation.navigate('Join_room', { room, user_id: user_id });
    }

    const handleExitRoom = () => {
        setShowModal(false);
    }

    const openModal = () => {
        setShowModal(true);
    }

    const fetchRoomList = async () => {
        try {
            const response = await axios.post('http://10.0.2.2:3000/My_room', {
                user_id: user_id,
            });
            console.log(response.data)
            setRoomList(response.data.result); // 가져온 데이터로 roomList 업데이트
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (user_id) {
            fetchRoomList();
        }
    }, [user_id]);

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
                            <View style={styles.locationContainer}>
                                <Text style={styles.title}>{room.room_name}</Text>
                            </View>
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
                    <Text style = {{marginLeft : 110, marginTop : 300}}> 방이 존재하지 않습니다. </Text>
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
        borderRadius: 10,
        borderWidth: 1, // 테두리 두께 추가
        borderColor: "rgb(220, 220, 220)",
        padding: 25,
        marginBottom: 10,
        alignSelf: 'center',
        width: '100%',
    },
    title: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'black',
        width: 290,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
    },
    locationIcon: {
        width: 20,
        height: 20,
        marginRight: 5,
    },
    locationIcon2: {
        width: 30,
        height: 30,
    },
    locationText: {
        fontSize: 12,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});

export default My_room;
