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
function Home({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getCategories = async () => {
    try {
      const response = await fetch(ADDRESS+"category");
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  const categoryChildren = () => {
    navigation.navigate("Details");
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
            <TouchableHighlight
              onPress={() => {
                /* 1. Navigate to the Details route with params */
                navigation.navigate("Details", item);
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
});
export default Home;
