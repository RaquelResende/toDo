import { View, StyleSheet, ImageBackground } from "react-native";
import ComponenteRecuperarSenha from "../Componentes/ComponenteRecuperarSenha";

export default function () {
  return (
    <ImageBackground
      source={require("../../assets/ceu.jpg")}
      style={style.containe}
    >
      <View style={style.containe}>
        <ComponenteRecuperarSenha />
      </View>
    </ImageBackground>
  );
}
const style = StyleSheet.create({
  containe: {
    flex: 1,
  },
});
