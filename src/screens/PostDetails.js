import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, ImageBackground, ScrollView, useWindowDimensions } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getPostById } from "../config/DataApp";
import AppLoading from '../components/InnerLoading';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native-paper';
import { HTMLStyles } from '../config/HTMLStyles';
import { HTMLStylesDark } from '../config/HTMLStylesDark';
import HTMLView from 'react-native-render-html';
import usePreferences from '../hooks/usePreferences';
import moment from 'moment';
import { IMAGE_URL } from '../apis/AxiosInstance';

export default function PostDetails(props) {

  const { width } = useWindowDimensions();
  const { route } = props;
  const { navigation } = props;
  const { id, itemdata } = route.params;

  const { theme } = usePreferences();

  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState([]);
  console.log("🚀 ~ file: PostDetails.js:28 ~ PostDetails ~ item:", item)

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  useEffect(() => {
    getPostById(id).then((response) => {
      setItem(response[0]);
      setIsLoaded(true);
    });
  }, []);


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

            <View>

              <ImageBackground source={{ uri: id ? item?.image : `${IMAGE_URL}/${itemdata?.image}` }} style={Styles.Header2Image} resizeMode={'cover'}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.5)']} style={Styles.Header2Gradient}>

                  <Text style={[Styles.Header2SubTitle, { fontSize: 14 }]}>{moment(id ? item?.date : itemdata?.date).fromNow()}</Text>
                  <Text style={Styles.Header2Title}>{id ? item?.title : itemdata?.title}</Text>
                  <Text style={[Styles.Header2Category, { fontSize: 18, fontWeight: 'bold' }]}>{id ? item?.tag : itemdata?.tag?.title}</Text>

                </LinearGradient>
              </ImageBackground>

              <View style={{ marginTop: 15, marginHorizontal: 15 }}>
                <HTMLView source={{ html: id ? item.description : itemdata?.description }} contentWidth={width} tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark} />
              </View>

            </View>
          </SafeAreaView>
        </ScrollView>

      </View>

    );

  }

}


