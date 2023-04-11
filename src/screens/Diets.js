import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, SafeAreaView } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getLatestDiets } from "../config/DataApp";
import { map } from 'lodash';
import AppLoading from '../components/InnerLoading';
import TouchableScale from 'react-native-touchable-scale';
import { Text, Button } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import LoadMoreButton from '../components/LoadMoreButton';
import { Grid, Col } from 'react-native-easy-grid';
import { AllCategoryDiets } from '../apis/ApiHandlers';
import { IMAGE_URL } from '../apis/AxiosInstance';

export default function Diets(props) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  // console.log("🚀 ~ file: Diets.js:22 ~ Diets ~ data:", data?.data)
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const onClickItem = (id, title) => {
    props.navigation.navigate('dietdetails', { id, title });
  };

  const loadMore = () => {

    setLoading(true);
    setPage(page + 1);

    getLatestDiets(page + 1).then((response) => {

      if (!items) {
        setItems(response);
        setLoading(false);
      } else {
        setItems([...items, ...response]);
        setLoading(false);
      }

      if (response.length <= 0) {
        setshowButton(false);
      }

      setIsLoaded(true);

    });

  };

  const renderButton = () => {

    return (
      <LoadMoreButton
        Indicator={loading}
        showButton={showButton}
        Items={data}
        Num={5}
        Click={() => loadMore()} />
    )
  }

  useEffect(() => {
    getLatestDiets().then((response) => {
      setItems(response);
      setIsLoaded(true);
    });
  }, []);
  useEffect(() => {
    AllCategoryDiets()
      .then(res => setData(res.data))
      .catch(error => console.error(error));
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

            <Grid style={{ marginBottom: 15, marginHorizontal: 5 }}>
              <Col style={{ margin: 5 }}>
                <Button icon="tag" mode="contained"
                  labelStyle={{ fontSize: 15, letterSpacing: 0 }}
                  uppercase={false} style={{ elevation: 0 }}
                  contentStyle={{ width: '100%' }} onPress={() => onChangeScreen('categories')}>
                  {Strings.ST28}
                </Button>
              </Col>
            </Grid>

            {map(data, (item, i) => (

              <TouchableScale key={i} activeOpacity={1} onPress={() => onClickItem(item?.categoryId, item?.categoryTitle)} activeScale={0.98} tension={100} friction={10}>
                <ImageBackground source={{
                  uri: `${IMAGE_URL}/${item?.categoryImage}`,
                }} style={Styles.card3_background} imageStyle={{ borderRadius: 8 }}>
                  <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.card3_gradient}>

                    <Text numberOfLines={1} style={Styles.card3_category}>{item?.recipeLength}</Text>
                    <Text numberOfLines={2} style={Styles.card3_title}>{item?.categoryTitle}</Text>
                    {/* <Text numberOfLines={1} style={[Styles.card3_subtitle, { opacity: 0.6 }]}>{item?.calories} {Strings.ST46} | {Strings.ST62} {item.servings}</Text> */}

                  </LinearGradient>
                </ImageBackground>
              </TouchableScale>

            ))}

            {renderButton()}

          </View>
        </SafeAreaView>
      </ScrollView>

    );

  }

}


