import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet, Dimensions } from "react-native";
let HEIGHT = Dimensions.get("window").height;
let WIDTH = Dimensions.get("window").width;
let size = HEIGHT * 0.2;

const ActivityIndicator = ({ visible = false }) => {
  if (!visible) return null;

  return (
    <View
      style={{
        position: "absolute",
        height: "100%",
        opacity: 0.8,
        width: "100%",
        zIndex: 2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LottieView
        autoPlay
        loop
        source={require("../../assets/animations/animation_lmil93w7.json")}
        style={{ width: size, height: size }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ActivityIndicator;
