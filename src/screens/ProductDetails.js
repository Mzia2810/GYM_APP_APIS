import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, ImageBackground, Linking, ScrollView, useWindowDimensions } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getProductById } from "../config/DataApp";
import AppLoading from '../components/InnerLoading';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, FAB } from 'react-native-paper';
import { HTMLStyles } from '../config/HTMLStyles';
import { HTMLStylesDark } from '../config/HTMLStylesDark';
import HTMLView from 'react-native-render-html';
import usePreferences from '../hooks/usePreferences';
import { IMAGE_URL } from '../apis/AxiosInstance';

export default function ProductDetails(props) {

  const { width } = useWindowDimensions();
  const { route } = props;
  const { navigation } = props;
  const { item } = route?.params;
  // '{"__v": 0, "_id": "641993a7a0fd3f84e721bd0f", 
  // "affliateLink": "google.com", "description": "Affiliate product update",
  //  "featured": false, "image": "55d6b8a7-bbf4-4426-a1f0-c9b9236c1919-1680517261351.jpg",
  //   "price": 500, "status": true, "title": "Affiliate product update", 
  //   "type": {"_id": "64268f91bacba07c76085715", "title": "protein"}}'
  const { theme } = usePreferences();

  const [isLoaded, setIsLoaded] = useState(false);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  useEffect(() => {
    // getProductById(id).then((response) => {
    //   setItem(response[0]);
    //   setIsLoaded(true);
    // });
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000)
  }, []);

  const buyNowClick = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        alert("Don't know how to open URI: " + url);
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  if (!isLoaded) {

    return (

      <View style={{ marginTop: 50 }}>
        <AppLoading />
      </View>

    );

  } else {

    return (

      <View style={{ flex: 1 }}>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >

          <SafeAreaView>

            <View style={{ marginBottom: 30 }}>

              <ImageBackground source={{ uri: `${IMAGE_URL}/${item?.image}` }} style={Styles.Header2Image} resizeMode={'cover'}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)']} style={Styles.Header2Gradient}>

                  <Text style={Styles.Header2SubTitle}>{item?.type?.title}</Text>
                  <Text style={Styles.Header2Title}>{item?.title}</Text>
                  <Text style={[Styles.Header2Category, { fontSize: 20, fontWeight: 'bold' }]}>{item?.price}</Text>

                </LinearGradient>
              </ImageBackground>

              <View style={{ marginTop: 15, marginHorizontal: 15 }}>
                <HTMLView source={{ html: item.description ? item.description : `<p></p>` }} contentWidth={width} tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark} />
              </View>

            </View>
          </SafeAreaView>
        </ScrollView>

        <View>
          <FAB
            style={{ marginHorizontal: 50, marginBottom: 20 }}
            label={Strings.ST107}
            icon="cart"
            onPress={() => buyNowClick(item?.affliateLink)}
          />
        </View>

      </View>

    );

  }

}


