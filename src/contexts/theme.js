import React,{createContext,useEffect,useState} from "react";
export const ThemeContext = createContext({});
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";



function ThemeProvider({children}){

  const [themeAtual,setThemeAtual] = useState('darkmode');
  const chave = "@MydataThemes:dataThemes";
  const chaveDark = "@MydataThemeAtual:dataThemeAtual";

  
  const [temazinho,setTemazinho] = useState({}); 
 
  const myThemes = {darkmode:{
    backgroundColor: "#202024",
    color: "#e1e1e6",
    status: "darkmode",
    primary:'#121214',
    secondary:'white',
    placeholder:'grey',
    alternative:'#009d6a',
    icon:"moon-outline",
    title:'Dark Mode',
    iconAlternative:'#00b37e',
    iconAlternativeTwo:'#00b37e',
    card:'#29292e',
    fontCard:'#c4c4cc',
    tituloCard:'white',
    iconCopy:'#00b37e',
    iconTrash:'#aa2834',
    
  }, lightmode:{
    backgroundColor: "#aaf0d1",
    color: "black",
    status: "lightmode",
    primary:'#00b37e',
    secondary:'white',
    placeholder:'grey',
    alternative:'#aaf0d1',
    icon:"sunny-outline",
    title:'Light Mode',
    iconAlternative:'#00b37e',
    iconAlternativeTwo:'black',
    card:'#00b37e',
    fontCard:'white',
    tituloCard:'white',
    iconCopy:'black',
    iconTrash:'#d64552',
    
  }};

 

  const apagar= async () => {
    AsyncStorage.clear()
    
    
  };
  const theme = async () => {
    
    const value = await AsyncStorage.getItem(chave);
    const valueThemeAtual = await AsyncStorage.getItem(chaveDark);
    setThemeAtual(valueThemeAtual)
    const convertida = JSON.parse(value);

    if (!valueThemeAtual){
      AsyncStorage.setItem(chaveDark,themeAtual);
      valueThemeAtual = await AsyncStorage.getItem(chaveDark);
      setThemeAtual(valueThemeAtual)
    }
    if(!value){
      AsyncStorage.setItem(chave, JSON.stringify(myThemes))
      value = await AsyncStorage.getItem(chave);

    }
    
    setTemazinho(convertida[valueThemeAtual])
  
    
    
  };
  useEffect(() => {
   theme();
  },[]); // Certifique-se de incluir o valor como dependência
  

  const changeTheme = async() => {
    const value = await AsyncStorage.getItem(chave);
    const valueThemeAtual = await AsyncStorage.getItem(chaveDark);
    setThemeAtual(valueThemeAtual)
    const convertida = await (JSON.parse(value))

    if (valueThemeAtual ==='darkmode'){

      AsyncStorage.setItem(chaveDark, 'lightmode')

    }else{
      AsyncStorage.setItem(chaveDark, 'darkmode')

    }

    setTemazinho(convertida[valueThemeAtual])
    
    theme();
    
    
    
   
    

  

    
   
  };
  

  
 

    
    return(
        <ThemeContext.Provider value={{changeTheme,theme,temazinho,themeAtual}}>
            {children}
        </ThemeContext.Provider>    
    )
}

export default ThemeProvider;



