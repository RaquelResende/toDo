import { useState, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { TextInput } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home() {
  const colunasInicial = [
    {
      id: "1",
      titulo: "A Fazer",
      tarefas: [
        {
          id: "1",
          nome: "Projeto React-native",
        },
      ],
    },
    {
      id: "2",
      titulo: "Fazendo",
      tarefas: [
        {
          id: "1",
          nome: "Organizando tarefaz",
        },
      ],
    },
    {
      id: "3",
      titulo: "Concluido",
      tarefas: [
        {
          id: "1",
          nome: "O que será o projeto",
        },
      ],
    },
  ];
  const navigation = useNavigation();
  const [modalVisivel, setModalVisivel] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [colunaSelecionada, setColunaSelecionada] = useState(null);
  const [colunas, setColunas] = useState(colunasInicial);

  function adicionarModal(idColuna) {
    setColunaSelecionada(idColuna);
    setModalVisivel(true);
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      const dados = await AsyncStorage.getItem("colunas");

      if (dados != null) {
        setColunas(JSON.parse(dados));
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function salvarTarefas(lista) {
    try {
      await AsyncStorage.setItem("colunas", JSON.stringify(lista));
    } catch (error) {
      console.log(error);
    }
  }

  async function adicionarTarefa() {
    if (!novaTarefa.trim()) return;
    const novaLista = [...colunas];

    const coluna = novaLista.find((coluna) => coluna.id === colunaSelecionada);

    coluna.tarefas.push({ id: Date.now().toString(), nome: novaTarefa });

    setColunas(novaLista);

    await salvarTarefas(novaLista);

    setNovaTarefa("");
    setModalVisivel(false);
  }

  async function removerTarefa(idColuna, idTarefa) {
    const novaLista = [...colunas];
    const coluna = novaLista.find((coluna) => coluna.id === idColuna);

    coluna.tarefas = coluna.tarefas.filter((tarefa) => tarefa.id !== idTarefa);

    setColunas(novaLista);
    await salvarTarefas(novaLista);
  }

  function navegarSobre() {
    navigation.navigate("Sobre");
  }

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Pesquisar")}>
          <Ionicons name="search" size={20} color="#000000" />
        </TouchableOpacity>
      </View>
      {/* Testes de navegação */}
      {/* <View>
        <TouchableOpacity onPress={() => navigation.navigate("Pesquisa")}>
          <Text>Ir para Pesquisa </Text>
        </TouchableOpacity>
      </View> */}
      {colunas.map((coluna) => (
        <View key={coluna.id} style={style.coluna}>
          <Text style={style.titulo}>{coluna.titulo}</Text>
          <TouchableOpacity onPress={() => adicionarModal(coluna.id)}>
            <Ionicons name="add-circle" size={40} color="#2196F3" />
          </TouchableOpacity>
          <FlatList
            data={coluna.tarefas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={style.cards}>
                <Text>{item.nome}</Text>

                <TouchableOpacity
                  style={style.botaoSubitrair}
                  onPress={() => removerTarefa(coluna.id, item.id)}
                >
                  <Ionicons name="remove-circle" size={20} color="#cb2140" />
                </TouchableOpacity>
              </View>
            )}
          />
          <Modal
            visible={modalVisivel}
            transparent={true}
            animationType="slide"
          >
            <View>
              <TouchableOpacity
                style={style.botaoModalContaine}
                onPress={() => setModalVisivel(false)}
              >
                <Text style={style.botaoModal}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={style.topo}>
              <View>
                <TextInput
                  style={style.input}
                  placeholder="Digite sua tarefa"
                  value={novaTarefa}
                  onChangeText={setNovaTarefa}
                />
              </View>

              <View style={style.botaoContainer}>
                <TouchableOpacity onPress={adicionarTarefa} style={style.botao}>
                  <Text style={style.textoBotao}>Adicionar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setModalVisivel(false)}
                  style={style.botao}
                >
                  <Text style={style.textoBotao}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      ))}
    </ScrollView>
  );
}
const style = StyleSheet.create({
  coluna: {
    width: "100%",
    margin: 10,
    backgroundColor: "#ECEFF1",
    padding: 10,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  cards: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  botaoModalContaine: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 15,
  },
  botaoModal: {
    width: 30,
    height: 30,
    backgroundColor: "#880909",
    textAlign: "center",
    color: "#fff",
    borderRadius: 10,
    borderColor: "#880909",
    borderCurve: 20,
    paddingTop: 3,
  },
  topo: {
    padding: 15,
    backgroundColor: "#242323",
    // width: "50%",
    // height: "50%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    paddingVertical: 10,
  },
  botaoSubitrair: {
    justifyContent: "flex-end",
  },
  botao: {
    backgroundColor: "#2196f3",
    padding: 7,
    borderRadius: 8,
    marginBottom: 10,
  },
  botaoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  textoBotao: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
