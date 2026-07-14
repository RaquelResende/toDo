import { View, TextInput, Text, StyleSheet, ImageBackground, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function ComponenteLogin(){

  const navigatio = useNavigation()




    return(


        <ImageBackground
         source={require("../../assets/ceu.jpg")}
         style={style.backgroudImagem}
        >       
        <View style={style.containe}>

      <View style={style.cardLogin}>  

         <View style={style.tituloContaine}  >
            <Text style={style.titulo}>Login</Text>
             </View>
            
        <View>
        <Text style={style.texto}>Usuario:</Text>
        <TextInput style={style.input}
         >
        </TextInput>
        
        <Text style={style.texto}>Senha:</Text>
        <TextInput style={style.input}
         >
        </TextInput>
        </View>

       <View>
        <TouchableOpacity style={style.botaoContaine}>
            <Text style={style.botaoTexto}>
                Entrar
            </Text>
        </TouchableOpacity>
       </View>

      <View style={style.subtituloCntainer} >
        <Text>Esqueceu a senha? |<Link style={style.link}> clique aqui</Link> </Text>
    </View>
       
    </View>
      </View>
      </ImageBackground>
       
    )

}
const style = StyleSheet.create({
    containe:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
         marginTop:"10%",
       
  },
 
      cardLogin:{
       width: "15%",
       padding: 20,
       borderWidth: 1,
       borderColor: "#000000",
       borderRadius: 15,
       backgroundColor: "rgba(0,0,0,0.3)", // fundo transparente
  },

    backgroudImagem:{
     width:"100%",
    },
    
    titulo:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    color:"#fff",
    fontSize:30,
    marginBottom:30,
    },
    
    tituloContaine:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },

    texto:{
    color:"#fff",
    
    },
    input:{
    backgroundColor:"#fff",
    borderWidth:1,
    borderRadius:10,
    },
    botaoContaine:{
        alignItems:"center",
        backgroundColor:"#062429",
        borderRadius:3,
        paddingHorizontal:30,
       margin:10,


    },
    botaoTexto:{
        color:"#fff",

    },
    subtituloCntainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    link:{
        color:"#fff",
        textDecorationColor:"none",
    }
})