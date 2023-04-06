import React, { useState } from "react";
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
import { loginUser } from "../apis/ApiHandlers";
import AxiosInstance from "../apis/AxiosInstance";
import { LOGIN_URL } from "../apis/ApisEndPoints";


const auth = getAuth();

export default function Login(props) {
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const { theme, toggleTheme } = usePreferences();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(email);
  console.log(password);

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  //dummy
  const loginUser = async () => {
    try {
      const result = await AxiosInstance.post(`${LOGIN_URL}`, {
        email,
        password,
      });

      console.log('result',result)
    //   if (result?.status >= 200 && result?.status < 300) {
    //     // Success
    //   } 
    //   else {
    //     // Handle error
    //     throw new Error('Login failed');
    //   }
    //   console.log('result',result);

    // } catch (error) {
    //   console.error('Error during login:', error);
    //   if (error.response) {
    //     console.log('Response data:', error.response.data);
    //     console.log('Response status:', error.response.status);
    //     console.log('Response headers:', error.response.headers);
    //   }
      // Handle error
    }
    catch (error) {
         console.error('Error during login:', error);
      //   if (error.response) {
      //     console.log('Response data:', error.response.data);
      //     console.log('Response status:', error.response.status);
      //     console.log('Response headers:', error.response.headers);
       }
    
  };
  //end
  const login = async () => {
    setLoading(true);

    if ((email, password)) {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // console.log('Here is my email ::',email,password)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/wrong-password") {
            setLoading(false);
            Alert.alert(Strings.ST113);
          } else if (errorCode === "auth/user-not-found") {
            setLoading(false);
            Alert.alert(Strings.ST37);
          } else {
            setLoading(false);
            Alert.alert(Strings.ST33);
          }
        });
    } else {
      setLoading(false);
      Alert.alert(Strings.ST33);
    }
  };

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
