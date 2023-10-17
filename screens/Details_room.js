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

const Details_room = ({ navigation, route }) => {
    const { room } = route.params;
    const [origin, setOrigin] = useState(undefined);
    const [destination, setDestination] = useState(undefined);

    const JoinRoom = () =>{

        // 참여하기 누르면 이후 로직 구성

    }
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


    const mapRef = useRef(null);
    console.log(origin)
    console.log(destination)

    const edgePaddingValue = 20;

    const edgePadding = {
        top: edgePaddingValue,
        right: edgePaddingValue,
        bottom: edgePaddingValue,
        left: edgePaddingValue,
    };

    useEffect(() => {
        // 출발지와 도착지가 잘 설정 되었으면 경로그리기 최적화 시킴
        if (origin && destination) {
            mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
        }
    }, [origin, destination]);



    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={[styles.Text1, { fontSize: 18 }]}>{room.room_name}</Text>
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
                    <Text style={styles.Text2}>{room.room_startPoint}</Text>
                    <Text>출발지</Text>
                    <Text style={styles.Text2}>{room.room_endPoint}</Text>
                    <Text style={{ marginBottom: 20, }}>도착지</Text>
                </View>
            </View>
            <View style={styles.container2}>
                <View style={{ paddingLeft: 20, paddingTop: 20 }}>
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
                            {room.room_person}인
                        </Text>
                    </View>
                    <View style={styles.locationContainer}>
                        <Image
                            style={styles.locationIcon}
                            source={require('../assets/images/crown.png')}
                        />
                        <Text> 방장   </Text>
                        <Text style={[styles.locationText]}>
                            {room.user_id}
                        </Text>
                    </View>
                </View>
                <View style={{ marginBottom: 20 }} />
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
            <TouchableOpacity onPress={JoinRoom} style={styles.button}>
               <Text style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  padding: 15,
               }}
               >참여하기</Text>
            </TouchableOpacity>
         </View>
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
        width: 350,
        color: 'black',
        fontWeight: 'bold',
    },
    Text2: {
        marginTop: 10,
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
     inputText3: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
     },
     inputText4: {
        color: 'grey',
        fontSize: 14,
        marginBottom: 10,
     },
})
export default Details_room;