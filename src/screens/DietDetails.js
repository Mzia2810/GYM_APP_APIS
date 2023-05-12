import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getDietById, removeDietBookmark, setDietBookmark } from "../config/DataApp";
import AppLoading from '../components/InnerLoading';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, IconButton, Card } from 'react-native-paper';
import { Col, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HTMLStyles } from '../config/HTMLStyles';
import { HTMLStylesDark } from '../config/HTMLStylesDark';
import HTMLView from 'react-native-render-html';
import usePreferences from '../hooks/usePreferences';
import { useFocusEffect } from '@react-navigation/native';
import { favouriteDiet, getFavouriteDiets, getSpecificDiet, setFavouriteDiet } from '../apis/ApiHandlers';
import { IMAGE_URL } from '../apis/AxiosInstance';
import {
  getAuth,

} from "firebase/auth";
export default function DietDetails(props) {
  const auth = getAuth();

  console.log("🚀 ~ file: DietDetails.js:26 ~ DietDetails ~ user:", user)

  const { width } = useWindowDimensions();
  const { route } = props;
  const { id, user } = route.params;
  console.log("🚀 ~ file: DietDetails.js:32 ~ DietDetails ~ user:", user)
  console.log("🚀 ~ file: DietDetails.js:32 ~ DietDetails ~ id:", id)

  const { theme } = usePreferences();

  const [loading, setLoading] = useState(false);
  const [isBookmark, setBookmark] = useState(false);
  console.log("🚀 ~ file: DietDetails.js:38 ~ DietDetails ~ isBookmark:", isBookmark)
  const [item, setItem] = useState();
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: DietDetails.js:39 ~ DietDetails ~ data:", data)

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;


  useFocusEffect(
    React.useCallback(() => {
      setLoading(true)


      getSpecificDiet(id, user)
        .then(res => {
          setData(res?.data)
          setBookmark(data?.isFavorite)
        })
      props.navigation.setOptions({
        headerRight: () => renderButtonFav()
      });
      setLoading(false)
    }, [isBookmark])
  );

  // useEffect(() => {
  //   // getDietById(id).then((response) => {
  //   //   setItem(response[0]);
  //   //   setLoading(true);
  //   // });

  // }, []);


  const saveBookmark = () => {

    setBookmark(true);

    favouriteDiet(user, id)
      .then((response) => {
        setItem(response?.arr);
        console.log("Response====", response)

      }).catch((error) => {
        console.log("🚀 ~ file: DietDetails.js:113 ~ .then ~ error:", error)

        // setData(response?.arr);
      });
    getFavouriteDiets(user).then((res) => {
      console.log("🚀 ~ file: DietDetails.js:93 ~ getFavouriteDiets ~ res:", res?.data)

    })
  };

  const removeBookmark = () => {

    setBookmark(false);
    favouriteDiet(user, id)
      .then((response) => {
        setItem(response?.arr);
        console.log("Response====", response)

      }).catch((error) => {
        console.log("🚀 ~ file: DietDetails.js:131 ~ .then ~ error:", error)
      });

    getFavouriteDiets(user).then((res) => {
      console.log("🚀 ~ file: DietDetails.js:93 ~ getFavouriteDiets ~ res:", res)

    })
  };

  const renderButtonFav = () => {

    if (isBookmark === false) {
      return (
        <IconButton icon="heart-outline" iconColor={'#fff'} size={24}
          style={{ marginRight: 15 }}
          onPress={() => saveBookmark()} />
      )
    } else {
      return (
        <IconButton icon="heart" iconColor={"#ff0000"} size={24}
          style={{ marginRight: 15 }}
          onPress={() => removeBookmark()} />
      )
    }
  }



  if (loading) {

    return (

      // <View style={{ marginTop: 50 }}>
      <AppLoading />
      // </View>

    );

  }
  else {

    return (

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >

        <SafeAreaView>

          <View>

            <ImageBackground source={{ uri: `${IMAGE_URL}/${data?.diets?.image}` }} style={Styles.Header2Image} resizeMode={'cover'}>
              <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.4)']} style={Styles.Header2Gradient}>

                <Text style={Styles.Header2Category}>{data?.data?.category?.title}</Text>
                <Text style={Styles.Header2Title}>{data?.diets?.title}</Text>
                <Text style={Styles.Header2SubTitle}>{Strings.ST93 + ' ' + data?.diets?.servings + '  | ' + Strings.ST94 + ' ' + data?.diets?.time}</Text>

              </LinearGradient>
            </ImageBackground>

            <Grid style={Styles.DietGrid}>

              <Col style={Styles.DietGridCol}>
                <Text style={Styles.DietGridTitle}>{data?.diets?.calories}</Text>
                <Text style={Styles.DietGridSubTitle}>{Strings.ST117}</Text>
              </Col>

              <Col style={Styles.DietGridCol}>
                <Text style={Styles.DietGridTitle}>{data?.diets?.protein}</Text>
                <Text style={Styles.DietGridSubTitle}>{Strings.ST118}</Text>
              </Col>

              <Col style={Styles.DietGridCol}>
                <Text style={Styles.DietGridTitle}>{data?.diets?.fat}</Text>
                <Text style={Styles.DietGridSubTitle}>{Strings.ST119}</Text>
              </Col>

              <Col style={Styles.DietGridCol}>
                <Text style={Styles.DietGridTitle}>{data?.diets?.carbs}</Text>
                <Text style={Styles.DietGridSubTitle}>{Strings.ST120}</Text>
              </Col>

            </Grid>

            <View style={{ marginTop: 15, marginHorizontal: 15 }}>
              <Card style={{ marginBottom: 15, borderWidth: 0 }} mode={'outlined'}>
                <Card.Title title={Strings.ST114} />
                <Card.Content>
                  <HTMLView source={{ html: data?.diets?.description ? data?.diets?.description : `<p></p>` }} contentWidth={width} tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark} />
                </Card.Content>
              </Card>

              <Card style={{ marginBottom: 15, borderWidth: 0 }} mode={'outlined'}>
                <Card.Title title={Strings.ST115} />
                <Card.Content>
                  <HTMLView source={{ html: data?.diets?.ingrediants ? data?.diets?.ingrediants : `<p></p>` }} contentWidth={width} tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark} />
                </Card.Content>
              </Card>

              <Card style={{ marginBottom: 15, borderWidth: 0 }} mode={'outlined'}>
                <Card.Title title={Strings.ST116} />
                <Card.Content>
                  <HTMLView source={{ html: data?.diets?.instructions ? data?.diets?.instructions : `<p></p>` }} contentWidth={width} tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark} />
                </Card.Content>
              </Card>

            </View>

          </View>
        </SafeAreaView>
      </ScrollView>

    );

  }

}


