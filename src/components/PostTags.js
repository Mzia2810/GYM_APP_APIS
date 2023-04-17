import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { map } from 'lodash';
import Loading from './InnerLoading';
import { getPostTags } from "../config/DataApp";
import { Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { getAllTags } from '../apis/ApiHandlers';

export default function PostTags() {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

  function RenderItem({ item }) {
    const navigation = useNavigation();
    const { _id, title } = item;
    return (

      <View style={{ marginLeft: 15 }}>
        <Chip icon="tag" mode="outlined" onPress={() => navigation.navigate('singletag', { _id, title })}>
          {item.title}
        </Chip>
      </View>

    )

  }
  useEffect(() => {
    // getPostTags().then((response) => {
    //   setItems(response);
    //   setIsLoaded(true);
    // });
    getAllTags().then((response) => {
      setData(response.data);
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
      <View style={{ marginVertical: 10 }}>
        <ScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20 }}
          horizontal
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

