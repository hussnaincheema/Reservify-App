import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React, {useEffect} from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { removePlace } from "../Redux/Reducers/SavedReducer";

const SavedScreen = ({
  rooms,
  children,
  property,
  adults,
  selectedDates,
  availableRooms,
}) => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const savedPlaces = useSelector((state) => state.Saved.savedPlaces);

  const handleRemovePlace = (item) => {
    dispatch(removePlace(item));
  };


  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Saved Places",
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
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "#F5F5F5" }}>
      {savedPlaces.length > 0 && savedPlaces.map((item) => (
        <Pressable style={{ margin: 15, flexDirection: "row", backgroundColor: "white" }}>
        <View>
          <Image
            style={{ height: 220, width: 135 }}
            source={{ uri: item.image }}
          />
        </View>
        <View style={{ padding: 10 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ width: 200 }}>{item.name}</Text>
            <Pressable onPress={handleRemovePlace}>
              <AntDesign name="heart" size={24} color="red" />
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
              marginTop: 7,
            }}
          >
            <MaterialIcons name="stars" size={24} color="green" />
            <Text>{item.rating}</Text>
            <View
              style={{
                backgroundColor: "#6CB4EE",
                paddingVertical: 3,
                borderRadius: 5,
                width: 100,
              }}
            >
              <Text
                style={{ textAlign: "center", color: "white", fontSize: 15 }}
              >
                Genius Level
              </Text>
            </View>
          </View>
          <Text
            style={{
              width: 210,
              marginTop: 6,
              color: "gray",
              fontWeight: "bold",
            }}
          >
            {item.address.length > 50
              ? item.address.substr(0, 50)
              : item.address}
          </Text>
          <Text style={{ marginTop: 4, fontSize: 15, fontWeight: "500" }}>
            Price for 1 Night and {adults} adults
          </Text>
          <View
            style={{
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Text
              style={{
                color: "red",
                fontSize: 18,
                textDecorationLine: "line-through",
              }}
            >
              Rs{item.oldPrice * adults}
            </Text>
            <Text style={{ fontSize: 18 }}>Rs{item.newPrice * adults}</Text>
          </View>
          <View style={{ marginTop: 6 }}>
            <Text style={{ fontSize: 16, color: "gray" }}>Delux Room</Text>
            <Text style={{ fontSize: 16, color: "gray" }}>
              Hotel Room: 1 bed
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "#6082B6",
              paddingVertical: 5,
              marginTop: 5,
              borderRadius: 5,
              width: 150,
              paddingHorizontal: 3,
            }}
          >
            <Text style={{ textAlign: "center", color: "white" }}>
              Limited Time Zeal
            </Text>
          </View>
        </View>
      </Pressable>
      ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavedScreen;

const styles = StyleSheet.create({});
