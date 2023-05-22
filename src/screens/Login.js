import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import Styles from "../config/Styles";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import usePreferences from "../hooks/usePreferences";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logInUser } from "../apis/ApiHandlers";
import { useNavigation } from "@react-navigation/native";
import * as Updates from 'expo-updates';

const auth = getAuth();


export default function Login(props) {
  const contextState = React.useContext(LanguageContext);
  const { reset } = useNavigation();

  const language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme, toggleTheme } = usePreferences();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email);
  console.log(password);

  const onChangeScreen = (screen) => {
    reset({
      index: 0,
      routes: [{ name: screen }],
    });
    onFetchUpdateAsync()
  };


  const login = async () => {
    try {
      setLoading(true)
      if ((email, password != false)) {
        await AsyncStorage.clear();
        const res = await logInUser(email, password)
        console.log("🚀 ~ file: Login.js:45 ~ login ~ res:", res?.success)
        console.log("🚀 ~ file: Login.js:45 ~ login ~ res:", res?.user)
        console.log("🚀 ~ file: Login.js:45 ~ login ~ res:", res?.user?.token)
        await AsyncStorage.setItem("@token", res?.user?.token);
        await AsyncStorage.setItem("@user", JSON.stringify(res?.user));
        setEmail('')
        setPassword('')
        setLoading(false)
        // props.navigation.replace('home');
        reset({
          index: 0,
          routes: [{ name: 'home' }],
        });
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();

      }
      else {
        Alert.alert(Strings.ST33);
      }

    }
    catch (error) {
      console.log("🚀 ~ file: Login.js:53 ~ login ~ error:", error)

    }
    setLoading(false)
  };
  // async function onFetchUpdateAsync() {
  //   try {
  //     const update = await Updates.checkForUpdateAsync();

  //     if (update.isAvailable) {
  // await Updates.fetchUpdateAsync();
  // await Updates.reloadAsync();
  //     }
  //   } catch (error) {
  //     // You can also add an alert() to see the error message in case of an error when fetching updates.
  //     console.log(`Error fetching latest Expo update: ${error}`);
  //   }
  // }

  //end
  // const login = async () => {
  //   setLoading(true);

  //   if ((email, password)) {
  //     await signInWithEmailAndPassword(auth, email, password)
  //       .then(() => {
  //       })
  //       .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         if (errorCode === "auth/wrong-password") {
  //           setLoading(false);
  //           Alert.alert(Strings.ST113);
  //         } else if (errorCode === "auth/user-not-found") {
  //           setLoading(false);
  //           Alert.alert(Strings.ST37);
  //         } else {
  //           setLoading(false);
  //           Alert.alert(Strings.ST33);
  //         }
  //       });
  //   } else {
  //     setLoading(false);
  //     Alert.alert(Strings.ST33);
  //   }
  // };



  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <Image
        source={
          theme === "dark"
            ? require("../../assets/logo-white.png")
            : require("../../assets/logo.png")
        }
        resizeMode={"contain"}
        style={Styles.AuthLogo}
      />

      <View style={Styles.AuthContent}>
        <TextInput
          label={Strings.ST19}
          onChangeText={(text) => setEmail(text.trim())}
          mode="flat"
          autoCapitalize="none"
          style={Styles.AuthInput}
        />
        <TextInput
          label={Strings.ST20}
          onChangeText={(text) => setPassword(text)}
          mode="flat"
          secureTextEntry={true}
          style={Styles.AuthInput}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onChangeScreen("forgot")}
        >
          <Text style={Styles.ForgotPass}>{Strings.ST15}</Text>
        </TouchableOpacity>
        <Button
          mode="contained"
          // disabled={loading}
          onPress={() => login()}
          dark={theme === "dark" ? false : true}
          style={Styles.AuthButton}
          contentStyle={Styles.AuthButtonContent}
          labelStyle={Styles.AuthButtonLabel}
        >
          {!loading ? Strings.ST17 : Strings.ST31}
        </Button>

        <View style={Styles.AuthBottomContent}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onChangeScreen("register")}
          >
            <Text style={Styles.AuthBottomText}>
              {Strings.ST12}{" "}
              <Text style={{ fontWeight: "bold" }}>{Strings.ST35}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
