import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
  Button,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADDRESS } from "../constants/API";
var width = Dimensions.get("window").width;
const History = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getOrders = async () => {
    const username = await AsyncStorage.getItem("@storage_Key");
    try {
      const response = await fetch(ADDRESS + "history/" + username);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 20, textAlign: "center",marginBottom:30 }}>
        Lịch sử đơn hàng
      </Text>
      <View style={{flexDirection: "row",padding:20}}>
      <Text>Mã đơn</Text>
      <Text style={{marginLeft:25}}>Ngày mua hàng</Text>
      <Text style={{marginLeft:45}}>Tổng tiền</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate("HistoryDetails", item);
              }}
              underlayColor="white"
            >
              <View style={{ flexDirection: "row" }}>
                <View style={styles.itemContainer}>
                  <Text
                    style={{ marginTop: 10, marginLeft: 15, color: "white" }}
                  >
                    {item.id}
                  </Text>
                  <Text
                    style={{ marginTop: 10, marginLeft: 40, color: "white" }}
                  >
                    {item.created_at}
                  </Text>
                  <Text
                    style={{ marginTop: 10, marginLeft: 15, color: "white" }}
                  >
                    {item.amount} đ
                  </Text>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#1A94FF",
    width: width,
    margin: 10,
    flexDirection: "row",
    padding: 10,
  },
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
});

export default History;
