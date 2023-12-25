import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  SafeAreaView,
  Dimensions,
  Modal,
  StatusBar

} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { ThemeContext } from "../../contexts/theme";
import { Ionicons } from "@expo/vector-icons"; // ou importe o ícone que você deseja usar
import EmailCard from "../../componentes/ItemList";
import CustomModal from "../../componentes/custonModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";
import emptyAnimation from "../../assets/empy.json";
import * as Clipboard from 'expo-clipboard';
 
export default function Home() {

  const [inputColor, setInputColor] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const {temazinho} = useContext(ThemeContext);
  const [screenHeight, setScreenHeight] = useState(
    Dimensions.get("window").height
  );
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get("window").width
  );
  const [meusEmails, setmeusEmails] = useState([]);
  const [data, setData] = useState([]);
  const chave = "@Mydata:data";



  const getData = async () => {
    const value = await AsyncStorage.getItem(chave);
    const convertida = JSON.parse(value);

    setData(convertida);
  };

  useEffect(() => {
    // Este bloco será executado sempre que o valor mudar
    if (!modalVisible) {
      getData();
    }
  }, [modalVisible]); // Certifique-se de incluir o valor como dependência

  const abrirModal = () => {
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
  };

  const apagarItem = async (indexToRemove) => {
    try {
      const value = await AsyncStorage.getItem(chave);
      const convertida = JSON.parse(value);

      // Usando um nome diferente para evitar confusão
      const novosDados = convertida.filter(
        (item, index) => index !== indexToRemove
      );

      // Salvar os dados atualizados no AsyncStorage
      await AsyncStorage.setItem(chave, JSON.stringify(novosDados));
      getData();
    } catch (error) {
      console.error("Erro ao apagar item:", error);
    }
  };

  const senhaVisivel = (index) => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index].visivel = !newData[index].visivel;
   
 
      return newData;
    });
  };

  const copiarEmail = async (email) => {
  
    await Clipboard.setStringAsync(email);
    
  }

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      
      <View style={[styles.container,{backgroundColor:temazinho.backgroundColor}]}>
      <StatusBar backgroundColor={'#121214'} barStyle="ligth-content" />
        <View style={styles.header}>
          <Ionicons name="mail-outline" color={temazinho.secondary} size={50} />
          <Text style={[styles.title,{color:temazinho.secondary}]}>Meus E-mails</Text>
        </View>
        <TouchableOpacity onPress={abrirModal}>
          <Ionicons style={[styles.btAdd,{color:temazinho.iconAlternativeTwo}]} name="add-circle-outline" size={60} />
        </TouchableOpacity>

        <View style={[styles.body]}>
          <CustomModal
            visible={modalVisible}
            onClose={fecharModal}
            onAdicionar={() => {
              // Adicionar lógica de adicionar aqui, se necessário
              fecharModal();
              handFethData();
            }}
          />

          <ScrollView style={{ flex: 2 }}>
            {data && data.length > 0 ? (
              data.map((emailData, index) => (
                
                <EmailCard
                  key={index}
                  email={emailData.email}
                  senha={ emailData.visivel ? emailData.senha: '***'}
                  title={emailData.titulo}
                  secretPassword={setData.visivel}
                  apagarItem={() => apagarItem(index)}
                  senhaVisivel={() => senhaVisivel(index)}
                  copiarEmail={()=>copiarEmail(emailData.email)}
                 
                />
                
              ))
            ) : (
              <View>
                <Text style={{ color:temazinho.color, marginTop: 50, width:screenHeight/2, textAlign:'center', fontSize:18 }}>
                  Não há contas armazenadas.
                </Text>
                <View style={[styles.lottieAnimation,{backgroundColor:temazinho.alternative}]}>
                <LottieView
                  autoPlay
                  style={{
                    width: '100%',
                    height: 320,
                  
                  
                  }}
                  // Find more Lottie files at https://lottiefiles.com/featured
                  source={require("../../assets/empy.json")}
                />
                </View>
                
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202024",
    alignItems: "center",
    justifyContent: "center",
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
    alignItems: "center",
    justifyContent: "center",
    gap: 15,
  },

  inputs: {
    flex: 3,
  },

  btAdd: {
    color: "#00b37e",
    marginTop: 20,
    marginBottom: 20,
  },
  lottieAnimation:{
    backgroundColor:'#00b37e',
    alignItems:'center', 
    marginTop:15,
  }
});
