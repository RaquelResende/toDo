import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function ComponentePesquisa() {
  const [pesquisa, setPesquisa] = useState("");
  const [colunas, setColunas] = useState([]);
  const [resultado, setResultado] = useState([]);



  // Carregar dados salvos
  useFocusEffect(
  useCallback(() => {

    // limpa o campo de pesquisa
    setPesquisa("");

    // limpa os resultados antigos
    setResultado([]);

    // carrega novamente os dados
    carregarColunas();

     return () => {
      setPesquisa("");
      setResultado([]);
     };
  }, [])
);
  async function carregarColunas() {
    try {
      const dados = await AsyncStorage.getItem("colunas");
          console.log("Dados do AsyncStorage:", dados);

      if (dados !== null) {
        const lista = JSON.parse(dados);


        console.log("lista:", lista);

        setColunas(lista);
        setResultado(lista);

        console.log("Colunas carregadas:", lista);
      }
    
    } catch (error) {
      console.log(error);
    }
  }

  function pesquisarColuna(texto) {
    console.log("Texto pesquisado:",texto)
    setPesquisa(texto);

    if (texto.trim() === "") {
      setResultado(colunas);

      return;
    }
   const busca = texto.toLowerCase();

   const filtro = colunas.filter((coluna)=>{
    //verifica se encontrou o nome da coluna
    const encontrouColuna = coluna.titulo
    .toLowerCase()
    .includes(busca);
    
    const encontrouTarefa = colunas.tarefas?.coluna.tarefas.filter((tarefa)=>
    tarefa.nome.toLowerCase().includes(busca));

    return encontrouColuna || encontrouTarefa

   })
   //se pesquisar por coluna também mostra a tarefas dela
   .map((coluna) => {
    if(coluna.titulo.toLowerCase().includes(busca)){
      return coluna;
    }
      // Se pesquisou uma tarefa, mostra somente as tarefas encontradas
      return{
      ...coluna,
      tarefas: coluna.tarefas.filter((tarefa) =>tarefa.nome.toLowerCase().includes(busca))

      };
    

    
   });
 console.log("Filtro:", filtro)
setResultado(filtro)
  }
   

  return (
    <View style={style.container}>
      <TextInput
        style={style.input}
        placeholder="Pesquisar coluna ou tarefa"
        value={pesquisa}
        onChangeText={setPesquisa}
      />
    <TouchableOpacity
    onPress={() => pesquisarColuna(pesquisa)}>
     <Ionicons name="search" size={24} color="black"/>
    </TouchableOpacity>
      {resultado.map((coluna) => (
        <View key={coluna.id} style={style.card}>
          <Text style={style.titulo}>
            {coluna.titulo}</Text>

          {coluna.tarefas.map((tarefa) => (
            <View key={tarefa.id}>
              <Text>{tarefa.nome}</Text>
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
