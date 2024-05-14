/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';


import { View, ActivityIndicator } from 'react-native';
import LoginScreen from '../screens/Auth/LoginScreen';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colors from '../style/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from '../screens/Home/HomeScreen';


const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const [auth, setAuth] = useState('');
  const [load, setLoad] = useState(true);
  useEffect(() => {
    getUserData();
  }, []);
  const getUserData = async () => {
    try {
       
        const getData =  await AsyncStorage.getItem('token');
      if (getData) {
        setAuth(getData);
        console.log(auth,'auth');
      }
      setLoad(false);
    } catch (error) {
      console.log('Initiate data error');
      setLoad(false);
    }
  };
  return load === false ? (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={auth === '' ? 'LoginScreen' : 'HomeScreen'}>
      {/* LOgIN SCREENS ============================= */}
      <Stack.Screen name="LoginScreen" component={LoginScreen} />

      {/* Home Screen ============================= */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />


    </Stack.Navigator>
      ) : (
    <View>
      <ActivityIndicator size={20} color={colors.brand_primary} />
    </View>
  );
};

export default AppNavigation;
