import React, { useEffect, useState, useContext } from "react";
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
import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ADDRESS } from "../constants/API";
var width = Dimensions.get("window").width; //full width
var height = Dimensions.get("window").height; //full height
function ProductDetails({ route, navigation }) {
  const product_id = route.params.id;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const productAPI = ADDRESS + "product/" + "detail/";
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    try {
      const response = await fetch(productAPI + product_id);
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addToCartHandler = async () => {
    const username = await AsyncStorage.getItem("@storage_Key");
    return fetch(ADDRESS + "product/" + product_id, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: route.params.id,
        product_name: route.params.name,
        price: route.params.price,
        photo_url: route.params.photo_url,
        quantity: 1,
        username: username,
      }),
    }).then(alert("Add success"));
  };
  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableHighlight>
              <View style={styles.productBackround}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.photo_url,
                  }}
                />
                <Text
                  style={{ textAlign: "center", marginTop: 20, fontSize: 20 }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 20,
                    fontSize: 20,
                    marginBottom: 100,
                  }}
                >
                  {item.price} đ
                </Text>
                <View style={styles.fixToText}>
                  <Button title="Quay lại" />
                  <Button title="Thêm vào giỏ " onPress={addToCartHandler} />
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      )}
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
  },
});

export default ProductDetails;
