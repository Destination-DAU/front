import React from "react";
import { View, Text, Button } from "react-native";

function Home({ navigation }) {
  return (
    <View>
      <Text>Home!</Text>
      <Button
        title="Go to Maps"
        onPress={() => navigation.navigate("Maps")}
      />
    </View>
  );
}

export default Home;