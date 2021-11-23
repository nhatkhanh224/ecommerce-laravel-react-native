import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ADDRESS} from "../constants/API";
function Login({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  onLogin = async () => {
    await fetch(ADDRESS+"login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.message == "Login Success") {
          AsyncStorage.setItem('@storage_Key', email);
          navigation.navigate("Home");
        }
      });
  };
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={email}
        onChangeText={(value) => setEmail(value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(value) => setPassword(value)}
      />

      <View style={styles.button}>
        <Button title="Login" onPress={onLogin} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 30,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    margin: 20,
  },
});

export default Login;
