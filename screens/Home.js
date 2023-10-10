import React from "react";
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Button } from 'react-native';


function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home!</Text>
      <Button
        title="Create rooms"
        onPress={() => navigation.navigate("Create_room")}
      />
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