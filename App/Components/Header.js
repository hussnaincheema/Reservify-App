import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Header = () => {
  const [greeting, setGreeting] = useState("");
  const [userName, setUserName] = useState("User"); // Default user name

  // Function to get the time of day
  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return "morning";
    } else if (hour >= 12 && hour < 17) {
      return "afternoon";
    } else if (hour >= 17 && hour < 20) {
      return "evening";
    } else if (hour >= 20 || hour < 5) {
      return "night";
    }
  };

  useEffect(() => {
    // Simulate fetching user's first name from Firebase (replace this with your Firebase logic)
    // For now, set a default user name
    // setTimeout(() => {
    //   setUserName("John"); // Replace with your Firebase logic to fetch the user's first name
    // }, 1000);

    // Get the time of day and set the greeting accordingly
    const timeOfDay = getTimeOfDay();
    switch (timeOfDay) {
      case "morning":
        setGreeting('Good morning');
        break;
      case "afternoon":
        setGreeting('Good afternoon');
        break;
      case "evening":
        setGreeting('Good evening');
        break;
      case "night":
        setGreeting('Good night');
        break;
      default:
        setGreeting('Hello');
    }
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#003580",
        height: "25%",
        alignItems: "center",
        justifyContent: "center",
        borderBottomLeftRadius: 90,
        borderBottomRightRadius: 90,
      }}
    >
      <Pressable
        style={{
          flexDirection: "column",
          alignItems: "center",
          padding: 8,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "white",
            textTransform: "uppercase",
            fontSize: 32,
          }}
        >
          {greeting}
        </Text>

        <Pressable>
        <Text
          style={{
            fontWeight: "400",
            color: "white",
            fontSize: 23,
            marginTop: "2%"
          }}
        >
          Welcome Back to Reservify
        </Text>
        </Pressable>
      </Pressable>
    </View>
  );
};

export default Header;
