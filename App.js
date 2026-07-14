import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";

import Home from "./src/Pages/Home.js";
import Pesquisa from "./src/Pages/Pesquisa.js";
import ComponenteRecuperarSenha from "./src/Componentes/ComponenteRecuperarSenha.jsx";

import ComponenteLogin from "./src/Componentes/ComponenteLogin.jsx";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  function Tabs() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Inicio"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Feather name="home" color={color} size={size} />;
            },
          }}
        />
        <Tab.Screen
          name="Pesquisa"
          component={Pesquisa}
          options={{
            tabBarIcon: ({ color, size }) => {
              return <Feather name="search" color={color} size={size} />;
            },
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={ComponenteLogin} />
        <Stack.Screen
          name="RecuperarSenha"
          component={ComponenteRecuperarSenha}
        />
        <Stack.Screen name="Tabs" component={Tabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
