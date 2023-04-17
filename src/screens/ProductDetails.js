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
  const { item, id } = route?.params;
  const { theme } = usePreferences();

  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(false);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  useEffect(() => {
    {
      id && getProductById(id).then((response) => {
        setData(response[0]);
        setIsLoaded(true);
      });
    }
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000)
  }, []);

  const buyNowClick = (url) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
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

              <ImageBackground source={{ uri: id ? `${data?.image}` : `${IMAGE_URL}/${item?.image}` }} style={Styles.Header2Image} resizeMode={'cover'}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)']} style={Styles.Header2Gradient}>

                  <Text style={Styles.Header2SubTitle}>{!id ? item?.type?.title : data?.type}</Text>
                  <Text style={Styles.Header2Title}>{id ? data?.title : item?.title}</Text>
                  <Text style={[Styles.Header2Category, { fontSize: 20, fontWeight: 'bold' }]}>{id ? data?.price : item?.price}</Text>

                </LinearGradient>
              </ImageBackground>

              <View style={{ marginTop: 15, marginHorizontal: 15 }}>
                <HTMLView source={{ html: item?.description ? item?.description : data?.description }} contentWidth={width} tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark} />
              </View>

            </View>
          </SafeAreaView>
        </ScrollView>

        <View>
          <FAB
            style={{ marginHorizontal: 50, marginBottom: 20 }}
            label={Strings.ST107}
            icon="cart"
            onPress={() => buyNowClick(id ? data?.link : item?.affliateLink)}
          />
        </View>

      </View>

    );

  }

}


