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
  Dimensions
} from "react-native";
import { ADDRESS } from "../constants/API";
var width = Dimensions.get("window").width;
const HistoryDetails = ({ route, navigation }) => {
  const order_id = route.params.id;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getOrders = async () => {
    try {
      const response = await fetch(ADDRESS + "history/detail/" + order_id);
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
    <View style={{ flex: 1, padding:8 }}>
    <Text style={{ fontSize: 20, textAlign: "center",marginBottom:30 }}>
        Chi tiết đơn hàng
      </Text>
      <View style={{flexDirection: "row",padding:20}}>
      <Text style={{marginLeft:15}} >Sản phẩm</Text>
      <Text style={{marginLeft:45}}>Số lượng</Text>
      <Text style={{marginLeft:45}}>Giá tiền</Text>
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
                    style={{ marginTop: 10, marginLeft: 10, color: "white",width:100 }}
                  >
                    {item.product_name}
                  </Text>
                  <Text
                    style={{ marginTop: 10, marginLeft: 30, color: "white" }}
                  >
                    {item.quantity}
                  </Text>
                  <Text
                    style={{ marginTop: 10, marginLeft: 75, color: "white" }}
                  >
                    {item.price} đ
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

export default HistoryDetails;
