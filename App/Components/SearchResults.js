import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const SearchResults = ({ data, input, setInput }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    if (item.place?.toLowerCase().includes(input?.toLowerCase())) {
      if (input === "") {
        return null;
      } else {
        // const handlePlace = ({ item }) => {
        //   setInput(item?.place);
        //   navigation.navigate("Home", { input: item?.place });
        // };
        return (
          <Pressable
            onPress={() => {
              setInput(item?.place);
              navigation.navigate("Home", { input: item?.place });
            }}
            style={{
              marginVertical: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View>
              <Image
                style={{ width: 75, height: 75 }}
                source={{ uri: item?.placeImage }}
              />
            </View>
            <View style={{ marginLeft: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                {item?.place}
              </Text>
              <Text style={{ marginVertical: 4, fontSize: 15 }}>
                {item?.shortDescription}
              </Text>
              <Text style={{ color: "gray", fontSize: 18 }}>
                {item?.properties.length} Properties
              </Text>
            </View>
          </Pressable>
        );
      }
    }
  };

  return (
    <SafeAreaView style={{ padding: 10 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default SearchResults;

const styles = StyleSheet.create({});
