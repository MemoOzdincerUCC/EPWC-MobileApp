import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const Home = () => {
  return (
    <View style={styles.container}>
      <Image source={require("./assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Welcome to My App</Text>
      <TouchableOpacity
        onPress={() => navigate("Camera")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigate("Other")} style={styles.button}>
        <Text style={styles.buttonText}>Other Functions</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003366",
  },
  logo: {
    width: 128,
    height: 128,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  button: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#00cc00",
  },
  buttonText: {
    fontSize: 18,
    color: "white",
  },
});

export default Home;
