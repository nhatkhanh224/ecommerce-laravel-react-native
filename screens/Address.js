import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Button,
  TouchableHighlight,
  TextInput,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADDRESS } from "../constants/API";

function Address({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  useEffect(() => {
    getAddress();
  }, [phone, name, address]);

  const getAddress = async () => {
    const username = await AsyncStorage.getItem("@storage_Key");
    try {
      const response = await fetch(ADDRESS + "address/" + username);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const updateAddressHandler = async () => {
    const username = await AsyncStorage.getItem("@storage_Key");
    await fetch(ADDRESS + "address/" + username, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        address: address,
        phone_number: phone,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.message == "Update Success") {
          alert("Success");
        } else {
          alert("Error");
        }
      });
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
    
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <TouchableHighlight>
            <View style={styles.productBackround}>
              <TextInput
                style={styles.input}
                placeholder="Name"
                defaultValue={item.name}
                setName={item.name}
                onChangeText={(value) => setName(value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                defaultValue={item.address}
                onChangeText={(value) => setAddress(value)}
              />
              <TextInput
                style={styles.input}
                placeholder="Numbers of phone"
                defaultValue={item.phone_number}
                onChangeText={(value) => setPhone(value)}
              />

              <View style={styles.fixToText}>
                <Button title="Quay lại" />
                <Button title="Cập nhật" onPress={updateAddressHandler} />
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
      )
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginTop: 10,
  },
  logo: {
    width: 66,
    height: 58,
  },
  image: {
    width: 300,
    height: 300,
    marginTop: 20,
    borderRadius: 30,
  },
  productBackround: {},
  logo: {
    width: 66,
    height: 58,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
  },
  input: {
    height: 40,
    margin: 30,
    borderWidth: 1,
    padding: 10,
  },
});

export default Address;
