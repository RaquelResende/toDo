import { View, StyleSheet, ImageBackground } from "react-native";
import ComponenteCadastro from "../Componentes/ComponenteCadastro";


export default function () {
  return (
    <ImageBackground
      source={require("../../assets/ceu.jpg")}
      style={style.containe}
    >
      <View style={style.containe}>
        <ComponenteCadastro/>
      </View>
    </ImageBackground>
  );
}
const style = StyleSheet.create({
  containe: {
    flex: 1,
  },
});
