import { View,Text } from "react-native";
import React, { useContext, useEffect } from "react";
import LottieView from "lottie-react-native";
import { ThemeContext } from "../../contexts/theme";
export default function Splash({ navigation }) {
    const {theme} = useContext(ThemeContext);
    useEffect(() => {
        theme()
       
      }, []); // Certifique-se de incluir o valor como dependência
    
 return (
   <View>
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#202024', height:'100%'}}>
            
    <LottieView
                  autoPlay
                  style={{
                    width: '100%',
                    height: 500,
                
                  
                  
                  }}
                  loop={false}
                  speed={0.9}
                  // Find more Lottie files at https://lottiefiles.com/featured
                  source={require("../../assets/splash.json")}
                  onAnimationFinish={() => navigation.navigate('Home')}
                />
        </View>


   </View>
 );
}