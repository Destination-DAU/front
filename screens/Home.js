import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios'
import React, { useState, useEffect } from 'react';



function Home({ navigation, route }) {
  const user_id = route.params.user_id;
  const [my_data, setMydata] = useState();

  const goHome = () => {

    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 0,
    //     routes: [
    //       { name: 'Home', params: { user_id } }, // 'Home' 화면으로 이동
    //     ],
    //   })
    // )
  }

  const goMy = async () => {
    await axios.post('http://10.0.2.2:3000/My', {
         user_id: user_id,
      })
         .then((response) => {
            console.log(response.data.result);
            setMydata(response.data.result);
            if (response.data.success) {
               navigation.dispatch(
                  CommonActions.reset({
                     index: 0,
                     routes: [
                       { name: 'My', params: { user_id, myData: response.data.result } }, // 'Home' 화면으로 이동
                     ],
                   })
                );
            }
         })
         .catch((error) => {
            console.log(error);
         });
  }

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <Image
          style={styles.locationIcon}
          source={require('../assets/images/tmans.png')}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Search_room", { user_id: user_id })}
          >
            <Text style={styles.buttonText}>방 검색</Text>
            <Text style={{ fontSize: 10, marginTop: 5, marginLeft: 20, }}>동승으로 저렴한 이동</Text>
            <Image
              style={styles.locationIcon2}
              source={require('../assets/images/taxi.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("My_room", { user_id: user_id })}
          >
            <Text style={styles.buttonText}>내 방</Text>
            <Text style={{ fontSize: 10, marginTop: 5, marginLeft: 20, }}>참여한 방 관리</Text>
            <Image
              style={styles.locationIcon3}
              source={require('../assets/images/home.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer2}>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.navigate("Create_room", { user_id: user_id })}
          >
            <Text style={styles.buttonText}>방 만들기</Text>
            <Text style={{ fontSize: 10, marginTop: 5, marginLeft: 20, }}>원하는 시간 및 위치 설정</Text>
            <Image
              style={styles.locationIcon3}
              source={require('../assets/images/plus.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button2}
            onPress={() => navigation.navigate("Create_room", { user_id: user_id })}
          >
            <Text style={styles.buttonText}>이용안내</Text>
            <Text style={{ fontSize: 10, marginTop: 5, marginLeft: 20, }}>FAQ 자주 묻는 질문</Text>
            <Image
              style={styles.locationIcon3}
              source={require('../assets/images/question.png')}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.Text1}>주변 사람들과 함께</Text>
        <Text style={styles.Text1}>택시 동승 서비스를 이용해보세요 !</Text>
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


  );
}

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
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 60,
  },
  container4: {
    backgroundColor: "white",
    // alignItems: "center",
    width: "50%",
    height: 60,
    backgroundColor: "rgb(248, 248, 248)",
    borderRadius: 2,
    borderWidth: 1, // 테두리 두께 추가
    borderColor: "rgb(235, 235, 235)", // 테두리 색상
  },
  container5: {
    backgroundColor: "white",
    // alignItems: "center",
    width: "50%",
    height: 60,
    backgroundColor: "rgb(248, 248, 248)",
    borderRadius: 2,
    borderWidth: 1, // 테두리 두께 추가
    borderColor: "rgb(235, 235, 235)", // 테두리 색상
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 30,
  },
  Text1: {
    fontSize: 14,
  },

  buttonContainer2: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 10,
  },
  button: {
    width: 150,
    height: 150,
    backgroundColor: "rgb(248, 248, 248)",
    borderRadius: 10,
    borderWidth: 1, // 테두리 두께 추가
    borderColor: "rgb(235, 235, 235)", // 테두리 색상
  },
  button2: {
    width: 150,
    height: 150,
    backgroundColor: "rgb(248, 248, 248)",
    borderRadius: 10,
    borderWidth: 1, // 테두리 두께 추가
    borderColor: "rgb(235, 235, 235)", // 테두리 색상
    marginBottom: 60,
  },
  buttonText: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
  },
  buttonText2: {
    color: "black",
    fontWeight: 'bold',
    fontSize: 18,
  },
  locationIcon: {
    width: 150,
    height: 70,
    marginTop: 80,
  },
  locationIcon2: {
    width: 100,
    height: 70,
    marginLeft: 40,
  },
  locationIcon3: {
    width: 65,
    height: 65,
    marginLeft: 75,
    marginTop: 10,
  },
  locationIcon4: {
    width: 55,
    height: 55,
    marginLeft: 80,
    marginTop: 15,
  },
  locationIcon5: {
    width: 70,
    height: 70,
    marginLeft: 80,
    marginTop: 20,
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
});

export default Home;
