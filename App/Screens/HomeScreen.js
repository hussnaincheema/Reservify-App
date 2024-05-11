import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../Components/Header";
import { Feather } from "@expo/vector-icons";
import {
  BottomModal,
  ModalButton,
  ModalContent,
  ModalFooter,
  ModalTitle,
  SlideAnimation,
} from "react-native-modals";
import { useRoute } from "@react-navigation/native";
import moment from "moment";
import DateRangePicker from "rn-select-date-range";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const route = useRoute();
  const [showModal, setShowModal] = useState(false);
  const [rooms, setRooms] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [range, setRange] = useState({});
  const navigation = useNavigation();
  // useEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     title: "ReserveEase",
  //     headerTitleStyle: {
  //       fontSize: 20,
  //       fontWeight: "bold",
  //       color: "white",
  //       marginLeft: "50%",
  //     },
  //     headerStyle: {
  //       backgroundColor: "#003580",
  //       height: 110,
  //       borderBottomColor: "transparent",
  //       shadowColor: "transparent",
  //     },
  //     headerRight: () => (
  //       <Ionicons
  //         name="notifications-outline"
  //         size={24}
  //         color="white"
  //         style={{ marginRight: 20 }}
  //       />
  //     ),
  //   });
  // }, []);

  console.log(route.params);

  const handleBackPress = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleRooms = () => {
    setRooms((rooms) => rooms + 1);
  };

  const handleAdults = () => {
    setAdults((adults) => adults + 1);
  };

  const handleChildren = () => {
    setChildren((children) => children + 1);
  };

  const searchPlaces = (place) => {
    if (!route.params || !inputValue) {
      Alert.alert(
        "Invalid Details",
        "Please enter all details",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    if (route.params && inputValue) {
      navigation.navigate("Places", {
        rooms: rooms,
        adults: adults,
        children: children,
        //selectedDates: selectedDates,
        inputValue: setInputValue,
        place: place,
      });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDateRangeConfirm = (range) => {
    setRange(range);

  };

  const handlePress = () => {
    setShowModal(false);
    const formattedDate = `${range.firstDate} - ${range.secondDate}`;
    setInputValue(formattedDate);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <Header />

        <ScrollView vertical showsVerticalScrollIndicator={false}>
          <View
            style={{
              margin: 20,
              borderColor: "#003580",
              borderWidth: 3,
              borderRadius: 6,
            }}
          >

            {/* For Destination */}
            
            <Pressable
              onPress={() => navigation.navigate("Search")}
              style={{
                borderColor: "#003580",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Feather name="search" size={24} color="black" />
              <TextInput
                placeholderTextColor={"black"}
                placeholder={
                  route?.params
                    ? route?.params?.input
                    : "Enter your Destination"
                }
              />
            </Pressable>

            {/* Selected Dates */}

            <Pressable
              style={{
                borderColor: "#003580",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderWidth: 2,
                paddingVertical: 15,
              }}
              onPress={() => setShowModal(true)}
            >
              <Feather name="calendar" size={24} color="black" />
              <TextInput
              value={inputValue}
              style={{color: "black"}}
              placeholder="Chose Your Dates"
              placeholderTextColor={"black"}
              editable={false}
            />
              <Modal
                visible={showModal}
                animationType="fade"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                <DateRangePicker
                  onSelectDateRange={handleDateRangeConfirm}
                  blockSingleDateSelection={true}
                  responseFormat="YYYY-MM-DD"
                  maxDate={moment().add(365, "days")}
                  minDate={moment().subtract(365, "days")}
                  selectedDateContainerStyle={{
                    height: 35,
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "blue",
                  }}
                  selectedDateStyle={{ fontWeight: "bold", color: "white" }}
                />
                <View style={{ margin: 50 }}>
                  <Text>first date: {range.firstDate}</Text>
                  <Text>second date: {range.secondDate}</Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={handlePress}
                    style={{
                      backgroundColor: "blue",
                      padding: 10,
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 16 }}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </Pressable>
            {/* <View style={{ margin: 50 }}>
              <DateRangePicker
                onSelectDateRange={(range) => {
                  setRange(range);
                }}
                blockSingleDateSelection={true}
                responseFormat="YYYY-MM-DD"
                maxDate={moment()}
                minDate={moment().subtract(100, "days")}
                selectedDateContainerStyle={{
                  height: 35,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "blue",
                }}
                selectedDateStyle={{ fontWeight: "bold", color: "white" }}
              />
              <View style={{ margin: 50 }}>
                <Text>first date: {selectedRange.firstDate}</Text>
                <Text>second date: {selectedRange.secondDate}</Text>
              </View>
            </View> */}

            {/* Rooms and Guests */}
            <Pressable
              onPress={handleBackPress}
              style={{
                borderColor: "#003580",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                paddingHorizontal: 10,
                borderWidth: 2,
                paddingVertical: 15,
              }}
            >
              <Ionicons name="person-outline" size={24} color="black" />
              <TextInput
                placeholderTextColor={"black"}
                placeholder={` ${rooms} rooms . ${adults} adults . ${children} children`}
              />
            </Pressable>
            {/* Search Button */}
            <Pressable
              onPress={() => searchPlaces(route?.params?.input)}
              style={{
                paddingHorizontal: 10,
                borderWidth: 2,
                paddingVertical: 15,
                backgroundColor: "#2a52be",
                borderColor: "#003580",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Search
              </Text>
            </Pressable>
          </View>
          <Text
            style={{ marginHorizontal: 20, fontSize: 20, fontWeight: "bold" }}
          >
            Travel More speed less
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                borderRadius: 10,
                padding: 20,
                backgroundColor: "#003580",
                marginHorizontal: 20,
                flexDirection: "column",
                gap: 20,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              >
                Genius
              </Text>
              <Text style={{ color: "white", fontSize: 15, fontWeight: "500" }}>
                You are ate genius level one in our loyalty program
              </Text>
            </Pressable>

            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                borderRadius: 10,
                padding: 20,
                borderColor: "#E0E0E0",
                borderWidth: 2,
                marginHorizontal: 20,
                flexDirection: "column",
                gap: 20,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                10% Discounts
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Enjoy Discounts at participating at properties worldwide
              </Text>
            </Pressable>

            <Pressable
              style={{
                width: 200,
                height: 150,
                marginTop: 10,
                borderRadius: 10,
                padding: 20,
                borderColor: "#E0E0E0",
                borderWidth: 2,
                marginHorizontal: 20,
                flexDirection: "column",
                gap: 20,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                15% Discounts
              </Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                Complete 5 Stays to unlock level 2
              </Text>
            </Pressable>
          </ScrollView>

          {/* <Pressable
            style={{
              marginTop: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: "#003580" }}
            >
              Simplify Your Bookings
            </Text>
          </Pressable> */}
        </ScrollView>
      </View>

      <BottomModal
        swipeThreshold={200}
        onBackdropPress={handleBackPress}
        swipeDirection={["up", "down"]}
        footer={
          <ModalFooter>
            <ModalButton
              text="Apply"
              style={{
                marginBottom: 20,
                color: "white",
                backgroundColor: "#E0E0E0",
                fontSize: 20,
                fontWeight: "bold",
              }}
              onPress={handleBackPress}
            />
          </ModalFooter>
        }
        modalTitle={<ModalTitle title="Select Rooms and Guests" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        onHardwareBackPress={handleBackPress}
        visible={isModalVisible}
        onTouchOutside={handleBackPress}
      >
        <ModalContent style={{ width: "100%", height: 310 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Rooms</Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Pressable
                onPress={() => setRooms(Math.max(0, rooms - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {rooms}
                </Text>
              </Pressable>

              <Pressable
                onPress={handleRooms}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Adults</Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Pressable
                onPress={() => setAdults(Math.max(0, adults - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {adults}
                </Text>
              </Pressable>

              <Pressable
                onPress={handleAdults}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 15,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Children</Text>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Pressable
                onPress={() => setChildren(Math.max(0, children - 1))}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  -
                </Text>
              </Pressable>

              <Pressable>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 6,
                  }}
                >
                  {children}
                </Text>
              </Pressable>

              <Pressable
                onPress={handleChildren}
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  borderColor: "#BEBEBE",
                  backgroundColor: "#E0E0E0",
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "600",
                    paddingHorizontal: 6,
                  }}
                >
                  +
                </Text>
              </Pressable>
            </Pressable>
          </View>
        </ModalContent>
      </BottomModal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
