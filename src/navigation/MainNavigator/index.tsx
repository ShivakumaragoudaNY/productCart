import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import CartScreen from '../../screens/CartScreen';
import BarCodeScanScreen from '../../screens/BarCodeScanScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="BarcodeScan" component={BarCodeScanScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
