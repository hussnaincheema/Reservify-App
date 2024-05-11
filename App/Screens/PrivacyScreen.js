import React, { useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";

const HEIGHT = Dimensions.get("screen").height;
const WIDTH = Dimensions.get("screen").width;

const privacyPolicyLink = "https://www.termsfeed.com/live/efd21055-304d-4a03-a156-bd4f80976900";

const PrivacyScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Privacy Policy",
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

  // const privacyPolicy = [
  //   {
  //     title: "Privacy Policy:",
  //     text: [
  //       "Me built the Reservify app as an Open Source app. This SERVICE is provided by Me at no cost and is intended for use as is.",
  //       "This page is used to inform visitors regarding my policies with the collection, use, and disclosure of Personal Information if anyone decided to use my Service.",
  //       "If you choose to use my Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the Service. I will not use or share your information with anyone except as described in this Privacy Policy.",
  //       "The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at Reservify unless otherwise defined in this Privacy Policy.",
  //     ],
  //   },
  //   {
  //     title: "Information You Provide:",
  //     text: [
  //       "When you use our App, you may provide us with certain personally identifiable information, including but not limited to:",
  //       "1) Name",
  //       "2) Contact information (email address, phone number)",
  //       "3) Booking preferences (e.g., room type, check-in/check-out dates)",
  //     ],
  //   },
  //   {
  //     title: "Information Automatically Collected:",
  //     text: [
  //       "We may collect certain information automatically when you use our App, including:",
  //       "1) Device information (e.g., device type, operating system, unique device identifier)",
  //       "2) Usage information (e.g., pages visited, features used, interactions with the App)",
  //       "3) Location information (if you grant us permission)",
  //     ]
  //   },
  //   {
  //     title: "How We Use Your Information:",
  //     text: [
  //       "We may use the information we collect for various purposes, including but not limited to:",
  //       "1) Process and confirm hotel bookings",
  //       "2) Provide customer support and respond to your inquiries",
  //       "3) Improve and optimize our App's performance and user experience",
  //       "4) Send you transactional emails, updates, and promotional offers (if you opt-in)",
  //     ],
  //   },
  //   {
  //     title: "Sharing Your Information:",
  //     text: [
  //       "We may share your personal information with third parties in the following circumstances:",
  //       "1) With hotels and accommodation providers to fulfill your bookings",
  //       "2) With service providers that assist us in app development, marketing, and analytics",
  //       "3) With law enforcement agencies or authorities when required by law",
  //     ]
  //   },
  //   {
  //     title: "Cookies:",
  //     text: [
  //       "Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.",
  //       "This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.",
  //     ],
  //   },
  //   {
  //     title: "Services:",
  //     text: [
  //       "I want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.",
  //     ],
  //   },
  //   {
  //     title: "Security:",
  //     text: [
  //       "I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.",
  //     ],
  //   },
  // ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* {/ <Image style={styles.background} source={require("../assets/Logo_Baby.png")} /> /} */}
      {/* <View style={styles.parent}>
        <View style={styles.child}>
          <View style={styles.topView}>
            <View style={{ height: 32, width: 32, borderRadius: 16, marginLeft: 10 }}>
              <Ionicons name="arrow-back" size={30} color="#fff" onPress={() => navigation.goBack()} />
            </View>
            <Text style={styles.heading}>Privacy policy</Text>
            <View style={{ marginRight: '8%' }} />
          </View>
        </View>
      </View> */}
      {/* <CurvedHeader title="Privacy Policy" onPress={()=>navigation.goBack()}></CurvedHeader> */}
      {/* <ScrollView
        style={{ marginTop: "3%", marginHorizontal: "4%" }}
        showsVerticalScrollIndicator={false}
      >
        {privacyPolicy.map((item) => (
          <>
            <Text
              style={{
                fontSize: 23,
                fontWeight: "bold",
                marginBottom: 20,
                marginTop: 10,
              }}
            >
              {item.title}
            </Text>
            {item.text.map((paragraphs) => (
              <Text style={{ marginBottom: 10, fontSize: 17, }}>{paragraphs}</Text>
            ))}
          </>
        ))}
      </ScrollView> */}

      
      <WebView
        source={{ uri: privacyPolicyLink }}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default PrivacyScreen;

const styles = StyleSheet.create({});

