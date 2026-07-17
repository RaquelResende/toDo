import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";

export default function ComponentePesquisa() {
  const [pesquisa, setPesquisa] = useState("");

  const [colunas, setColunas] = useState([]);

  const [resultado, setResultado] = useState([]);

  // Carregar dados salvos
  useEffect(() => {
    carregarColunas();
  }, []);

  async function carregarColunas() {
    try {
      const dados = await AsyncStorage.getItem("colunas");

      if (dados !== null) {
        const lista = JSON.parse(dados);

        setColunas(lista);
        setResultado(lista);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function pesquisarColuna(texto) {
    setPesquisa(texto);

    if (texto.trim() === "") {
      setResultado(colunas);

      return;
    }

    const filtro = colunas
      .map((coluna) => {
        return {
          ...coluna,

          tarefas: coluna.tarefas.filter((tarefa) =>
            tarefa.nome.toLowerCase().includes(texto.toLowerCase()),
          ),
        };
      })

      .filter((coluna) => {
        // Pesquisa também pelo nome da coluna

        return (
          coluna.tarefas.length > 0 ||
          coluna.titulo.toLowerCase().includes(texto.toLowerCase())
        );
      });

    setResultado(filtro);
  }

  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        placeholder="Pesquisar coluna ou tarefa"
        value={pesquisa}
        onChangeText={pesquisarColuna}
      />

      {resultado.map((coluna) => (
        <View key={coluna.id} style={style.card}>
          <Text style={style.titulo}>{coluna.titulo}</Text>

          {coluna.tarefas.map((tarefa) => (
            <View key={tarefa.id}>
              <Text>📌 {tarefa.nome}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#fff",
  },

  card: {
    backgroundColor: "#eee",
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
  },

  titulo: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
