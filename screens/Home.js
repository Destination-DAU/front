import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

function Home({ navigation, route }) {
  const user_id = route.params.user_id;
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
        <Text style = {styles.Text1}>주변 사람들과 함께</Text>
        <Text style = {styles.Text1}>택시 동승 서비스를 이용해보세요 !</Text>
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 30,
  },
    Text1:{
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
});

export default Home;
