import { View,  StyleSheet, ImageBackground,} from "react-native"
import ComponenteLogin from "../Componentes/ComponenteLogin"

export default function (){
    return(
        <ImageBackground
        source={require("../../assets/ceu.jpg")}
        style={style.containe}
        >
        <View style={style.containe}>
        <ComponentePesquisa/>
        </View>
       
        </ImageBackground>
     
    )

}
const style = StyleSheet.create({
    containe:{
        flex:1,
    
    }
})