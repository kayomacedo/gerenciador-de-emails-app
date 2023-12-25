import Home from "../screens/home";

import { useState, useContext} from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // ou importe o ícone que você deseja usar
import Configs from "../screens/config/config";

import ThemeProvider from '../contexts/theme';
import Splash from "../screens/splash";




const Tabs = createBottomTabNavigator();

export default function MyStack() {
  
  
  return (

    
    <ThemeProvider>

    
    <Tabs.Navigator
      initialRouteName="Splash"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "#121214",
          borderTopWidth: 0,
        },
      }}
      >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Ionicons
                name="mail-outline"
                color={"#00875f"}
                size={size + 10}
                />
                );
              }
              return (
                <Ionicons name="mail-outline" color={color} size={size + 10} />
                );
              },
              
              headerShown: false,
            }}
            />
      <Tabs.Screen
        name="Config"
        component={Configs}
        options={{
          tabBarIcon: ({ color, size, focused }) => {
            if (focused) {
              return (
                <Ionicons
                name="settings-outline"
                color={"#00875f"}
                size={size + 10}
                />
                );
              }
              
              return (
                <Ionicons name="settings-outline" color={color} size={size + 10} />
                );
              },
              
              headerShown: false,
            }}
            />
             <Tabs.Screen 
             name="Splash" 
             component={Splash} 
              options={{ tabBarButton: () => null,headerShown: false, tabBarOptions: {
                visible: false
              }}} // Isso ocultará a tab na barra de navegação
             
             
             
             />
      
    </Tabs.Navigator>
            </ThemeProvider>
  );
}
