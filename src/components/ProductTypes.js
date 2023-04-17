import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { map } from 'lodash';
import Loading from './InnerLoading';
import { getProductTypes } from "../config/DataApp";
import { Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getProductType } from '../apis/ApiHandlers';

export default function ProductTypes() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getProductType().then((response) => {
      setData(response?.data?.product);
      setIsLoaded(true);
    });
    // getProductTypes().then((response) => {
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
      <View style={{ marginVertical: 10 }}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {map(data, (item, index) => (
            <RenderItem key={index} item={item} />

          ))}
        </ScrollView>
      </View>
    );
  }

}

function RenderItem(props) {

  const navigation = useNavigation();

  const onChangeScreen = (title, id) => {
    navigation.navigate('singletype', {
      title: title,
      id: id
    });
  };

  const { item } = props;
  const { title, _id } = item;

  return (

    <View style={{ marginLeft: 15 }}>
      <Chip icon="tag" mode="outlined" onPress={() => onChangeScreen(title, _id)}>{item?.title}</Chip>
    </View>

  )

}