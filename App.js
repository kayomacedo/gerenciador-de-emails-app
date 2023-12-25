import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MyStack from './src/routes/route';
import ThemeProvider from './src/contexts/theme';

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>

      <MyStack />
      </ThemeProvider>
    </NavigationContainer>
  );
}
