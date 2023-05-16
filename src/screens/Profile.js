import React, { useState, useEffect, useCallback } from "react";
import {
  getAuth,
  signOut,
  EmailAuthProvider,
  // deleteUser,
  reauthenticateWithCredential,
  updateEmail,
  // updateProfile
} from "firebase/auth";
import {
  ScrollView,
  View,
  Image,
  SafeAreaView,
  Alert,
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
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from 'expo-updates';
import { IMAGE_URL } from "../apis/AxiosInstance";
import { deleteUser, updateUserProfile } from "../apis/ApiHandlers";
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const auth = getAuth();

export default function Profile(props) {
  const { reset } = useNavigation();
  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const [imageUri, setImageUri] = useState(null);
  const [image, setImage] = useState(null);


  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState({});
  const [visible, setVisible] = useState(false);
  const [update, setUpDate] = useState(false);
  const [email, setEmail] = useState("");


  // useEffect(() => {

  // }, []);
  // useEffect(() => {
  //   setIsLoaded(true);
  //   AsyncStorage.getItem("@user").then((value) => {
  //     if (value !== null) {
  //       setUser(JSON.parse(value));
  //     }
  //   });
  //   if (imageUri) {
  //     // alert('image')
  //     handleUpdateEmail();
  //   }
  // }, [imageUri, update]);

  useFocusEffect(
    useCallback(() => {
      setIsLoaded(true);
      AsyncStorage.getItem("@user").then((value) => {
        if (value !== null) {
          setUser(JSON.parse(value));
        }
      });

    }, [])
  );
  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  // const deleteAccount = () => {
  //   if (password) {
  //     let credential = EmailAuthProvider.credential(
  //       auth.currentUser.email,
  //       password
  //     );

  //     reauthenticateWithCredential(auth.currentUser, credential)
  //       .then(() => {
  //         deleteUser(user)
  //           .then(() => {
  //           })
  //           .catch((error) => {
  //             Alert.alert(Strings.ST32);
  //           });
  //       })
  //       .catch((error) => {
  //         Alert.alert(Strings.ST32);
  //       });
  //   }
  // };
  const deleteAccount = async (id) => {
    await AsyncStorage.clear();
    const result = await deleteUser(id);
    setVisible(false)
    // props.navigation.navigate('register');
    reset({
      index: 0,
      routes: [{ name: 'register' }],
    });
  };

  const signOut = async () => {

    await AsyncStorage.clear();
    reset({
      index: 0,
      routes: [{ name: 'login' }],
    });

  }
  const hideDialog = () => setVisible(false);

  // const uploadFromGallery = async () => {
  //   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("Sorry, we need media library permissions to make this work!");
  //     return;
  //   }
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     quality: 0.5,
  //   });
  //   if (!result.cancelled) {
  //     setImageUri(result.assets[0]);
  //   }
  //   else {
  //     setImageUri(null);
  //   }
  //   // await handleUpdateEmail();

  // };

  // using firebase update email

  // const handleUpdateEmail = async () => {
  // try {
  //   updateEmail(auth.currentUser, email).then((response) => {
  //     signOut(auth)

  //   }).catch(e => {
  //     alert('email already in use')

  //   })
  // } catch (error) {
  // }
  // };
  // const handleUpdateEmail = async () => {
  //   const formData = new FormData();
  //   formData.append('image', imageUri || user?.image);
  //   formData.append('name', user?.name);
  //   formData.append('email', email);
  //   formData.append('userId', user?.id);
  //   const res = await updateUserProfile(formData)

  // }

  const uploadFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
      console.log("🚀 ~ file: Profile.js:186 ~ uploadFromGallery ~ result:", result)

      if (!result?.assets.cancelled) {
        setImageUri(result.assets[0].uri);
        setImage({
          fileType: result.assets[0].type,
          uri: result.assets[0].uri,

        });
        handleUpdateEmail()
      }
    } catch (error) {
      console.log('Error picking an image: ', error);
    }
  };

  // const handleUpdateEmail = async () => {
  //   // try {
  //   //   // if (email) {
  //   //   //   await updateEmail(auth.currentUser, email);
  //   //   // }
  //   //   const formData = new FormData();
  //   //   formData.append("image", imageUri || user?.image);
  //   //   formData.append("name", user?.name);
  //   //   formData.append("email", email || user?.email);
  //   //   formData.append("userId", user?.id);
  //   //   updateUserProfile(formData).then(result => setUser(result?.data))
  //   //   // setUser(res.data);
  //   // } catch (error) {
  //   // }

  //   try {
  //     const fileInfo = await FileSystem.getInfoAsync(imageUri);
  //     const fileType = fileInfo.mimeType;
  //     const fileName = fileInfo.uri.split('/').pop();
  //     const formData = new FormData();
  //     formData.append('image', {
  //       uri: imageUri,
  //       name: fileName,
  //       type: fileType,
  //     } || user?.image);
  //     formData.append('name', user?.name);
  //     formData.append('email', email || user?.email);
  //     formData.append('userId', user?.id);

  //     const response = await fetch("https://wb-basic-fit-production.up.railway.app/user/updateProfile", {
  //       method: 'POST',
  //       body: formData,
  //       headers: {
  //         "X-Custom-Header": "foobar",
  //         "Content-Type": "multipart/form-data",
  //       },
  //       redirect: 'follow',

  //     })
  //     const result = await response.json()
  //     console.log("🚀 ~ file: Profile.js:205 ~ handleUpdateEmail ~ result:", result?.updatedData)
  //     await AsyncStorage.removeItem('@user')
  //     await AsyncStorage.setItem("@user", JSON.stringify(result?.updatedData))
  //     const value = await AsyncStorage.getItem("@user")
  //     if (value !== null) {
  //       setUser(JSON.parse(value));
  //     }
  //   } catch (error) {
  //     // Handle network or upload error
  //     console.error(error);
  //   }
  // };



  const handleUpdateEmail = async () => {
    try {
      if (image !== null) {
        console.log("🚀 ~ file: Profile.js:259 ~ handleUpdateEmail ~ image:", image)
      }
      const formData = new FormData();
      formData.append('image', image != null ? image : user?.image);

      formData.append('name', user?.name);
      formData.append('email', email !== '' ? email : user?.email);
      formData.append('userId', user?.id);

      const response = await fetch("https://wb-basic-fit-production.up.railway.app/api/user/updateProfile", {
        method: 'POST',
        body: formData,
        headers: {
          "X-Custom-Header": "foobar",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("🚀 ~ file: Profile.js:274 ~ handleUpdateEmail ~ response:", response)
      const result = await response.json();

      await AsyncStorage.removeItem('@user');
      await AsyncStorage.setItem("@user", JSON.stringify(result?.updatedData));
      const value = await AsyncStorage.getItem("@user");
      console.log("🚀 ~ file: Profile.js:282 ~ handleUpdateEmail ~ value:", value)
      if (value !== null) {
        setUser(JSON.parse(value));
        setImage(null)
        setEmail('')
      }

    } catch (error) {
      console.error(error);
    }
  };

  // const uploadFromGallery = async () => {
  //   try {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //       quality: 1,
  //     });

  //     if (!result.cancelled) {
  //       setImageUri(result?.uri);
  //       const fileInfo = await FileSystem.getInfoAsync(result.uri);
  //       const fileType = fileInfo.mimeType;
  //       const fileName = fileInfo.uri.split('/').pop();
  //       const formData = new FormData();
  //       formData.append('image', {
  //         uri: result.uri,
  //         fileName: fileName,
  //         fileType: fileType,
  //       });
  //       formData.append('name', user?.name);
  //       formData.append('email', user?.email);
  //       formData.append('userId', user?.id);

  //       const response = await fetch("https://wb-basic-fit-production.up.railway.app/api/user/updateProfile", {
  //         method: 'POST',
  //         body: formData,
  //         headers: {
  //           "X-Custom-Header": "foobar",
  //           "Content-Type": "multipart/form-data",
  //         },
  //         redirect: 'follow',
  //       });
  //       const result = await response.json();

  //       await AsyncStorage.removeItem('@user');
  //       await AsyncStorage.setItem("@user", JSON.stringify(result?.updatedData));
  //       const value = await AsyncStorage.getItem("@user");
  //       if (value !== null) {
  //         setUser(JSON.parse(value));
  //       }
  //     }
  //   } catch (error) {
  //     console.log('Error picking an image: ', error);
  //   }
  // };




  // const updateUserProfile = async (photoUrl) => {
  //   const user = auth.currentUser;
  //   try {
  //     await updateProfile(user, {
  //       photoURL: photoUrl,
  //     });
  //   } catch (error) {
  //   }
  // }


  if (isLoaded) {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <TouchableOpacity
            onPress={uploadFromGallery}
            style={{
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
            {imageUri || user?.image ? (
              <Image
                source={{ uri: imageUri ? imageUri : `${IMAGE_URL}/${user?.image}` }}
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
              value={email ? email : user?.email}
              onChangeText={(value) => setEmail(value)}
              onSubmitEditing={handleUpdateEmail}
              placeholder={user.email}
              returnKeyType="done"
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
              Click={() => signOut()}
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
                  {/* <Paragraph style={{ marginVertical: 10 }}>
                    {Strings.ST145}
                  </Paragraph> */}
                  {/* <TextInput
                    value={password}
                    mode="outlined"
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                  /> */}
                </Dialog.Content>
                <Dialog.Actions
                  style={{
                    marginBottom: 8,
                    marginTop: -20,
                    marginHorizontal: 8,
                  }}
                >
                  <Button onPress={() => hideDialog()}>{Strings.ST142}</Button>
                  <Button onPress={() => deleteAccount(user?.id)}>
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
