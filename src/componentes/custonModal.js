import React, { useState,useContext } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import ThemeProvider from '../contexts/theme';
import { ThemeContext } from "../contexts/theme";




const CustomModal = ({ visible, onClose, onAdicionar, setData }) => {
  const {temazinho} = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [titulo, setTitulo] = useState("");
 
  const chave ='@Mydata:data'

  const id = uuid.v4();


    
  const newData = async (value) => {
    const newObj = {
      id: id,
      titulo: titulo,
      email: email,
      senha: senha,
      visivel:false,
    };
    
    
  try {

    // Pegar todos os dados existentes no AsyncStorage
    const dadosAntigos = await AsyncStorage.getItem(chave);
    let dadosAtuais = dadosAntigos ? JSON.parse(dadosAntigos) : [];

    // Adicionar newObj aos dados existentes
    dadosAtuais.push(newObj);

    // Salvar os dados atualizados no AsyncStorage
    await AsyncStorage.setItem(chave, JSON.stringify(dadosAtuais));

   
  } catch (error) {
    // Tratamento de erro
    console.error('Erro ao adicionar novos dados:', error);
  }
  onClose();
  };
  
  
  

  return (
    <ThemeProvider>

    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
      >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={[styles.modalContent,{backgroundColor:temazinho.primary}]}>
              <TouchableOpacity onPress={onClose}>
                <Ionicons
                  style={{ color: "#f75a68", textAlign: "right" }}
                  name="close-outline"
                  size={30}
                  />
              </TouchableOpacity>

              <Text style={{ color:temazinho.color }}>Digite o Titulo:</Text>
              <TextInput
                style={[styles.input,{borderColor:temazinho.color, backgroundColor:temazinho.secondary,color:'black'}]}
                placeholder="Titulo"
                placeholderTextColor={temazinho.placeholder}
                onChangeText={(text) => setTitulo(text)}
                />

              <Text style={{ color:temazinho.color}}>Digite o Email:</Text>
              <TextInput
                style={[styles.input,{borderColor:temazinho.color, backgroundColor:temazinho.secondary,color:'black'}]}
                placeholder="Email"
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor={temazinho.placeholder}
                onChangeText={(text) => setEmail(text)}
                />

              <Text style={{color:temazinho.color}}>Digite a Senha:</Text>
              <TextInput
                style={[styles.input,{borderColor:temazinho.color, backgroundColor:temazinho.secondary,color:'black'}]}
                placeholder="Senha"
                placeholderTextColor={temazinho.placeholder}
                onChangeText={(text) => setSenha(text)}
                secureTextEntry={true}
                autoCapitalize="none"
                />

              <TouchableOpacity
                style={styles.button}
                onPress={newData}
                >
                <Ionicons
                  style={[styles.btAdd,{color:temazinho.iconAlternativeTwo}]}
                  name="arrow-forward-outline"
                  size={30}
                  />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
</ThemeProvider>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "#202024",
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    color: "white",
  },

  btAdd: {
    color: "#00b37e",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default CustomModal;
