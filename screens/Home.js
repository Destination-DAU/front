import React from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Button } from 'react-native';


function Home({ navigation, route }) {
  const user_id = route.params.user_id;
  return (
    <View style={styles.container}>
      <Text>Home!</Text>
      <Button
        title="Create rooms"
        onPress={() => navigation.navigate("Create_room", {user_id: user_id})}
      />
      <Button
        title="Search rooms"
        onPress={() => navigation.navigate("Search_room", {user_id: user_id})}
      />
      <Button
        title="My rooms"
        onPress={() => navigation.navigate("My_room", {user_id: user_id})}
      />
      <Text>{user_id}</Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ""
  }
})

export default Home;