import React, { useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  Button,
  TouchableHighlight,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ADDRESS } from "../constants/API";

function Payment({ navigation }) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState([]);
  const CartAPI = ADDRESS + "cart/";
  const getCarts = async () => {
    const username = await AsyncStorage.getItem("@storage_Key");
    try {
      const response = await fetch(CartAPI + username);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    }
  };
  const getTotalCarts = async () => {
    const username = await AsyncStorage.getItem("@storage_Key");
    try {
      const response = await fetch(CartAPI + "total/" + username);
      const json = await response.json();
      setTotal(json);
    } catch (error) {
      console.error(error);
    }
  };
  const getAddress = async () => {
    const username = await AsyncStorage.getItem("@storage_Key");
    try {
      const response = await fetch(ADDRESS + "address/" + username);
      const json = await response.json();
      setAddress(json);
    } catch (error) {
      console.error(error);
    }
  };

  const checkOut = async () => {
    const username = await AsyncStorage.getItem("@storage_Key");
    return fetch(ADDRESS + "checkout/" + username, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total,
      }),
    })
      .then(alert("Payment Success"))
      .then(navigation.navigate("HomePage"));
  };
  useEffect(() => {
    getTotalCarts();
    getCarts();
    getAddress();
  }, []);

  return (
    <View style={{ padding: 24 }}>
      <FlatList
        data={address}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <TouchableHighlight>
            <View style={{ flexDirection: "row" }}>
              <View>
                <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 25 }}>
                  <FontAwesome name="map-marker" size={24} color="#969696" />
                  Địa chỉ đặt hàng
                </Text>
                <Text style={{ marginTop: 10, marginLeft: 15 }}>
                  {item.name}
                </Text>
                <Text style={{ marginTop: 10, marginLeft: 15 }}>
                  {item.address}
                </Text>
                <Text style={{ marginTop: 10, marginLeft: 15 }}>
                  {item.phone_number}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
      <Text style={{ marginTop: 10, marginBottom: 20, fontSize: 25 }}>
        <FontAwesome name="shopping-basket" size={24} color="#969696" />
        Chi tiết đơn hàng
      </Text>
      <FlatList
        data={data}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <TouchableHighlight>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.tinyLogo}
                source={{
                  uri: item.photo_url,
                }}
              />
              <View>
                <Text style={{ marginTop: 10, marginLeft: 15 }}>
                  {item.product_name}
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginLeft: 10 }}>
                    {" "}
                    Số lượng : {item.quantity}
                  </Text>
                  <Text style={{ marginLeft: 15 }}>
                    Giá: {item.quantity * item.price} đ
                  </Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
        )}
      />
      <View>
        <Text style={{ marginTop: 30, marginBottom: 100, fontSize: 25 }}>Tổng tiền : {total} đ</Text>
      </View>
      <View style={styles.fixToText}>
        <Button title="Quay lại" />
        <Button title="Đặt hàng" onPress={checkOut} />
      </View>
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
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    margin: 30,
    borderWidth: 1,
    padding: 10,
  },
});
export default Payment;
