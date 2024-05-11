import React, { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

const termsScreenLink = "https://www.termsfeed.com/live/6a109657-c4de-4305-8634-4e41a50c01bd";

const TermsScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          title: "Terms and Conditions",
          headerTitleStyle: {
            fontSize: 25,
            fontWeight: "bold",
            color: "white",
            alignSelf: "center",
          },
          headerStyle: {
            backgroundColor: "#003580",
            height: 110,
            borderBottomColor: "transparent",
            shadowColor: "transparent",
            alignItems: "center",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={24} color="white" />
            </Pressable>
          ),
        });
      }, []);


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <WebView
        source={{ uri: termsScreenLink }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  )
}

export default TermsScreen

const styles = StyleSheet.create({})