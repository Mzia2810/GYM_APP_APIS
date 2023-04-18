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
import {
  getAuth,

} from "firebase/auth";
export default function DietsFav(props) {
  const auth = getAuth();

  const [user, setUser] = useState([]);
  console.log("🚀 ~ file: DietsFav.js:22 ~ DietsFav ~ user:", user)


  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

  const onClickItem = (id, title) => {
    props.navigation.navigate('dietdetails', { id, title });
  };

  useEffect(() => {
    getFavouriteDiets('641442d3a09d72d4d2e2411c')
      .then((response) => {
        setData(response?.arr);
        setIsLoaded(true);
      });
    // getFavDiets().then((response) => {
    //   setItems(response);
    //   setIsLoaded(true);
    // });
  }, []);
  useEffect(() => {
    setUser(auth.currentUser.uid);
  }, []);
  if (!isLoaded) {

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


