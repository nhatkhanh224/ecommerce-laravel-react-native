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
} from "react-native";
import { ADDRESS } from "../constants/API";
const Search = ({ route, navigation }) => {
  const { key } = route.params;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getProducts = async () => {
    try {
      const response = await fetch(ADDRESS + "search/" + key );
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <View style={{ flex: 1, padding: 24 }}>
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
                navigation.navigate("ProductDetails", item);
              }}
              underlayColor="white"
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={styles.tinyLogo}
                  source={{
                    uri: item.photo_url,
                  }}
                />
                <Text style={{ marginTop: 20, marginLeft: 15 }}>
                  {item.name}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
      )}
    </View>
  );
};

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
});

export default Search;
