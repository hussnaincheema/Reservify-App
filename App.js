import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./App/Navigation/StackNavigator";
import { ModalPortal } from "react-native-modals";
import Store from "./App/Redux/Store/Store";
import { Provider } from "react-redux";
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from "./App/Navigation/AuthNavigator";


export default function App() {
  const [isLogged, setIsLogged] = useState(false);


  return (
    <>
      <Provider store={Store}>
          {isLogged ? <AuthNavigator /> : <StackNavigator />}
        <ModalPortal />
      </Provider>
    </>
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
