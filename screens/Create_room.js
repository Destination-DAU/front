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





function Create_room({ navigation, route }) {

   const [startDestination, setStartDestination] = useState('');
   const [endDestination, setEndDestination] = useState('');
   const mapRef = useRef(null);
   const [origin, setOrigin] = useState(null);
   const [destination, setDestination] = useState(null);
   const [mode, setMode] = useState('date'); // 모달 유형
   const [visible, setVisible] = useState(false); // 날짜 모달 노출 여부
   const [isModalVisible, setModalVisible] = useState(false); // 인원 모달 노출 여부
   const [person, setPerson] = useState(); // 선택한 인원
   const [startPoint, setStartPoint] = useState(''); // 출발지 상세 주소
   const [endPoint, setEndPoint] = useState(''); // 목적지 상세주소
   const [startTime, setStartTime] = useState(new Date()); // 선택 날짜
   const [title, setTitle] = useState();
   const [user_id, setUserId] = useState();


   const CreateRoom = async () => {
      await axios.post('http://10.0.2.2:3000/Create_room', {
         user_id: user_id,
         room_startPoint: startPoint,
         room_endPoint: endPoint,
         room_name: title,
         room_person: person,
         room_startTime: startTime,
      })
         .then((response) => {
            console.log(response.data);
            if (response.data.success) {
               navigation.navigate('Home', {user_id : user_id});
            }
         })
         .catch((error) => {
            console.log(error);
         });
      // 게시물 생성 버튼 누를 시 백으로 데이터 전송
      };

   const openModal = () => {
      setModalVisible(true);
   };

   const closeModal = () => {
      setModalVisible(false);
   };

   const handlePersonSelect = (value) => {
      setPerson(value);
   };

   const confirmPersonSelection = () => {
      // 선택한 인원을 personCheck 상태로 반영
      setPerson(person);
      closeModal();
   };

   const onPressDate = () => { // 날짜 클릭 시
      setMode('date'); // 모달 유형을 date로 변경
      setVisible(true); // 모달 open
   };

   const onPressTime = () => { // 시간 클릭 시
      setMode('time'); // 모달 유형을 time으로 변경
      setVisible(true); // 모달 open
   };

   const onConfirm = (selectedDate) => { // 날짜 또는 시간 선택 시
      setVisible(false); // 모달 close
      setStartTime(selectedDate); // 선택한 날짜 변경
   };

   const onCancel = () => { // 취소 시
      setVisible(false); // 모달 close
   };

   const edgePaddingValue = 70;

   const edgePadding = {
      top: edgePaddingValue,
      right: edgePaddingValue,
      bottom: edgePaddingValue,
      left: edgePaddingValue,
   };
   // Maps.js 에서 선택된 출발지와 목적지를 처리.
   React.useEffect(() => {
      console.log('route.params:', route.params);
      if (route.params && route.params.startDestination) {
         setStartDestination(route.params.startDestination);
      }
      if (route.params && route.params.endDestination) {
         setEndDestination(route.params.endDestination);
      }
      if (route.params && route.params.origin) {
         setOrigin(route.params.origin)
      }
      if (route.params && route.params.destination) {
         setDestination(route.params.destination)
      }
      if (route.params && route.params.user_id){
         setUserId(route.params.user_id)
      }
   }, [route.params]);

   useEffect(() => {
      // 출발지와 도착지가 잘 설정 되었으면 경로그리기 최적화 시킴
      if (origin && destination) {
         mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
      }
   }, [origin, destination]);

   // 출발지 주소를 변경할 때 호출되는 함수
   const settingOrigin = (text) => {
      setStartPoint(text);
   };

   // 목적지 주소를 변경할 때 호출되는 함수
   const settingDestinations = (text) => {
      setEndPoint(text);
   };

   // 출발지 주소 선택
   const handleStartDestinationPress = () => {
      navigation.navigate('Maps', { type: 'start' }, {user_id : user_id});
   };

   // 도착지 주소 선택
   const handleEndDestinationPress = () => {
      navigation.navigate('Maps', { type: 'end' }, {user_id : user_id});
   };

   const titleSet = (text) => {
      setTitle(text);
   };

   return (
      <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow: 1 }}>
         <View style={styles.container}>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
               <TextInput
                  style={[styles.inputBox2, { fontSize: 18 }]}
                  underlineColorAndroid={'grey'}
                  placeholder="방 제목을 입력해주세요."
                  value={title}
                  onChangeText={titleSet}
               />
               <MapView
                  ref={mapRef}
                  style={styles.map}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={INITIAL_POSITION}
               >
                  {origin && <Marker coordinate={origin}
                  image = {require('../assets/images/origin.png')} />}
                  {destination && <Marker coordinate={destination}
                  image = {require('../assets/images/destination.png')} />}
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
               {/* 출발지 입력 상자 */}
               <TouchableOpacity style={[styles.inputBox]} onPress={handleStartDestinationPress}>
                  <Text style={styles.inputText2}>출발지</Text>
                  <Text style={[styles.inputText, { color: 'grey' }]}>{startDestination || '출발지를 설정해주세요.'}</Text>
               </TouchableOpacity>
               {/* 출발지 상세 주소 입력 상자 (조건부 렌더링) */}

               {startDestination && (
                  <View>
                     <TextInput
                        style={[styles.inputBox]}
                        placeholder="출발지 상세 주소 입력"
                        value={startPoint}
                        onChangeText={settingOrigin}
                     />
                  </View>
               )}
               {/* 목적지 입력 상자 */}
               <TouchableOpacity style={[styles.inputBox]} onPress={handleEndDestinationPress}>
                  {/* <Text style={styles.searchIcon}>🔍  </Text> */}
                  <Text style={styles.inputText2}>도착지</Text>
                  <Text style={[styles.inputText, { color: 'grey' }]}>{endDestination || '도착지를 설정해주세요.'}</Text>
               </TouchableOpacity>
               {/* 목적지 상세 주소 입력 상자 (조건부 렌더링) */}
               {endDestination && (
                  <View>
                     <TextInput
                        style={[styles.inputBox]}
                        placeholder="목적지 상세 주소 입력"
                        value={endPoint}
                        onChangeText={settingDestinations}
                     />
                  </View>
               )}
            </View>
         </View>
         <View style={styles.container2}>
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
               <Text style={styles.inputText3}>
                  출발일자
               </Text>
               <TouchableOpacity style={[styles.inputBox]} onPress={onPressDate}>
                  <Text style={[styles.inputText4, { color: 'grey' }]}>{startTime ? format(startTime, 'yyyy-MM-dd (eee)', { locale: ko }) : '탑승 일자를 설정해 주세요.'}</Text>
               </TouchableOpacity>
               <DateTimePickerModal
                  isVisible={visible}
                  mode={mode}
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                  date={startTime}
                  minimumDate={new Date()} />
               <Text style={styles.inputText3}>
                  출발시간
               </Text>
               <TouchableOpacity style={[styles.inputBox]} onPress={onPressTime}>
                  <Text style={[styles.inputText4, { color: 'grey' }]}>{startTime ? format(startTime, 'HH:MM', { locale: ko }) : '탑승 시간을 설정해 주세요.'}</Text>
               </TouchableOpacity>
               <DateTimePickerModal
                  isVisible={visible}
                  mode={mode}
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                  date={startTime} />
               <Text style={styles.inputText3}>
                  인원설정
               </Text>
               <TouchableOpacity onPress={openModal} style={styles.inputBox}>
                  <Text style={[styles.inputText4, { color: 'grey' }]}>{person ? person + '인' : '탑승 인원을 설정해주세요.'}</Text>
               </TouchableOpacity>
               <Modal
                  animationType="fade"
                  transparent={true}
                  visible={isModalVisible}
               >
                  <View style={styles.modalContainer}>
                     <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>인원 설정</Text>
                        <View style={styles.radioGroup}>
                           <TouchableOpacity
                              onPress={() => handlePersonSelect(2)}
                              style={[
                                 styles.radioButton,
                                 person === 2 ? styles.radioSelected : {},
                              ]}
                           >
                              <Text style={[styles.radioText, { color: person === 2 ? 'white' : 'black' }]}>2인</Text>
                           </TouchableOpacity>
                           <TouchableOpacity
                              onPress={() => handlePersonSelect(3)}
                              style={[
                                 styles.radioButton,
                                 person === 3 ? styles.radioSelected : {},
                              ]}
                           >
                              <Text style={[styles.radioText, { color: person === 3 ? 'white' : 'black' }]}>3인</Text>
                           </TouchableOpacity>
                           <TouchableOpacity
                              onPress={() => handlePersonSelect(4)}
                              style={[
                                 styles.radioButton,
                                 person === 4 ? styles.radioSelected : {},
                              ]}
                           >
                              <Text style={[styles.radioText, { color: person === 4 ? 'white' : 'black' }]}>4인</Text>
                           </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={confirmPersonSelection} style={styles.confirmButton}>
                           <Text style={styles.confirmButtonText}>선택 완료</Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </Modal>
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
                     - 채팅을 통한 비방 및 욕설을 자재해주세요.
                  </Text>
                  <Text style={styles.inputText4}>
                     - 부득이하게 탑승을 하지 못할 경우에 반드시 채팅을 통해 파티원에게 미리 알려주세요.
                  </Text>
               </View>
            </View>
            <TouchableOpacity onPress={CreateRoom} style={styles.button}>
               <Text style={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: '400',
                  padding: 15,
               }}
               >게시물 생성</Text>
            </TouchableOpacity>
         </View>
      </ScrollView>

   );
}
/* container를 이용해서 각 부분 띄워놓기, 지도 경로 찍어보기. */
const styles = StyleSheet.create({
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
   inputBox: {
      marginBottom: 10,
      borderColor: 'grey',
      // flexDirection: 'row',
      // alignItems: 'center',
      width: 350,
      marginTop: 10,
   },

   inputBox2: {
      marginBottom: 20,
      marginTop: 10,
      width: 350,
   },

   inputBox3: {
      marginBottom: 10,
      borderColor: 'grey',
      flexDirection: 'row',
      alignItems: 'center',
      width: 350,
      marginTop: 10,
   },
   inputText: {

      color: 'grey',
   },
   inputText2: {
      color: 'black',
      fontSize: 11,
      fontWeight: 'bold',
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
   scrollView: {
   },
   rowContainer: {
      flexDirection: 'row',
   },
   map: {
      width: '100%',
      height: 250,

   },
   button: {
      alignItems: 'center',
      backgroundColor: 'blue',
      position: 'relative',
      marginTop: 35,
      width: '100%',
   },   modalContainer: {
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
      marginBottom: 30,
      textAlign: 'center'
   },
   radioGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 40,
   },
   radioButton: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
      borderRadius: 5,
      flex: 1,
      alignItems: 'center',
      marginRight: 5,
   },
   radioSelected: {
      backgroundColor: 'blue',
   },
   radioText: {
      color: 'black',
      fontWeight: 'bold',
   },
   confirmButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      alignItems: 'center',
   },
   confirmButtonText: {
      color: 'white',
   },
});

export default Create_room;