import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ComponenteLogin() {
  const navigation = useNavigation();

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  async function salvarNovoUsuario() {
    try {
      if (nome.trim() === "" || senha.trim() === "") {
        alert("Precisa preencher os campo");
        return;
      }

      if (senha.length < 6) {
        alert("Senha deve conter 5 caracterer");
        return;
      }

      if (!/[A-Z]/.test(senha)) {
        alert("Sua senha deve conter pelo menos uma letra maúscula");
        return;
      }
      if (!/[0-9]/.test(senha)) {
        alert("Sua senha deve conter pelo menos um numero");
      }
      const novoUsuario = {
        id: Date.now().toString(),
        nome,
        senha,
      };

      const dados = await AsyncStorage.getItem("usuarios");
      let lista = [];

      if (dados !== null) {
        lista = JSON.parse(dados);
      }
      lista.push(novoUsuario);

      await AsyncStorage.setItem("usuarios", JSON.stringify(lista));
      setUsuarios(lista);

      setNome("");
      setSenha("");
      alert("Usuario salvo com sucesso!");
    } catch (error) {
      console.log;
    }
  }

  async function fazerLogin() {
    try {
      const dados = await AsyncStorage.getItem("usuarios");

      if (dados === null) {
        alert("Nenhum usuario cadastrado!");
        return;
      }

      const lista = JSON.parse(dados);

      const usuarioEncontrado = lista.find(
        (usuario) => usuario.nome === nome && usuario.senha === senha,
      );

      if (usuarioEncontrado) {
        navigation.navigate("Tabs");
        alert("Usuario encontrado com sucesso!");
      } else {
        alert("Nao encontrado esse usuario");
      }
    } catch (error) {
      console.log("Algo deu errado", error);
    }
  }

  async function resgatarUsuario() {
    try {
      const dados = await AsyncStorage.getItem("usuarios");

      if (dados !== null) {
        setUsuarios(JSON.parse(dados));
      } else {
        alert("Usuario nao encontrad");
      }
    } catch (error) {
      console.log("Algo deu errado", error);
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
            <Text style={style.titulo}>Login</Text>
          </View>

          <View>
            <Text style={style.texto}>Usuario:</Text>
            <TextInput
              style={style.input}
              value={nome}
              onChangeText={setNome}
            ></TextInput>

            <Text style={style.texto}>Senha:</Text>
            <TextInput
              style={style.input}
              value={senha}
              onChangeText={setSenha}
            ></TextInput>
          </View>

          <View style={style.containeBts}>
            <View>
              <TouchableOpacity
                onPress={fazerLogin}
                style={style.botaoContaine}
              >
                <Text style={style.botaoTexto}>Entrar</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => navigation.navigate("Cadastrar")}
                style={style.botaoContaine}
              >
                <Text style={style.botaoTexto}>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={style.subtituloCntainer}>
            <Text>
              Esqueceu a senha? |
              <TouchableOpacity
                onPress={() => navigation.navigate("RecuperarSenha")}
              >
                <Text style={style.link}> clique aqui</Text>
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
    marginTop: "10%",
  },

  cardLogin: {
    width: "70%",
    height: "70%",
    padding: 20,
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: 30,
    marginBottom: 30,
  },

  tituloContaine: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  texto: {
    color: "#fff",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
  },
  botaoContaine: {
    alignItems: "center",
    backgroundColor: "#062429",
    borderRadius: 3,
    paddingHorizontal: 20,
    paddingVertical: 3,
    margin: 10,
    marginTop: 20,
  },
  botaoTexto: {
    color: "#fff",
  },
  containeBts: {
    flexDirection: "row",
    gap: 2,
  },
  subtituloCntainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: "#fff",
    textDecorationColor: "none",
  },
});
