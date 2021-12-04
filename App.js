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
  SafeAreaView,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategoryChidren from "./screens/CategoryChildren";
import Home from "./screens/Home";
import Product from "./screens/Product";
import ProductDetails from "./screens/ProductDetails";
import Login from "./screens/Login";
import Cart from "./screens/Cart";
import Payment from "./screens/Payment";
import Address from "./screens/Address";
import HomePage from "./screens/HomePage";
import History from "./screens/History";
import HistoryDetails from "./screens/HistoryDetails";
import Search from "./screens/Search";
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            headerRight: () => (
              <Button
                title="Cart"
                onPress={() => navigation.navigate("Cart")}
              />
            ),
          })}
        />
        <Stack.Screen name="Details" component={CategoryChidren} />
        <Stack.Screen name="Product" component={Product} />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={({ navigation }) => ({
            headerRight: () => (
              <TouchableHighlight
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate("Cart");
                }}
                underlayColor="none"
              >
                <FontAwesome name="shopping-cart" size={24} color="black" />
              </TouchableHighlight>
            ),
            
          })}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="HistoryDetails" component={HistoryDetails} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
    </NavigationContainer>
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

export default App;
