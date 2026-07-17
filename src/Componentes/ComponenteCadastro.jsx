import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

export default function ComponenteCadastro() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const navigation = useNavigation();
  const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

  async function SalvarNovoUsuario() {
    try {
      if (nome.trim() === "" || senha.trim() === "") {
        alert("Precisa preencher os campo");
        return;
      }

      if (senha.length < 6) {
        alert("Senha deve conter pelo menos 6 caractereres");
        return;
      }

      if (!/[A-Z]/.test(senha)) {
        alert("Sua senha deve conter pelo menos uma letra maúscula");
        return;
      }
      if (!/[0-9]/.test(senha)) {
        alert("Sua senha deve conter pelo menos um numero");
        return;
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
      console.log(error.message);
    }
  }

  async function resgatarUsuario() {
    try {
      if (mostrarUsuarios) {
        setMostrarUsuarios(false);
        return;
      }
      const dados = await AsyncStorage.getItem("usuarios");

      if (dados !== null) {
        setUsuarios(JSON.parse(dados));
        setMostrarUsuarios(true);
      } else {
        alert("Nao há nenhum usuario cadastrado");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  async function removerUsuario(idUsuario) {
    try {
      const novaLista = usuarios.filter((usuario) => usuario.id !== idUsuario);
      await AsyncStorage.setItem("usuarios", JSON.stringify(novaLista));

      setUsuarios(novaLista);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function selecionarUsuario(usuario) {
    setUsuarioSelecionado(usuario);
    setNome(usuario.nome);
    setSenha(usuario.senha);
  }

  async function atualizarUsuario() {
    try {
      const novaLista = usuarios.map((usuario) => {
        if (usuario.id === usuarioSelecionado.id) {
          return {
            ...usuario,
            nome,
            senha,
          };
        }
        return usuario;
      });
      await AsyncStorage.setItem("usuarios", JSON.stringify(novaLista));

      setUsuarios(novaLista);
      setUsuarioSelecionado(null);
      setNome("");
      setSenha("");
    } catch (error) {
      console.log(error.message);
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
            <TextInput
              style={style.input}
              value={nome}
              onChangeText={setNome}
            ></TextInput>

            <Text style={style.texto}>Nova Senha:</Text>
            <TextInput
              style={style.input}
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            ></TextInput>
          </View>

          <View>
            <TouchableOpacity
              onPress={
                usuarioSelecionado ? atualizarUsuario : SalvarNovoUsuario
              }
              style={style.botaoContaine}
            >
              <Text style={style.botaoTexto}>
                {usuarioSelecionado ? "Atualiza" : "Cadastrar"}
              </Text>
            </TouchableOpacity>
          </View>

          <View>
            <TouchableOpacity
              onPress={resgatarUsuario}
              style={style.botaoContaine}
            >
              <Text style={style.botaoTexto}>
                {mostrarUsuarios ? "Ocultar" : "Exibir"}
              </Text>
            </TouchableOpacity>
          </View>
          {mostrarUsuarios && (
            <View>
              {usuarios.map((usuario) => (
                <View key={usuario.id}>
                  <TouchableOpacity onPress={() => selecionarUsuario(usuario)}>
                    <Text>{usuario.nome}</Text>
                    <Text>{usuario.senha}</Text>
                  </TouchableOpacity>

                  <View style={style.trash}>
                    <TouchableOpacity
                      onPress={() => removerUsuario(usuario.id)}
                      style={style.botaoExcluirUsuario}
                    >
                      <Text style={style.trash}>
                        <FontAwesome name="trash" size={20} color={"#a80b0b"} />
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
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
    height: "95%",
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
    fontSize: 15,
    padding: 5,
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
  trash: {
    alignSelf: "flex-end",
  },
});
