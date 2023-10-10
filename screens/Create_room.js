import React, { useState } from 'react';
import {
   SafeAreaView,
   TextInput,
   TouchableOpacity,
   Text,
   StyleSheet,
   View,
   Image,
   Alert,
   ScrollView
} from 'react-native';

function Create_room({ navigation, route }) {
   const [startDestination, setStartDestination] = useState('');
   const [endDestination, setEndDestination] = useState('');
   const [startDestinationAddress, setStartDestinationAddress] = useState(''); // 출발지 상세 주소
   const [endDestinationAddress, setEndDestinationAddress] = useState(''); // 목적지 상세 주소


   // MapsScreen에서 선택된 출발지와 목적지를 처리합니다.
   React.useEffect(() => {
      console.log('route.params:', route.params);
      if (route.params && route.params.startDestination) {
         setStartDestination(route.params.startDestination);
      }
      if (route.params && route.params.endDestination) {
         setEndDestination(route.params.endDestination);
      }
   }, [route.params]);

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
      <SafeAreaView style={styles.container}>
          <ScrollView style={styles.scrollView}>
         <View style={{ flex: 1, paddingLeft: 20, paddingTop: 20, paddingBottom: 20 }}>
            <TextInput
               style={[styles.inputBox2, {fontSize: 18}]} // 스타일을 바로 이 위치로 이동
               underlineColorAndroid={'grey'}
               placeholder="방 제목을 입력해주세요."
               value={startDestinationAddress}
               onChangeText={handleStartDestinationAddressChange}
             />
            {/* 출발지 입력 상자 */}
            <TouchableOpacity style={[styles.inputBox]} onPress={handleStartDestinationPress}>
            <Text style={styles.searchIcon}>🔍  </Text>
            <Text style = {styles.inputText2}>출발지 : </Text> 
               <Text style={styles.inputText}>{startDestination || '출발지 설정하기'}</Text>
               
            </TouchableOpacity>
            {/* 출발지 상세 주소 입력 상자 (조건부 렌더링) */}
            
            {startDestination && (
               <View>
               <Text style = {styles.inputText3}>
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
            <Text style={styles.searchIcon}>🔍  </Text>
            <Text style = {styles.inputText2}>도착지 : </Text>
               <Text style={styles.inputText}>{endDestination || '목적지 설정하기'}</Text>
               
            </TouchableOpacity>
            {/* 목적지 상세 주소 입력 상자 (조건부 렌더링) */}
            {endDestination && (
               <View>
               <Text style = {styles.inputText3}>
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
         </ScrollView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: 'white',
   },
   inputBox: {
      marginBottom: 10,
      borderColor: 'grey',
      borderRadius: 5,
      padding: 7,
      marginRight: 10,
      flexDirection: 'row',
      alignItems: 'center',
      width: 350,
   },
   inputBox2:{
      marginBottom : 40,
      marginTop: 15,
      width: 350,

   },
   inputText: {
      flex: 1,
      color: 'blue', // 파란색 글자 색상
   },
   inputText2: {
      color: 'black', // 파란색 글자 색상
      fontSize : 13,
   },
   inputText3: {
      color: 'black', // 파란색 글자 색상
      fontSize : 14,
      fontWeight : 'bold'
   },
   searchIcon: {
      fontSize: 20,
   },
   scrollView: {
    },
});

export default Create_room;
