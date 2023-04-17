import React, { useState, useEffect } from "react";
import {
  getAuth,
  signOut,
  EmailAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  updateEmail
} from "firebase/auth";
import {
  ScrollView,
  View,
  Image,
  SafeAreaView,
  Alert,
  Platform,
  PermissionsAndroid,
  TouchableOpacity,
} from "react-native";
import AppLoading from "../components/InnerLoading";
import CustomButton from "../components/CustomButton";
import Styles from "../config/Styles";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import {
  Text,
  Button,
  Paragraph,
  Dialog,
  Portal,
  TextInput,
  Title,
} from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import { style } from "deprecated-react-native-prop-types/DeprecatedTextPropTypes";
import firebase from 'firebase/app';
// import auth from '@react-native-firebase/auth';

const auth = getAuth();

export default function Profile(props) {
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const [image, setImage] = useState();
  const [imageUri, setImageUri] = useState();

  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState([]);
  console.log(user)
  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  console.log(user);

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const deleteAccount = () => {
    if (password) {
      let credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        password
      );

      reauthenticateWithCredential(auth.currentUser, credential)
        .then(() => {
          deleteUser(user)
            .then(() => {
              // User deleted.
            })
            .catch((error) => {
              console.log(error);
              Alert.alert(Strings.ST32);
            });
        })
        .catch((error) => {
          console.log(error);
          Alert.alert(Strings.ST32);
        });
    }
  };

  const hideDialog = () => setVisible(false);

  const uploadFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need media library permissions to make this work!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
    });
    if (!result.cancelled && result.uri) {
      setImageUri(result.uri);
      // console.log(result.uri);
    }
  };

  // const [email, setEmail] = useState(user.email);
  const handleUpdateEmail = async () => {
    try {
      updateEmail(auth.currentUser, email).then((response) => {
        console.log('RESPONSE', response);
        console.log('Email updated successfully');

      }).catch(e => {
        console.log('ERROR', e);
      })
      // await firebase.auth().currentUser.updateEmail(email);
    } catch (error) {
      console.log(error);
      console.log('Error updating email');
    }
  };

  useEffect(() => {
    setUser(auth.currentUser);
    setIsLoaded(true);
  }, []);

  if (isLoaded) {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <TouchableOpacity
            onPress={() => uploadFromGallery()}
            style={{
              // alignSelf:'center',
              marginTop: 100,
              marginLeft: 217,
              padding: 3,
              borderRadius: 50,
              borderWidth: 1,
              zIndex: +1,
              backgroundColor: "white",
              position: "absolute",
            }}
          >
            <AntDesign name={"camera"} size={15} />
          </TouchableOpacity>
          <View style={Styles.HeaderProfile}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={Styles.ImageProfile}
                resizeMode={"cover"}
              />
            ) : (
              <Image
                source={require("../../assets/male.jpg")}
                style={Styles.ImageProfile}
                resizeMode={"cover"}
              />
            )}

            {/* <View style={{ flexDirection: "row" }}>
              {user.displayName ? (
                <TextInput
                  style={[
                    Styles.TextProfile,
                    { backgroundColor: "white", borderBottomWidth: 0 },
                  ]}
                >
                  Enter your name
                </TextInput>
              ) : (
                <Text style={Styles.TextProfile}>{user.displayName}</Text>
              )}
              {user.user_verified ? (
                <Icon
                  name="check-decagram"
                  size={22}
                  style={Styles.memberBadge}
                />
              ) : null}
            </View> */}
            <TextInput
              style={{ backgroundColor: "white", fontSize: 16, borderBottomWidth: 0, }}
              value={email ? email : user.email}
              onChangeText={(value) => setUser(value)}
              onSubmitEditing={handleUpdateEmail}
              placeholder={user.email}
            />
            {/* <Text>{user.email}</Text> */}
          </View>

          <View style={{ marginHorizontal: 30, marginBottom: 40 }}>
            <CustomButton
              Icon="dumbbell"
              Label={Strings.ST50}
              Click={() => onChangeScreen("customworkouts")}
            />
            <CustomButton
              Icon="silverware-fork-knife"
              Label={Strings.ST51}
              Click={() => onChangeScreen("customdiets")}
            />
            <CustomButton
              Icon="heart-outline"
              Label={Strings.ST4}
              Click={() => onChangeScreen("favorites")}
            />
            <CustomButton
              Icon="bookmark-outline"
              Label={Strings.ST110}
              Click={() => onChangeScreen("about")}
            />
            <CustomButton
              Icon="file-document-outline"
              Label={Strings.ST8}
              Click={() => onChangeScreen("terms")}
            />
            <CustomButton
              Icon="logout"
              Label={Strings.ST9}
              Click={() => signOut(auth)}
            />
            <CustomButton
              Icon="account-cancel-outline"
              Label={Strings.ST141}
              Click={() => setVisible(true)}
            />

            <Portal>
              <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Content>
                  <Title>{Strings.ST144}</Title>
                  <Paragraph style={{ marginVertical: 10 }}>
                    {Strings.ST145}
                  </Paragraph>
                  <TextInput
                    value={password}
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                  />
                </Dialog.Content>
                <Dialog.Actions
                  style={{
                    marginBottom: 8,
                    marginTop: -20,
                    marginHorizontal: 8,
                  }}
                >
                  <Button onPress={() => hideDialog()}>{Strings.ST142}</Button>
                  <Button onPress={() => deleteAccount()}>
                    {Strings.ST143}
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  } else {
    return <AppLoading />;
  }
}
