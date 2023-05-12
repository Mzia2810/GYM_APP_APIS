import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground } from 'react-native';
import Styles from '../config/Styles';
import { map, set } from 'lodash';
import Loading from './InnerLoading';
import { getLatestWorkouts } from "../config/DataApp";
import TouchableScale from 'react-native-touchable-scale';
import { Paragraph, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LevelRate from './LevelRate';
import { MyExercise, getPlans } from '../apis/ApiHandlers';
import { IMAGE_URL } from '../apis/AxiosInstance';

import NoContentFound from '../components/NoContentFound';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function LatestWorkouts() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);


  const navigation = useNavigation();

  const onChangeScreen = (itemData) => {
    navigation.navigate('workoutdetails', { itemData });
  };


  useEffect(async () => {
    // MyExercise().then((response) => {
    //   setData(response);
    //   setIsLoaded(true)
    // // console.log('This is my new api =======>  :',response.data)
    // })
    const token = await AsyncStorage.getItem('@token')
    console.log("🚀 ~ file: LatestWorkouts.js:38 ~ useEffect ~ token:", token)

  }, [])

  useEffect(() => {
    // getLatestWorkouts().then((response) => {
    //   setItems(response);
    //   setIsLoaded(true);

    // });
    getPlans().then((response) => {
      setData(response?.data?.plan);
      setIsLoaded(true);
    });
  }, []);


  if (!isLoaded) {
    return (
      <Loading />
    );
  }

  if (isLoaded) {
    return (
      <View style={{ marginTop: 10 }}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20, /*flexDirection: 'row-reverse'*/ }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          <View>
            {data.map((item, i) => {
              return item.workout.map((diet, j) => {
                return (
                  <TouchableScale key={i} activeOpacity={1} onPress={() => onChangeScreen(item)} activeScale={0.98} tension={100} friction={10}>
                    <ImageBackground source={{ uri: `${IMAGE_URL}/${diet?.image}` }} style={Styles.card1_background} imageStyle={{ borderRadius: 8 }}>
                      <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.card1_gradient}>
                        <Text numberOfLines={2} style={Styles.card3_title}>{diet?.title}</Text>
                        <Text numberOfLines={2} style={Styles.card3_subtitle}>{diet?.duration}</Text>

                      </LinearGradient>
                    </ImageBackground>
                  </TouchableScale>
                );
              });
            })}
            <NoContentFound data={data} left={'45%'} />
          </View>
        </ScrollView>
      </View >
    );
  }

}