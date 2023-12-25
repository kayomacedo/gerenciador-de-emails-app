import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemeProvider from '../contexts/theme';
import { ThemeContext } from "../contexts/theme";


const EmailCard = ({ email, senha, title, copiarEmail, apagarItem, secretPassword,senhaVisivel}) => {
  const {temazinho} = useContext(ThemeContext);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    return (
    <View style={[styles.boxItem,{width:screenWidth/1.04,backgroundColor:temazinho.card}]}>
      <View style={styles.bts}>
        <TouchableOpacity onPress={copiarEmail}>
          <Ionicons style={{ color: temazinho.iconCopy}} name="copy-outline" size={30} />
        </TouchableOpacity>
        <Text style={{color:'white',fontWeight:'bold'}}>{title}</Text>
        <TouchableOpacity onPress={apagarItem}>
          <Ionicons style={{ color:temazinho.iconTrash }} name="trash-outline" size={30} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.emailSenhaCard} onPress={senhaVisivel}>
        <Text style={[styles.email,{color:temazinho.fontCard,fontWeight:'bold'}]}>Email: {email}</Text>

        <View style={styles.boxSenha}>
          <Text style={[styles.senha,{color:temazinho.fontCard,fontWeight:'bold'}]}>Senha: {senha}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxItem: {
    

    backgroundColor: "#29292e",
    borderRadius: 10,
    padding: 25,
    gap: 5,
    marginBottom:15


  },
  email: {
    fontSize: 14,

    color:'#c4c4cc'
  },
  boxSenha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  senha: {
    fontSize:14,
    color: "#c4c4cc",

  },
  bts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -15,
  },
  emailSenhaCard: {
    padding: 8,
    borderRadius: 5,

  },
});

export default EmailCard;
