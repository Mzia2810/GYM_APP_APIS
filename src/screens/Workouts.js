import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground, SafeAreaView } from 'react-native';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import { getLatestWorkouts } from "../config/DataApp";
import { map } from 'lodash';
import AppLoading from '../components/InnerLoading';
import TouchableScale from 'react-native-touchable-scale';
import { Text, Button, IconButton } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import LevelRate from '../components/LevelRate';
import LoadMoreButton from '../components/LoadMoreButton';
import { Grid, Col } from 'react-native-easy-grid';
import { getPlans } from '../apis/ApiHandlers';
import { IMAGE_URL } from '../apis/AxiosInstance';

export default function Workouts(props) {

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  // console.log("🚀 ~ file: Workouts.js:23 ~ Workouts ~ items:", items)
  const [data, setData] = useState([]);
  // console.log("🚀 ~ file: Workouts.js:24 ~ Workouts ~ data:", data[0]?.diets[0])
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };

  const onClickItem = (itemData) => {
    props.navigation.navigate('workoutdetails', { itemData });
  };

  const buttonSearch = () => {
    return (
      <IconButton
        icon="magnify"
        size={24} style={{ marginLeft: 15 }}
        onPress={() => onChangeScreen('searchworkout')} />
    )
  };

  const loadMore = () => {

    setLoading(true);
    setPage(page + 1);

    getLatestWorkouts(page + 1).then((response) => {

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
        Items={items}
        Num={5}
        Click={() => loadMore()} />
    )
  }

  useEffect(() => {

    props.navigation.setOptions({
      headerRight: () => buttonSearch()
    });

  }, []);

  useEffect(() => {
    getLatestWorkouts().then((response) => {
      setItems(response);
      setIsLoaded(true);
    });
    getPlans().then((response) => {
      setData(response?.data?.plan);
      setIsLoaded(true);
    });
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

            {/* <Grid style={{marginBottom: 15, marginHorizontal: 5 , borderWidth:1, borderColor:'red'}}>
        <Col style={{margin: 5}}>
        <Button icon="lightning-bolt" mode="contained" labelStyle={{fontSize:15, letterSpacing:0}} uppercase={false} style={{elevation: 0}} contentStyle={{width:'100%'}} onPress={() => onChangeScreen('goals')}>
          {Strings.ST52}
        </Button>
        </Col>
        <Col style={{margin: 5}}>
        <Button icon="equalizer" mode="contained" labelStyle={{fontSize:15, letterSpacing:0}} uppercase={false} style={{elevation: 0}} contentStyle={{width:'100%'}} onPress={() => onChangeScreen('levels')}>
          {Strings.ST53}
        </Button>
        </Col>
        </Grid> */}

            {data.map((item, i) => {
              return item.workout.map((diet, j) => {
                return (
                  <TouchableScale key={`${i}-${j}`} activeOpacity={1} onPress={() => onClickItem(item?.workout)} activeScale={0.98} tension={100} friction={10}>
                    <ImageBackground source={{ uri: `${IMAGE_URL}/${diet?.image}` }} style={Styles.card3_background} imageStyle={{ borderRadius: 8 }}>
                      <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.card3_gradient}>
                        <Text numberOfLines={2} style={Styles.card3_title}>{diet?.title}</Text>
                        <Text numberOfLines={2} style={Styles.card3_subtitle}>{diet?.duration}</Text>

                      </LinearGradient>
                    </ImageBackground>
                  </TouchableScale>
                );
              });
            })}



            {/* {renderButton()} */}

          </View>
        </SafeAreaView>
      </ScrollView>

    );

  }

}

