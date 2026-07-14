import { useState, useEffect } from "react";
import {
  FlatList,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Cards() {
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

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function salvarTarefas(lista) {
    try {
      console.log("Salvando", lista);

      await AsyncStorage.setItem("@tarefas", JSON.stringify(lista));
      console.log("Salvou");
    } catch (error) {
      console.log("Erro de salvar", error);
    }
  }

  async function carregarTarefas() {
    try {
      const dados = await AsyncStorage.getItem("@tarefas");
      if (dados != null) {
        setColunas(JSON.parse(dados));
      }
    } catch (error) {
      console.log("Error ao carregar", error);
    }
  }
  async function adicionarTarefas() {
    if (novaTarefa.trim() === "") return;

    const novaLista = colunas.map((coluna) => ({
      ...coluna,
      tarefas: [...coluna.tarefas],
    }));

    const indice = novaLista.findIndex(
      (coluna) => coluna.id === colunaSelecionada,
    );

    if (indice !== -1) {
      novaLista[indice].tarefas.push({
        id: Date.now().toString(),
        nome: novaTarefa,
      });

      setColunas(novaLista);
      console.log("Estado atualizado:", novaLista);
      await salvarTarefas(novaLista);
    }
    setNovaTarefa("");
    setModalVisivel(false);
  }

  function adicionarModal(idColuna) {
    setColunaSelecionada(idColuna);
    setModalVisivel(true);
  }

  // function adicionarTarefa() {
  //   if (novaTarefa === "") return;
  //   const novaLista = [...colunas];

  //   novaLista[0].tarefas.push({
  //     id: Date.now().toString(),
  //     nome: novaTarefa,
  //   });
  //   setColunas(novaLista);
  //   setNovaTarefa("");
  // }

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
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
              </View>
            )}
          />
        </View>
      ))}

      <Modal visible={modalVisivel} transparent={true} animationType="slide">
        <View style={style.topo}>
          <TextInput
            style={style.input}
            placeholder="Digite sua tarefa"
            value={novaTarefa}
            onChangeText={setNovaTarefa}
          ></TextInput>

          <View style={style.botaoContainer}>
            <TouchableOpacity onPress={adicionarTarefas} style={style.botao}>
              <Text style={style.textoBotao}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setModalVisivel(false);
                setNovaTarefa("");
              }}
              style={style.botao}
            >
              <Text style={style.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
const style = StyleSheet.create({
  coluna: {
    width: 250,
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
