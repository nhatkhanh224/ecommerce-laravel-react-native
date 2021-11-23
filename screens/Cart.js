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
} from "react-native";
import { ADDRESS } from "../constants/API";

function Cart({ navigation }) {
  const [data, setData] = useState([]);

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
  // const getTotalCarts = async () => {
  //   const username = await AsyncStorage.getItem("@storage_Key");
  //   try {
  //     const response = await fetch(CartAPI + "total/" + username);
  //     const json = await response.json();
  //     setTotal(json);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const plus = (product_id) => {
    return fetch(ADDRESS + "cart/update/" + product_id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: 1,
      }),
    })
      .then(getCarts())
      .then(alert("Increase Quantity Success"));
  };
  const minus = (product_id) => {
    return fetch(ADDRESS + "cart/update/" + product_id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        quantity: -1,
      }),
    })
      .then(getCarts())
      .then(alert("Decrease Quantity Success"));
  };
  const deleteCart = (product_id) => {
    return fetch(ADDRESS + "cart/delete/" + product_id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(getCarts())
      .then(alert("Delete Success "));
  };
  useEffect(() => {
    getCarts();
  }, []);
  
  return (
    
    <View style={{ flex: 1, padding: 24 }}>
      {data.length==0 ? <Text style={{ marginTop:200}}>Không có sản phẩm nào trông giỏ hàng của bạn</Text>: <Text></Text>}
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
                  {item.quantity > 1 ? (
                    <Button title="-" onPress={() => minus(item.product_id)} />
                  ) : (
                    <Button disabled title="-" />
                  )}
                  <Text>{item.quantity}</Text>
                  <Button title="+" onPress={() => plus(item.product_id)} />
                  <Text>{item.quantity * item.price} đ</Text>
                </View>
              </View>
              <View>
                <Button title="X" onPress={() => deleteCart(item.product_id)} />
              </View>
            </View>
          </TouchableHighlight>
        )}
      />

      <View style={styles.fixToText}>
        <Button title="Quay lại" />
        <Button
          title="Thanh toán"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            navigation.navigate("Payment");
          }}
        />
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
  },
});
export default Cart;
