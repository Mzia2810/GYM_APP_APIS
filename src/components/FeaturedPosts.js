import React, { useState, useEffect } from 'react';
import { ScrollView, View, ImageBackground } from 'react-native';
import Styles from '../config/Styles';
import { map } from 'lodash';
import Loading from './InnerLoading';
import { getFeaturedPosts } from "../config/DataApp";
import TouchableScale from 'react-native-touchable-scale';
import { Paragraph, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import ColorsApp from '../config/ColorsApp';
import moment from 'moment';
import { useNavigation } from '@react-navigation/core';
import { getAllBlog } from '../apis/ApiHandlers';
import { IMAGE_URL } from '../apis/AxiosInstance';

export default function FeaturedPosts() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

  const navigation = useNavigation();

  const onChangeScreen = (itemdata) => {
    navigation.navigate('postdetails', { itemdata });
  };

  useEffect(() => {
    getAllBlog().then((response) => {
      setData(response?.data.data);
      setIsLoaded(true);
    });
    // getFeaturedPosts().then((response) => {
    //   setItems(response);
    //   setIsLoaded(true);
    // });
  }, []);


  if (!isLoaded) {
    return (
      <Loading />
    );
  }

  if (isLoaded) {
    return (
      <View style={{ marginTop: 20 }}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20, /*flexDirection: 'row-reverse'*/ }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {map(data, (item, i) => (

            <TouchableScale key={i} activeOpacity={1} onPress={() => onChangeScreen(item)} activeScale={0.98} tension={100} friction={10}>
              <ImageBackground source={{ uri: `${IMAGE_URL}/${item?.image}` }} style={Styles.card1_background} imageStyle={{ borderRadius: 8 }}>
                <LinearGradient colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']} style={Styles.card1_gradient}>

                  <View style={[Styles.card3_viewicon, { paddingLeft: 5, paddingVertical: 6 }]}>
                    <Text style={[Styles.card3_icon, { paddingLeft: 0 }]}>{item?.tag?.title}</Text>
                  </View>

                  <Paragraph style={Styles.card1_subtitle}>{item?.level}</Paragraph>
                  <Text numberOfLines={2} style={Styles.card1_title}>{item?.title}</Text>
                  <Text numberOfLines={1} style={[Styles.card1_title, { color: ColorsApp.PRIMARY, marginVertical: 5 }]}>{moment(item?.date).fromNow()}</Text>

                </LinearGradient>
              </ImageBackground>
            </TouchableScale>

          ))}
        </ScrollView>
      </View>
    );
  }

}