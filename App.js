import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Cards from "./src/Componentes/ComponenteCards.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./src/Pages/Login.js"
import ComponenteLogin from "./src/Componentes/ComponenteLogin.jsx";
import Home from "./src/Pages/Home.js";
import Pesquisa from "./src/Pages/Pesquisa.js";
import { Feather } from "@expo/vector-icons";

const  Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
    <Tab.Navigator>

      <Tab.Screen
       name= "Inicio"
       component={Home}
       options= {{
        tabBarIcon:({color, size}) =>{
          return <Feather name= "home" color={color} size={size}/>
        }
       }}
      />
         <Tab.Screen
       name= "Pesquisa"
       component={Pesquisa}
       options= {{
        tabBarIcon:({color, size}) =>{
          return <Feather name= "search" color={color} size={size}/>
        }
       }}
      />

      <Tab.Screen
      name= "Login"
      component={ComponenteLogin}
      options= {{
        tabBarIcon:({color, size}) =>{
          return <Feather name = "user"  color={color} size={size}/>
         }
      }}
      />

    </Tab.Navigator>
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
