import { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const navigation = useNavigation();

  const [modalVisivel, setModalVisivel] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState("");
  const [colunaSelecionada, setColunaSelecionada] = useState(null);
  const [colunas, setColunas] = useState([
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
  ]);

  function adicionarModal(idColuna) {
    setColunaSelecionada(idColuna);
    setModalVisivel(true);
  }

  function adicionarTarefa() {
    if (novaTarefa === "") return;
    const novaLista = [...colunas];

    novaLista[0].tarefas.push({
      id: Date.now().toString(),
      nome: novaTarefa,
    });
    setColunas(novaLista);
    setNovaTarefa("");
  }

  function removerTarefa(idColuna, idTarefa) {
    const novaLista = [...colunas];
    const coluna = novaLista.find((coluna) => coluna.id === idColuna);
    coluna.tarefas = coluna.tarefas.filter((tarefa) => tarefa.id !== idTarefa);

    setColunas(novaLista);
  }

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("Pesquisa")}>
          <Text>Ir para Pesquisa </Text>
        </TouchableOpacity>
      </View>
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
            transparente={true}
            animationType="slide"
          >
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
    with: 250,
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
    borderWidth: "1",
    borderRadius: 8,
    boderColor: "#ccc",
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
    Color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
