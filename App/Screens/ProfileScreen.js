// import {
//   StyleSheet,
//   Text,
//   View,
//   SafeAreaView,
//   KeyboardAvoidingView,
//   Pressable,
//   TextInput,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import React, { useState, useEffect } from "react";
// import { useNavigation } from "@react-navigation/native";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { AntDesign } from "@expo/vector-icons";
// import { auth, db } from "../../firebase";
// import { setDoc, doc } from "firebase/firestore";

// const ProfileScreen = () => {
//   const navigation = useNavigation();
//   const [userProfile, setUserProfile] = useState(null);
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       title: "Profile",
//       headerTitleStyle: {
//         fontSize: 25,
//         fontWeight: "bold",
//         color: "white",
//         alignSelf: "center",
//       },
//       headerStyle: {
//         backgroundColor: "#003580",
//         height: 110,
//         borderBottomColor: "transparent",
//         shadowColor: "transparent",
//         alignItems: "center",
//       },
//       headerTitleAlign: "center",
//       headerLeft: () => (
//         <Pressable onPress={() => navigation.goBack()}>
//           <AntDesign name="arrowleft" size={24} color="white" />
//         </Pressable>
//       ),
//     });
//   }, []);

//   useEffect(() => {
//     // Check if the user is authenticated
//     const user = auth.currentUser;
//     if (!user) {
//       // User is not authenticated, handle accordingly (e.g., show an error message or redirect to login)
//       setVisible(false);
//       return;
//     }

//     // Fetch user profile data from Firestore
//     // const fetchUserProfile = async () => {
//     //   try {
//     //     const uid = user.uid;
//     //     const userRef = collection(db, "users");
//     //     const querySnapshot = await getDocs(userRef);

//     //     querySnapshot.forEach((doc) => {
//     //       if (doc.id === uid) {
//     //         setUserProfile(doc.data());
//     //       }
//     //     });

//     //     setVisible(false); // Set loading to false after data is fetched
//     //   } catch (error) {
//     //     console.error("Error fetching user profile:", error);
//     //     setLoading(false); // Set loading to false in case of an error
//     //   }
//     // };

//     // fetchUserProfile();

//     // Fetch user profile data from Firestore
//     const fetchUserProfile = async () => {
//       try {
//         const uid = user.uid;
//         const userRef = doc(db, "users", uid); // Assuming your user data is stored in a "users" collection
//         const userDoc = await getDoc(userRef);

//         if (userDoc.exists()) {
//           const userData = userDoc.data();
//           setUserProfile(userData);
//           setVisible(false); // Set loading to false after data is fetched
//           console.log("User Data:", userData); // Add this line to log the user data
//         } else {
//           console.log("User document does not exist.");
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error);
//         setLoading(false); // Set loading to false in case of an error
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   return (
//     <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
//       {visible ? (
//         <Text
//           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//           Loading....
//         </Text>
//       ) : userProfile ? (
//         <KeyboardAvoidingView>
//           <ScrollView>
//             <View
//               style={{
//                 flex: 1,
//                 padding: 40,
//                 alignItems: "center",
//               }}
//             >
//               <View style={{ marginTop: 30 }}>
//                 <View>
//                   <Text
//                     style={{ fontSize: 18, fontWeight: "600", color: "black" }}
//                   >
//                     First Name
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 18,
//                       borderBottomColor: "gray",
//                       borderBottomWidth: 1,
//                       marginVertical: 10,
//                       width: 300,
//                     }}
//                   >
//                     {userProfile?.firstName}
//                   </Text>
//                 </View>

//                 <View>
//                   <Text
//                     style={{ fontSize: 18, fontWeight: "600", color: "black" }}
//                   >
//                     Last Name
//                   </Text>

//                   <Text
//                     style={{
//                       fontSize: 18,
//                       borderBottomColor: "gray",
//                       borderBottomWidth: 1,
//                       marginVertical: 10,
//                       width: 300,
//                     }}
//                   >
//                     {userProfile?.lastName}
//                   </Text>
//                 </View>

//                 <View>
//                   <Text
//                     style={{ fontSize: 18, fontWeight: "600", color: "black" }}
//                   >
//                     Email
//                   </Text>

//                   <Text
//                     style={{
//                       fontSize: 18,
//                       borderBottomColor: "gray",
//                       borderBottomWidth: 1,
//                       marginVertical: 10,
//                       width: 300,
//                     }}
//                   >
//                     {userProfile?.email}
//                   </Text>
//                 </View>

//                 <View style={{ marginTop: 15 }}>
//                   <Text
//                     style={{ fontSize: 18, fontWeight: "600", color: "black" }}
//                   >
//                     Password
//                   </Text>

//                   <Text
//                     style={{
//                       fontSize: 18,
//                       borderBottomColor: "gray",
//                       borderBottomWidth: 1,
//                       marginVertical: 10,
//                       width: 300,
//                     }}
//                   >
//                     {userProfile?.password}
//                   </Text>
//                 </View>

//                 <View style={{ marginTop: 15 }}>
//                   <Text
//                     style={{ fontSize: 18, fontWeight: "600", color: "black" }}
//                   >
//                     Phone
//                   </Text>

//                   <Text
//                     style={{
//                       fontSize: 18,
//                       borderBottomColor: "gray",
//                       borderBottomWidth: 1,
//                       marginVertical: 10,
//                       width: 300,
//                     }}
//                   >
//                     {userProfile?.phone}
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </ScrollView>
//         </KeyboardAvoidingView>
//       ) : (
//         <Text
//           style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//         >
//           User not authenticated. Please log in.
//         </Text>
//       )}
//     </SafeAreaView>
//   );
// };

// export default ProfileScreen;

// const styles = StyleSheet.create({});


import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
} from "react-native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState(null);
  const [visible, setVisible] = useState(true);
  const [userNotAuthenticated, setUserNotAuthenticated] = useState(false);

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

  useEffect(() => {
    // Check if the user is authenticated
    const user = auth.currentUser;
    if (!user) {
      // User is not authenticated, handle accordingly
      setVisible(false);
      setUserNotAuthenticated(true); // Set the userNotAuthenticated state to true
      return;
    }

    // Fetch user profile data from Firestore
    const fetchUserProfile = async () => {
      try {
        const uid = user.uid;
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUserProfile(userData);
          setVisible(false); // Set loading to false after data is fetched
          console.log("User Data===", userData);
        } else {
          console.log("User document does not exist.");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setVisible(false); // Set loading to false in case of an error
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      {visible ? (
        <Text
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading....
        </Text>
      ) : userNotAuthenticated ? ( // Check if user is not authenticated
        <Text
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          User not authenticated. Please log in.
        </Text>
      ) : userProfile ? (
        <KeyboardAvoidingView>
          <ScrollView>
            <View
              style={{
                flex: 1,
                padding: 40,
                alignItems: "center",
              }}
            >
              <View style={{ marginTop: 30 }}>
                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                  >
                    First Name
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      borderBottomColor: "gray",
                      borderBottomWidth: 1,
                      marginVertical: 10,
                      width: 300,
                    }}
                  >
                    {userProfile?.firstName}
                  </Text>
                </View>

                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                  >
                    Last Name
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      borderBottomColor: "gray",
                      borderBottomWidth: 1,
                      marginVertical: 10,
                      width: 300,
                    }}
                  >
                    {userProfile?.lastName}
                  </Text>
                </View>

                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                  >
                    Email
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      borderBottomColor: "gray",
                      borderBottomWidth: 1,
                      marginVertical: 10,
                      width: 300,
                    }}
                  >
                    {userProfile?.email}
                  </Text>
                </View>

                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                  >
                    Password
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      borderBottomColor: "gray",
                      borderBottomWidth: 1,
                      marginVertical: 10,
                      width: 300,
                    }}
                  >
                    {userProfile?.password}
                  </Text>
                </View>

                <View style={{ marginTop: 15 }}>
                  <Text
                    style={{ fontSize: 18, fontWeight: "600", color: "black" }}
                  >
                    Phone
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      borderBottomColor: "gray",
                      borderBottomWidth: 1,
                      marginVertical: 10,
                      width: 300,
                    }}
                  >
                    {userProfile?.phone}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      ) : null}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});

