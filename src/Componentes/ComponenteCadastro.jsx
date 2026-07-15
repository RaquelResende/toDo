import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function ComponenteCadastro() {
  const navigation = useNavigation();

  async function SalvarNovoUsuario() {
    try{
      if(nome.trim() === "" || senha.trim() === ""){
        alert("Precisa preencher os campo");return
      }

      if(senha.length < 6){
        alert("Senha deve conter 5 caracterer");return
      }

      if(!/[A-Z]/.test(senha)){
        alert("Sua senha deve conter pelo menos uma letra maúscula");return
      }
      if(!/[0-9]/.test(senha)){
     alert("Sua senha deve conter pelo menos um numero")
      }
      const novoUsuario = {
        id: Date.now().toString(),
        nome,
        senha,
      };

      const dados = await AsyncStorage.getItem("usuarios");
      let lista = []

      if(dados !== null ){
        lista = JSON.parse(dados);
      }
      lista.push(novoUsuario);

      

      await AsyncStorage.setItem("usuarios", JSON.stringify(lista));
      setUsuarios(lista);

      setNome("");
      setSenha("");
       alert("Usuario salvo com sucesso!")
    }catch(error){
      console.log
    }
    
  }

  return (
    <ImageBackground
      source={require("../../assets/ceu.jpg")}
      style={style.backgroudImagem}
    >


      <View style={style.containe}>
        <View style={style.cardLogin}>

             <View style={style.tituloContaine}>
        <Text style={style.titulo}>Cadastro</Text>
          </View>
          <View>
            <Text style={style.texto}>E-mail</Text>
            <TextInput style={style.input}></TextInput>

            <Text style={style.texto}>Nova Senha:</Text>
            <TextInput style={style.input}></TextInput>
          </View>

          <View>
            <TouchableOpacity 
            onPress={SalvarNovoUsuario}  style={style.botaoContaine}>
              <Text style={style.botaoTexto}>Cadastrar</Text>
            </TouchableOpacity>
          </View>

          <View style={style.subtituloCntainer}>
            <Text>
              Volte para o Login |
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Link style={style.link}> clique aqui !</Link>
              </TouchableOpacity>
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
const style = StyleSheet.create({
  containe: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },

  cardLogin: {
    width: "80%",
    height:"95%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#000000",
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.3)", // fundo transparente
    marginTop: 100,
  },

  backgroudImagem: {
    width: "100%",
  },

  titulo: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    color: "#fff",
    fontSize: 20,
    margin: 20,
  },

  tituloContaine: {
    justifyContent: "center",
    alignItems: "center",
  },

  texto: {
    color: "#fff",
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderColor: "#8c8989",
    borderWidth: 0.5,
    borderRadius: 10,
    marginBottom: 10,
    color: "#fff",
    fontSize: 15,
  },
  botaoContaine: {
    alignItems: "center",
    backgroundColor: "#062429",
    borderRadius: 10,

    margin: 10,
  },
  botaoTexto: {
    color: "#fff",
    paddind: 4,
  },
  subtituloCntainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  link: {
    color: "#fff",
    textDecorationColor: "none",
  },
});
