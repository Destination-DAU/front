import React, { useRef, useState, useEffect } from 'react';
import { GOOGLE_MAPS_APIKEY } from '../android/environments';
import MapViewDirections from 'react-native-maps-directions';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
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
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Maps from './Maps'; // Maps.js 파일의 상대 경로로 수정


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
const CreateRoom = () => {

}



function Create_room({ navigation, route }) {
   const [startDestination, setStartDestination] = useState('');
   const [endDestination, setEndDestination] = useState('');
   const [startDestinationAddress, setStartDestinationAddress] = useState(''); // 출발지 상세 주소
   const [endDestinationAddress, setEndDestinationAddress] = useState(''); // 목적지 상세 주소
   // const [getOrigin, setgetOrigin] = useState('');
   // const [getDestination, setgetDestination] = useState('');

   const [showDirections, setShowDirections] = useState(false);
   const mapRef = useRef(null);
   const [origin, setOrigin] = useState(null);
   const [destination, setDestination] = useState(null);
   
   const edgePaddingValue = 70;

   const edgePadding = {
     top: edgePaddingValue,
     right: edgePaddingValue,
     bottom: edgePaddingValue,
     left: edgePaddingValue,
   };
   // MapsScreen에서 선택된 출발지와 목적지를 처리합니다.
   React.useEffect(() => {
      console.log('route.params:', route.params);
      if (route.params && route.params.startDestination) {
         setStartDestination(route.params.startDestination);
         console.log(route.params.endDestination)
      }
      if (route.params && route.params.endDestination) {
         setEndDestination(route.params.endDestination);
         console.log(route.params.startDestination)
      }
      if (route.params && route.params.origin){
         setOrigin(route.params.origin)
      }
      if (route.params && route.params.destination){
         setDestination(route.params.destination)
      }
   }, [route.params]);

   useEffect(() => {
      // origin과 destination 값이 존재할 때만 실행
      if (origin && destination) {
         mapRef.current?.fitToCoordinates([origin, destination], { edgePadding });
      }
   }, [origin, destination]);

   // 출발지 주소를 변경할 때 호출되는 함수
   const handleStartDestinationAddressChange = (text) => {
      setStartDestinationAddress(text);
   };

   // 목적지 주소를 변경할 때 호출되는 함수
   const handleEndDestinationAddressChange = (text) => {
      setEndDestinationAddress(text);
   };

   const handleStartDestinationPress = () => {
      navigation.navigate('Maps', { type: 'start' });
   };

   const handleEndDestinationPress = () => {
      navigation.navigate('Maps', { type: 'end' });
   };
   
   return (
      <ScrollView style={styles.scrollView} contentContainerStyle={{ flexGrow : 1 }}>
         <View style={styles.container}>
            <View style={{ paddingLeft: 20, paddingRight: 20 }}>
               <TextInput
                  style={[styles.inputBox2, { fontSize: 18 }]} // 스타일을 바로 이 위치로 이동
                  underlineColorAndroid={'grey'}
                  placeholder="방 제목을 입력해주세요."
                  value={startDestinationAddress}
                  onChangeText={handleStartDestinationAddressChange}
               />
               <MapView
                  ref={mapRef}
                  style={styles.map}
                  provider={PROVIDER_GOOGLE}
                  initialRegion={INITIAL_POSITION}
               >
        {origin && <Marker coordinate={origin} />}
        {destination && <Marker coordinate={destination} />}
        {origin && destination &&(
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeColor="#6644ff"
            strokeWidth={5}
            mode="TRANSIT"
          />
        )}
               </MapView>
               {/* 출발지 입력 상자 */}
               <TouchableOpacity style={[styles.inputBox]} onPress={handleStartDestinationPress}>
                  <Text style={styles.inputText2}>출발지 : </Text>
                  <Text style={[styles.inputText, { color: startDestination ? 'black' : 'blue' }]}>{startDestination || '출발지 설정하기'}</Text>
                  <Text style={styles.searchIcon}>   🔍</Text>
               </TouchableOpacity>
               {/* 출발지 상세 주소 입력 상자 (조건부 렌더링) */}

               {startDestination && (
                  <View>
                     <Text style={styles.inputText3}>
                        상세주소
                     </Text>
                     <TextInput
                        style={[styles.inputBox]} // 스타일을 바로 이 위치로 이동
                        placeholder="출발지 상세 주소 입력"
                        value={startDestinationAddress}
                        onChangeText={handleStartDestinationAddressChange}
                     />
                  </View>
               )}
               {/* 목적지 입력 상자 */}
               <TouchableOpacity style={[styles.inputBox]} onPress={handleEndDestinationPress}>
                  {/* <Text style={styles.searchIcon}>🔍  </Text> */}
                  <Text style={styles.inputText2}>도착지 : </Text>
                  <Text style={[styles.inputText, { color: endDestination ? 'black' : 'blue' }]}>{endDestination || '도착지 설정하기'}</Text>
                  <Text style={styles.searchIcon}>   🔍</Text>
               </TouchableOpacity>
               {/* 목적지 상세 주소 입력 상자 (조건부 렌더링) */}
               {endDestination && (
                  <View>
                     <Text style={styles.inputText3}>
                        상세주소
                     </Text>
                     <TextInput
                        style={[styles.inputBox]}
                        placeholder="목적지 상세 주소 입력"
                        value={endDestinationAddress}
                        onChangeText={handleEndDestinationAddressChange}
                     />
                  </View>
               )}
            </View>
         </View>
         <View style={styles.container2}>
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
               <Text style={styles.inputText3}>
                  출발시간
               </Text>
               <View style={styles.rowContainer}>
                  <TextInput
                     style={[styles.inputBox]}
                     placeholder="탑승 시간을 설정해주세요."
                     value={endDestinationAddress}
                     onChangeText={handleEndDestinationAddressChange}
                  />
               </View>
               <Text style={styles.inputText3}>
                  인원설정
               </Text>
               <TextInput
                  style={[styles.inputBox]}
                  placeholder="탑승 인원을 설정해주세요."
                  value={endDestinationAddress}
                  onChangeText={handleEndDestinationAddressChange}
               />
            </View>
         </View>
         <View style={styles.container3}>
            <View style={{ paddingLeft: 20, paddingTop: 20 }}>
               <Text style={styles.inputText3}>
                  유의사항
               </Text>
               <View style={{ paddingLeft: 10, paddingTop: 10, paddingRight: 30}}>
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
      flexDirection: 'row',
      alignItems: 'center',
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

      color: 'blue',
   },
   inputText2: {
      color: 'black',
      fontSize: 13, 
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
   searchIcon: {
      fontSize: 15,
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
   },
});

export default Create_room;