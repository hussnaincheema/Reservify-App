import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Feather } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
//import AsyncStorage from "@react-native-async-storage/async-storage";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const navigation = useNavigation();

  const register = () => {
    if (
      email === "" ||
      password === "" ||
      phone === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      Alert.alert(
        "Invalid Details",
        "Please enter all the credentials",
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

    createUserWithEmailAndPassword(
      auth,
      email,
      password,
      firstName,
      lastName,
      phone
    ).then((userCredentials) => {
      const user = userCredentials._tokenResponse.email;
      const uid = auth.currentUser.uid;

      setDoc(doc(db, "users", `${uid}`), {
        email: user,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
      });
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView>
        <ScrollView>
          <View
            style={{
              flex: 1,
              padding: 40,
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                //marginTop: 100,
                marginTop: 55,
              }}
            >
              <Text
                style={{ color: "#003580", fontSize: 25, fontWeight: "bold" }}
              >
                Sign Up
              </Text>

              <Text style={{ marginTop: 15, fontSize: 18, fontWeight: "500" }}>
                Create an Account
              </Text>
            </View>

            <View style={{ marginTop: 30 }}>
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                >
                  First Name
                </Text>

                <TextInput
                  value={firstName}
                  onChangeText={(text) => setFirstName(text)}
                  placeholder="Enter your First Name"
                  placeholderTextColor={"gray"}
                  style={{
                    fontSize: email ? 18 : 18,
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                    marginVertical: 10,
                    width: 300,
                  }}
                />
              </View>

              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                >
                  Last Name
                </Text>

                <TextInput
                  value={lastName}
                  onChangeText={(text) => setLastName(text)}
                  placeholder="Enter your Last Name"
                  placeholderTextColor={"gray"}
                  style={{
                    fontSize: email ? 18 : 18,
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                    marginVertical: 10,
                    width: 300,
                  }}
                />
              </View>

              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                >
                  Email
                </Text>

                <TextInput
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                  placeholder="Enter your Email"
                  placeholderTextColor={"gray"}
                  style={{
                    fontSize: email ? 18 : 18,
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                    marginVertical: 10,
                    width: 300,
                  }}
                />
              </View>

              <View style={{ marginTop: 15 }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                >
                  Password
                </Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TextInput
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={!showPassword}
                    placeholder="Password"
                    placeholderTextColor={"gray"}
                    style={{
                      fontSize: password ? 18 : 18,
                      borderBottomColor: "gray",
                      borderBottomWidth: 1,
                      marginVertical: 10,
                      width: 300,
                    }}
                  />
                  <TouchableOpacity
                    style={{ marginLeft: -20, marginBottom: 6 }}
                    onPress={togglePasswordVisibility}
                  >
                    <Feather
                      name={showPassword ? "eye" : "eye-off"} // Change icon based on showPassword
                      size={24}
                      color="#000"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ marginTop: 15 }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                >
                  Phone
                </Text>

                <TextInput
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  placeholder="Enter your Phone No"
                  placeholderTextColor={"gray"}
                  style={{
                    fontSize: password ? 18 : 18,
                    borderBottomColor: "gray",
                    borderBottomWidth: 1,
                    marginVertical: 10,
                    width: 300,
                  }}
                />
              </View>
            </View>

            <Pressable
              onPress={register}
              style={{
                width: 200,
                backgroundColor: "#003580",
                padding: 15,
                borderRadius: 7,
                marginTop: 50,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                Register
              </Text>
            </Pressable>

            <Pressable
              onPress={() => navigation.goBack()}
              style={{ marginTop: 20 }}
            >
              <Text
                style={{ textAlign: "center", color: "gray", fontSize: 17 }}
              >
                Already have an account?{" "}
                <Text
                  style={{
                    color: "#003580",
                    fontSize: 19,
                    fontWeight: "bold",
                    textDecorationLine: "underline",
                  }}
                >
                  {" "}
                  Sign In
                </Text>
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
