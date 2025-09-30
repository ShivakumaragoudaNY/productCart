import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CartScreen from '../../screens/CartScreen';
import BarCodeScanScreen from '../../screens/BarCodeScanScreen';
import ProfileScreen from '../../screens/ProfileScreen';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
      }}>
      <Tab.Screen
        listeners={({navigation}) => ({
          tabPress: e => {
            // @ts-ignore
            navigation.navigate('HomeTab', {screen: 'Home'});
          },
        })}
        name="HomeTab"
        component={HomeStack}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{headerShown: true, title: 'Cart'}}
      />
      <Tab.Screen
        name="BarcodeScan"
        component={BarCodeScanScreen}
        options={{headerShown: true, title: 'Scan'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: true, title: 'Profile'}}
      />
    </Tab.Navigator>
  );
}
