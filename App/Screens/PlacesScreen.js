import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import PropertyCard from "../Components/PropertyCard";
import {
  BottomModal,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import ActivityIndicator from "../Components/ActivityIndicator";
import { logProfileData } from "react-native-calendars/src/Profiler";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const PlacesScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [SelectedFilter, setSelectedFilter] = useState([]);

  //console.log("Places Screen data is====", data);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Popular Places",
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

  console.log("====Places Screen Data", route.params);

  const filters = [
    {
      id: "0",
      filter: "cost: Low to High",
    },
    {
      id: "1",
      filter: "cost: High to Low",
    },
  ];

  const [visible, setVisible] = useState(false);

  const [items, setItems] = useState([]);

  useEffect(() => {
    if (items.length > 0) return;

    setVisible(true);

    const fetchProducts = async () => {
      const colRef = collection(db, "places");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      setVisible(false);
    };
    fetchProducts();
  }, [items]);
  console.log(items);

  const searchPlaces = items?.filter(
    (item) => item.place === route.params.place
  );
  console.log("====", route.params.place);
  console.log(searchPlaces);
  
  const [sortedData, setSortedData] = useState(items);

  const compare = (a, b) => {
    if (a.newPrice > b.newPrice) {
      return -1;
    } else if (a.newPrice < b.newPrice) {
      return 1;
    } else {
      return 0;
    }
  };

  const comparision = (a, b) => {
    if (a.newPrice < b.newPrice) {
      return -1;
    } else if (a.newPrice > b.newPrice) {
      return 1;
    } else {
      return 0;
    }
  };

  const applyFilter = (filter) => {
    setModalVisible(false);
    switch (filter) {
      case "cost: High to Low":
        searchPlaces.map((val) => val.properties.sort(compare));
        setSortedData(searchPlaces);
        break;
      case "cost: Low to High":
        searchPlaces.map((val) => val.properties.sort(comparision));
        setSortedData(searchPlaces);
        break;
    }
  };
  console.log("Sorted Data====", sortedData);

  return (
    <View>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          padding: 12,
          backgroundColor: "white",
        }}
      >
        <Pressable
          onPress={() => setModalVisible(!modalVisible)}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Octicons name="arrow-switch" size={24} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Sort
          </Text>
        </Pressable>
        {/* <Pressable style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="filter" size={24} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Filter
          </Text>
        </Pressable> */}
        <Pressable
          onPress={() =>
            navigation.navigate("Maps", {
              searchResults: searchPlaces,
            })
          }
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <FontAwesome5 name="map-marker-alt" size={24} color="gray" />
          <Text style={{ fontSize: 15, fontWeight: "500", marginLeft: 8 }}>
            Map
          </Text>
        </Pressable>
      </Pressable>

      {visible ? (
          <Pressable style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{fontSize: 20, fontWeight: "bold", color: "#003580"}}>Fetching Data...</Text>
          </Pressable>
      ) : (
        <ScrollView style={{ backgroundColor: "#F5F5F5", marginBottom: 55 }}>
          {sortedData
            ?.filter((item) => item.place === route.params.place)
            .map((item) =>
              item.properties.map((property, index) => (
                <PropertyCard
                  key={index}
                  rooms={route.params.rooms}
                  children={route.params.children}
                  adults={route.params.adults}
                  selectedDates={route.params.selectedDates}
                  property={property}
                  availableRooms={property.rooms}
                />
              ))
            )}
        </ScrollView>
      )}

      <BottomModal
        onBackdropPress={() => setModalVisible(!modalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        footer={
          <ModalFooter>
            <Pressable
              onPress={() => applyFilter(SelectedFilter)}
              style={{
                paddingRight: 10,
                marginLeft: "auto",
                marginRight: "auto",
                marginVertical: 10,
                marginBottom: 30,
              }}
            >
              <Text>Apply</Text>
            </Pressable>
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Sort and Filter" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={() => setModalVisible(!modalVisible)}
        visible={modalVisible}
        onTouchOutside={() => setModalVisible(!modalVisible)}
      >
        <ModalContent style={{ width: "100%", height: 280 }}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                marginVertical: 10,
                flex: 2,
                height: 280,
                borderRightWidth: 1,
                borderColor: "#E0E0E0",
              }}
            >
              <Text style={{ textAlign: "center" }}>Sort</Text>
            </View>
            <View style={{ flex: 3, margin: 10 }}>
              {filters.map((item, index) => (
                <Pressable
                  onPress={() => setSelectedFilter(item.filter)}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginVertical: 10,
                  }}
                  key={index}
                >
                  {SelectedFilter.includes(item.filter) ? (
                    <FontAwesome name="circle" size={18} color="black" />
                  ) : (
                    <Entypo name="circle" size={18} color="black" />
                  )}
                  <Text
                    style={{ fontSize: 16, fontWeight: "500", marginLeft: 6 }}
                  >
                    {item.filter}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </View>
  );
};

export default PlacesScreen;

const styles = StyleSheet.create({});
