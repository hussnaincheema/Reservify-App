import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  Alert,
  Image,
} from "react-native";
import React, { useEffect } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const SettingScreen = () => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Profile",
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

  const user = auth.currentUser;
  const navigation = useNavigation();

  const signOutUser = () => {
    // signOut(auth).then(() => {
    //     navigation.replace("Login");
    // }).catch(error => {
    //     console.log("Error is: ", error)
    // })
    Alert.alert(
      "Log Out",
      "Are You Sure You Want to Log Out?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            signOut(auth)
              .then(() => {
                navigation.replace("Login");
              })
              .catch((error) => {
                console.log("Error is: ", error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* <Pressable style={{marginVertical: 10}}>
      <Text style={{fontSize: 20, fontWeight: "600"}}>Welcome {user?.email}</Text>
      </Pressable> */}

      <Pressable
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
          //padding: 15,
          //marginTop: 25,
        }}
      >
        <Image
          style={{ width: 200, height: 200, borderRadius: 100 }}
          source={require('../../assets/logos/Reservify-Logo-Without-Text.png')}
        />
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Profile")}
        style={{
          width: 300,
          padding: 15,
          //marginTop: 25,
          borderBottomColor: "gray",
          borderBottomWidth: 2,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Profile
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Privacy")}
        style={{
          width: 300,
          padding: 15,
          marginTop: 25,
          borderBottomColor: "gray",
          borderBottomWidth: 2,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Privacy Policy
        </Text>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Terms")}
        style={{
          width: 300,
          padding: 15,
          marginTop: 25,
          borderBottomColor: "gray",
          borderBottomWidth: 2,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Terms and Conditions
        </Text>
      </Pressable>

      <Pressable
        onPress={signOutUser}
        style={{
          width: 300,
          padding: 15,
          marginTop: 25,
          borderBottomColor: "gray",
          borderBottomWidth: 2,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            color: "black",
            fontWeight: "bold",
          }}
        >
          Log Out
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
