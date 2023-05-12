import React, { useState, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, I18nManager } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getFavDiets } from "../config/DataApp";
import { getFavouriteDiets } from "../apis/ApiHandlers";
import { map } from 'lodash';
import AppLoading from '../components/InnerLoading';
import NoContentFound from '../components/NoContentFound';
import TouchableScale from 'react-native-touchable-scale';
import { List, Avatar } from 'react-native-paper';
import { IMAGE_URL } from '../apis/AxiosInstance';
import { useFocusEffect } from '@react-navigation/native';
import {
  getAuth,

} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function DietsFav(props) {
  const auth = getAuth();

  const [user, setUser] = useState({});
  console.log("🚀 ~ file: DietsFav.js:22 ~ DietsFav ~ user:", user)


  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  console.log("🚀 ~ file: DietsFav.js:29 ~ DietsFav ~ data:", data)

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

  const onClickItem = (id, title) => {
    props.navigation.navigate('dietdetails', { id, title, user: user?.id });
  };


  // useFocusEffect(
  //   React.useCallback(() => {
  //     const favouriteData = () => {
  //       alert('favData')
  //       setIsLoaded(true);
  //       (async () => {
  //         AsyncStorage.getItem("@user").then((value) => {
  //           if (value !== null) {
  //             setUser(JSON.parse(value));
  //             let res = getFavouriteDiets(user?.id).than({

  //             })
  //             console.log("🚀 ~ file: DietsFav.js:49 ~ useEffect ~ res:", res?.arr)
  //             setData(res?.arr);
  //           }
  //         });
  //         console.log("🚀 ~ file: DietsFav.js:50 ~ user:", user?.id)

  //       })();
  //       setIsLoaded(false);
  //     }
  //     favouriteData()
  //   }, [])
  // );

  useFocusEffect(
    React.useCallback(() => {
      const favouriteData = async () => {
        setIsLoaded(true);
        try {
          const value = await AsyncStorage.getItem("@user");
          if (value !== null) {
            const user = JSON.parse(value);
            setUser(user)
            console.log("🚀 ~ file: DietsFav.js:50 ~ user:", user?.id);
            let res = await getFavouriteDiets(user?.id);
            console.log("🚀 ~ file: DietsFav.js:49 ~ useEffect ~ res:", res?.arr);
            setData(res?.arr);
          }
        } catch (error) {
          console.log(error);
        }
        setIsLoaded(false);
      };
      favouriteData();
    }, [])
  );


  if (isLoaded) {

    return (

      <AppLoading />

    );

  } else {

    return (

      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >

        <SafeAreaView>

          <View style={Styles.ContentScreen}>

            {map(data, (item, i) => (

              <TouchableScale key={i} activeOpacity={1} onPress={() => onClickItem(item?._id, item?.title)} activeScale={0.98} tension={100} friction={10}>
                <List.Item
                  key={i}
                  title={item?.title}
                  titleStyle={{ fontWeight: 'bold', fontSize: 15, marginBottom: 3 }}
                  activeOpacity={1}
                  titleNumberOfLines={2}
                  underlayColor="transparent"
                  rippleColor="transparent"
                  left={props => <Avatar.Image size={70} style={{ marginRight: 10 }} source={{ uri: `${IMAGE_URL}/${item?.image}` }} />}
                  right={props => <List.Icon {...props} icon={rightIcon} style={{ marginBottom: 30, alignSelf: 'center', opacity: 0.3 }}
                  />}
                />
              </TouchableScale>

            ))}

            <NoContentFound data={data} />

          </View>
        </SafeAreaView>
      </ScrollView>

    );

  }

}


