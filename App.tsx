/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import AppNavigation from './src/layouts/navigation/AppNavigation';

export default function App() {

  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </PaperProvider>
  );
}

