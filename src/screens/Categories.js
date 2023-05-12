import React, { useState, useEffect } from 'react';
import { ScrollView, View, SafeAreaView, I18nManager } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getCategories } from "../config/DataApp";
import AppLoading from '../components/InnerLoading';
import TouchableScale from 'react-native-touchable-scale';
import { List, Avatar } from 'react-native-paper';
import { map } from 'lodash';
import ColorsApp from '../config/ColorsApp';
import { AllCategoryDiets } from '../apis/ApiHandlers';
import { IMAGE_URL } from '../apis/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Categories(props) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  // console.log("🚀 ~ file: Categories.js:18 ~ Categories ~ data:", data)

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

  const onClickItem = (id, title) => {
    props.navigation.navigate('singlecategory', { id, title, });
  };

  // useEffect(() => {
  //   getCategories().then((response) => {
  //     setItems(response);
  //     setIsLoaded(true);
  //   });
  // }, []);
  useEffect(() => {
    AllCategoryDiets()
      .then(res => setData(res.data))
      .catch(error => console.error(error));
    setIsLoaded(true);
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

            {map(data, (data, i) => (

              <TouchableScale key={i} activeOpacity={1} onPress={() => onClickItem(data?.categoryId, data?.title)} activeScale={0.98} tension={100} friction={10}>
                <List.Item
                  key={i}
                  title={data?.categoryTitle}
                  titleStyle={{ fontWeight: 'bold', fontSize: 15, marginBottom: 3 }}
                  activeOpacity={1}
                  description={data?.recipeLength + ' ' + Strings.ST63}
                  titleNumberOfLines={2}
                  underlayColor="transparent"
                  rippleColor="transparent"
                  left={props => <Avatar.Image size={80} style={{ marginRight: 10 }} source={{ uri: `${IMAGE_URL}/${data?.categoryImage}` }} />}
                  right={props => <List.Icon {...props} icon={rightIcon} style={{ alignSelf: 'center', opacity: 0.3, marginBottom: 30 }} color={ColorsApp.PRIMARY} />}
                />
              </TouchableScale>

            ))}


          </View>
        </SafeAreaView>
      </ScrollView>

    );

  }

}


