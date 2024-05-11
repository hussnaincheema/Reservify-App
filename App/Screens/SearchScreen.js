import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import SearchResults from "../Components/SearchResults";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";


const SearchScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
      navigation.setOptions({
        headerShown: true,
        title: "Search Your Destination",
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
          //alignItems: "center",
        },
        headerTitleAlign: "center",
        headerLeft: () => (
          <Pressable onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </Pressable>
        ),
      });
    }, []);

    const [input, setInput] = useState("");
    console.log(input)
    
    const [items,setItems] = useState([]);
    
    useEffect(() => {
      if(items.length > 0) return;

      const fetchProducts = async () => {
        const colRef = collection(db,"places");

        const docsSnap = await getDocs(colRef);
        docsSnap.forEach((doc) => {
          items.push(doc.data());
        })
      }

      fetchProducts();
    },[items]);
  console.log(items);

    const handleText = (text) => {
        setInput(text)
    }

  return (
    <SafeAreaView>
      <View
        style={{
          padding: 10,
          margin: 10,
          marginTop: "6%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 10,
          borderWidth: 4,
          borderColor: "#003580",
        }}
      >
        <TextInput value={input} onChangeText={handleText} placeholder="Enter Your Destination" />
        <Feather name="search" size={24} color="black" />
      </View>

      <SearchResults data={items} input={input} setInput={setInput} />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({});
