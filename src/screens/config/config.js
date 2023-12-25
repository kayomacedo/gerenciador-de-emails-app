import LottieView from "lottie-react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";


import { Ionicons } from "@expo/vector-icons"; // ou importe o ícone que você deseja usar
import { ThemeContext } from "../../contexts/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Configs() {
  const chave = "@MydataTheme:dataTheme";
  const [myTheme, setMyTheme] = useState({});
  const [status, setStatus] = useState("darkmode");
  const { changeTheme } = useContext(ThemeContext);
  const { pegarTema, temazinho, theme } = useContext(ThemeContext);

  const setMyThemebase = async () => {
    const newTheme = {
      darkmode: {
        backgroundColor: "#202024",
        color: "#e1e1e6",
        status: "darkmode",
        icon: "moon-outline",
        title: "Dark Mode",
      },
      lightmode: {
        backgroundColor: "white",
        color: "black",
        status: "lightmode",
        icon: "sunny-outline",
        title: "Light Mode",
      },
    };

    try {
      // Se o item já existir no AsyncStorage
      const temaExistente = await AsyncStorage.getItem(chave);

      //if (temaExistente == null){

      await AsyncStorage.setItem(chave, JSON.stringify(newTheme));
      //}
    } catch (error) {
      // Tratamento de erro
      console.error("Erro ao adicionar novos dados:", error);
    }
  };

  const getDataTheme = async () => {
    const value = await AsyncStorage.getItem(chave);
    const convertida = JSON.parse(value);
    setMyTheme(convertida);
  };

  useEffect(() => {
    setMyThemebase();
    getDataTheme();
  }, [status]); // Certifique-se de incluir o valor como dependência

  return (
    <View
      style={[styles.container, { backgroundColor: temazinho.backgroundColor }]}
    >
      <View style={[styles.header]}>
        <Ionicons name="settings-outline" color={temazinho.secondary} size={50} />
        <Text style={[styles.title, { color: temazinho.secondary }]}>
          Configurações
        </Text>
      </View>
      <View style={styles.body}>
        <View style={styles.box}>

          <Text style={[styles.title,{color:temazinho.color}]}>Mudar Tema:</Text>

        <TouchableOpacity onPress={changeTheme}>
          <Ionicons name={temazinho.icon} color={temazinho.color} size={100} />
        </TouchableOpacity>

        <Text style={{ color: temazinho.color}}>{temazinho.title}</Text>

        </View>
        <Text style={{ color: temazinho.placeholder}}>Versão: 1.01</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202024",
    alignItems: "center",

    width: "100%",
  },
  header: {
    backgroundColor: "#121214",
    width: "100%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  title: {
    color: "#e1e1e6",
    fontSize: 20,
  },
  body: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: 15,
    alignItems: "center",
 
  },
  titleTheme: {
    color: "#c4c4cc",
    fontSize: 20,
  },
  theme: {
    marginTop: 15,
  },
  box:{
    gap:25,
    flex:1/1.13,
    width:'100%',
    
    alignItems:'center',
    marginTop:25

  },

  version: {
    flex:1,
    fontSize: 90,
    
    color: "white",
  },
});
