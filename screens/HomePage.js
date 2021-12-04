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
  ScrollView,
  TextInput,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ADDRESS } from "../constants/API";
const { width } = Dimensions.get("window");
function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [key, setKey] = useState("");
  const [product,setProduct] = useState([]);
  const getCategories = async () => {
    try {
      const response = await fetch(ADDRESS + "category");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getProducts = async () => {
    try {
      const response = await fetch(ADDRESS + "product");
      const json = await response.json();
      setProduct(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // const onSearch=async () => {
  //   return fetch(ADDRESS + "search/", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       key:key,
  //     }),
  //   }).then(alert("Add success"));
  // };
  useEffect(() => {
    getCategories();
    getProducts();
  }, []);
  const categoryChildren = () => {
    navigation.navigate("Details");
  };
  return (
    <View style={{ flex: 1, padding: 0 }}>
      <View style={styles.headerContainer}>
        <View style={styles.inputContainer}>
          <TouchableHighlight >
          <FontAwesome name="search" size={24} color="#969696" />
          </TouchableHighlight>
          
          <TextInput style={styles.inputText} placeholder="Bạn tìm gì hôm nay?" onChangeText={(value) => setKey(value)}></TextInput>
        </View>
        {/*  */}
        <View style={styles.cartContainer}>
          <TouchableHighlight
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate("Cart");
            }}
            underlayColor="none"
          >
            <FontAwesome name="shopping-cart" size={24} color="#fff" />
          </TouchableHighlight>
        </View>
        <View style={styles.cartContainer}>
          <TouchableHighlight
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              navigation.navigate("History");
            }}
            underlayColor="none"
          >
            <FontAwesome name="user" size={24} color="#fff" />
          </TouchableHighlight>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.sectionContainer}>
          <Image
            source={{
              uri: "https://salt.tikicdn.com/cache/w1080/ts/banner/01/f6/dc/a7c3a0b717aaf8b0694d8d293c3a4a0c.png.webp",
            }}
            style={styles.sectionImage}
          />

          <Text style={styles.sectionTitle}>Loại sản phẩm</Text>
          {/*  */}
          <ScrollView horizontal={true} data={data} />
          <FlatList
            horizontal={true}
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate("Details", item);
                }}
                underlayColor="white"
              >
                <View style={styles.listItemContainer}>
                  <View style={styles.itemContainer}>
                    <Image
                      source={{
                        uri: item.photo_url,
                      }}
                      style={styles.itemImageCategory}
                    />
                    <Text style={styles.itemName} numberOfLines={2}>
                      {item.name}
                    </Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
          />

          <Text style={styles.sectionTitle}>Sản phẩm</Text>
          {/*  */}
          <FlatList
            horizontal={true}
            data={product}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <TouchableHighlight
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate("ProductDetails", item);
                }}
                underlayColor="white"
              >
                <View style={styles.listItemContainer}>
                  <View style={styles.itemContainer}>
                    <Image
                      source={{
                        uri: item.photo_url,
                      }}
                      style={styles.itemImageCategory}
                    />
                    <Text style={styles.itemName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemPrice}>{item.price} đ</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
          />
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    paddingTop: 15,
    paddingBottom: 4,
    backgroundColor: "#1e88e5",
  },
  inputContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    flex: 1,
    marginLeft: 10,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 2,
  },
  inputText: {
    color: "#969696",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "500",
  },
  cartContainer: {
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    marginTop: 10,
  },
  sectionTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: "#2f2f2f",
    marginVertical: 12,
  },
  sectionImage: {
    width: width - 24,
    height: 130,
    borderRadius: 4,
  },
  listItemContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  itemContainer: {
    width: 100,
    marginRight: 12,
  },
  itemImage: {
    width: 100,
    height: 120,
  },
  itemImageCategory: {
    width: 80,
    height: 80,
  },
  itemName: {
    fontSize: 14,
    color: "#484848",
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2a2a2a",
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
export default Home;
