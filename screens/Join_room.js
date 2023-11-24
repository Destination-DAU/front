import React, { useRef, useState, useEffect } from 'react';
import { GOOGLE_MAPS_APIKEY } from '../android/environments';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { format } from "date-fns";
import ko from "date-fns/esm/locale/ko/index.js";
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
    ScrollView, Dimensions,
    TimePickerAndroid, TimePickerIOS, Platform, Modal, Pressable
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const INITIAL_POSITION = {
    latitude: 35.106224,
    longitude: 128.966235,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
};

const Join_room = ({ navigation, route, props }) => {
    const { room, user_id, user_name } = route.params;
    const [origin, setOrigin] = useState(undefined);
    const [destination, setDestination] = useState(undefined);
    const [isModalVisible, setModalVisible] = useState(false); // 인원 모달 노출 여부
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부 상태

    const handleExitRoom = () => {
        setShowModal(false);
        // console.log(room.user1, room.user2, room.user3, room.user4)
        const userCheck = [room.user1, room.user2, room.user3, room.user4]
        if (Object.values(room).filter(user => user == null).length == 3) {
            deleteRoom();
            navigation.navigate('Home', { user_id: user_id, user_name: user_name })
        }
        const checkCol = ["user1", "user2", "user3", "user4"];
        for (let i = 0; i < 4; i++) {
            if (userCheck[i] == user_name) {
                CheckData(checkCol[i]);
                break;
            }
        }
    }

    const deleteRoom = async () => {
        await axios.post('http://10.0.2.2:3000/Delete_room', {
            room_number: room.room_number,
        })
            .then((response) => {
                navigation.navigate('Home', { user_id: user_id, user_name: user_name })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const CheckData = async (col) => {
        console.log(col, user_id);
        await axios.post('http://10.0.2.2:3000/Exit_room', {
            user: col,
            room_number: room.room_number,
        })
            .then((response) => {
                navigation.navigate('Home', { user_id: user_id, user_name: user_name })
            })
            .catch((error) => {
                console.log(error);
            });
    }


    const openModal = () => {
        setShowModal(true);
    }

    const mapRef = useRef(null);

    const edgePaddingValue = 20;

    const edgePadding = {
        top: edgePaddingValue,
        right: edgePaddingValue,
        bottom: edgePaddingValue,
        left: edgePaddingValue,
    };

    useEffect(() => {
        if (room.room_origin_lat && room.room_origin_lon) {
            setOrigin({
                latitude: parseFloat(room.room_origin_lat),
                longitude: parseFloat(room.room_origin_lon),
            });
        }

        if (room.room_destination_lat && room.room_destination_lon) {
            setDestination({
                latitude: parseFloat(room.room_destination_lat),
                longitude: parseFloat(room.room_destination_lon),
            });
        }
    }, [room]);

    useEffect(() => {
        // 출발지와 도착지가 잘 설정 되었으면 경로그리기 최적화 시킴
        if (origin && destination) {
            mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
        }
    }, [origin, destination]);

    // 사용자 정보 배열 생성
    const users = [room.user1, room.user2, room.user3, room.user4];

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <View style={styles.locationContainer}>
                        <Text style={[styles.Text1, { fontSize: 18 }]}>{room.room_name}</Text>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Chat', { room: room })}
                        >
                            <Image
                                style={styles.locationIcon2}
                                source={require('../assets/images/chat.png')} // Chat 버튼 이미지 경로
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={openModal} // 이미지 클릭시 모달 표시
                        >
                            <Image
                                style={styles.locationIcon3}
                                source={require('../assets/images/exit.png')} // 나가기 버튼 이미지 경로
                            />
                        </TouchableOpacity>
                    </View>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={INITIAL_POSITION}
                    >
                        {origin && <Marker coordinate={origin}
                            image={require('../assets/images/origin.png')} />}
                        {destination && <Marker coordinate={destination}
                            image={require('../assets/images/destination.png')} />}
                        {origin && destination && (
                            <MapViewDirections
                                origin={origin}
                                destination={destination}
                                apikey={GOOGLE_MAPS_APIKEY}
                                strokeColor="#6644ff"
                                strokeWidth={5}
                                mode="TRANSIT"
                            /> // 경로 그리기
                        )}
                    </MapView>
                    <Text style={{ marginTop: 10 }}>출발지</Text>
                    <Text style={styles.Text2}>{room.room_startPoint}</Text>
                    <Text>도착지</Text>
                    <Text style={styles.Text2}>{room.room_endPoint}</Text>
                </View>
            </View>
            <View style={styles.container2}>
                <View style={{ paddingLeft: 20, paddingTop: 20 }}>
                    <View style={styles.locationContainer}>
                        <Image
                            style={styles.locationIcon}
                            source={require('../assets/images/crown.png')}
                        />
                        <Text> 방장   </Text>
                        <Text style={styles.locationText}>
                            {room.user1 ? room.user1 : (room.user2 ? room.user2 : (room.user3 ? room.user3 : room.user4))}
                        </Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <Image
                            style={styles.locationIcon}
                            source={require('../assets/images/time.png')}
                        />
                        <Text> 일정   </Text>
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
                        <Text> 인원   </Text>
                        <Text style={styles.locationText}>
                            {users.filter(user => user !== null).length} / {room.room_person} 인
                        </Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <Image
                            style={styles.locationIcon}
                            source={require('../assets/images/price.png')}
                        />
                        <Text> 가격   </Text>
                        <Text style={styles.locationText}>
                            {room.price} 원 / 인당 {Math.round((room.price / room.room_person) / 10) * 10} 원({room.room_person}인)
                        </Text>
                    </View>
                </View>
                <View style={{ marginBottom: 20 }} />
            </View>
            <View style={styles.container3}>
                <View style={{ paddingLeft: 20, paddingTop: 20 }}>
                    <Text style={styles.inputText3}>
                        참여자
                    </Text>
                    {users.map((user, index) => (
                        user !== null && (
                            <View style={styles.locationContainer} key={index}>
                                <Image
                                    style={styles.locationIcon}
                                    source={require('../assets/images/user.png')}
                                />
                                <Text style={{ marginBottom: 10 }}>{user}</Text>
                            </View>
                        )
                    ))}
                </View>
            </View>
            <View style={styles.container3}>
                <View style={{ paddingLeft: 20, paddingTop: 20 }}>
                    <Text style={styles.inputText3}>
                        유의사항
                    </Text>
                    <View style={{ paddingLeft: 10, paddingTop: 10, paddingRight: 30 }}>
                        <Text style={styles.inputText4}>
                            - 해당 서비스는 택시 호출 서비스가 아닌 택시를 함께 탑승할 파티원을 찾는 커뮤니티 서비스 입니다.
                        </Text>
                        <Text style={styles.inputText4}>
                            - 채팅을 통한 비방 및 욕설을 자제해주세요.
                        </Text>
                        <Text style={styles.inputText4}>
                            - 부득이하게 탑승을 하지 못할 경우에 반드시 채팅을 통해 파티원에게 미리 알려주세요.
                        </Text>
                        <Text style={styles.inputText4}>
                            - 자세한 탑승 위치와 정산은 채팅을 이용해주세요.
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{ marginBottom: 3 }} />
            <View style={styles.container3}></View>
            <Modal
                visible={showModal}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>알림</Text>
                        <Text style={styles.modalText}>정말로 나가시겠습니까?</Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={handleExitRoom}
                            >
                                <Text>예</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => setShowModal(false)} // 모달 닫기
                            >
                                <Text>아니오</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 150,
    },
    Text1: {
        marginBottom: 20,
        marginTop: 10,
        width: 258,
        color: 'black',
        fontWeight: 'bold',
    },
    Text2: {
        marginBottom: 20,
        color: 'black',
    },
    Text3: {
        alignSelf: 'center',
        color: 'black',
    },
    container: {
        backgroundColor: 'white',
    },
    container2: {
        backgroundColor: 'white',
        marginTop: 10,
    },
    container3: {
        backgroundColor: 'white',
        marginTop: 10,
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
    locationIcon2: {
        width: 48, // 이미지 너비 조절
        height: 48, // 이미지 높이 조절
        marginRight: 17,
    },
    locationIcon3: {
        width: 33, // 이미지 너비 조절
        height: 33, // 이미지 높이 조절
    },
    locationText: {
        color: 'black',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'blue',
        position: 'relative',
        marginTop: 30,
        width: '100%',
    },
    button2: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: 'blue',
        position: 'relative',
        marginTop: 30,
        width: '30%',
    },
    inputText3: {
        marginBottom: 10,
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
    },
    inputText4: {
        color: 'grey',
        fontSize: 14,
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: 300,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 20,
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    modalButton: {
        marginTop: 30,
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
        width: 100,
        alignItems: 'center',
    },
});
export default Join_room;
