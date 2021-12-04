import React from 'react';
import {View, StyleSheet} from 'react-native';
import Test from './Test';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Mytabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Test" component={Test} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({})

export default Mytabs;
