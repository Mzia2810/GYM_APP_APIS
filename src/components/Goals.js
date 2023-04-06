import React, { useState, useEffect } from "react";
import { ScrollView, View, ImageBackground } from "react-native";
import Styles from "../config/Styles";
import { map } from "lodash";
import Loading from "./InnerLoading";
import { getGoals } from "../config/DataApp";
import TouchableScale from "react-native-touchable-scale";
import { Text, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { GetAllExercise, MyExercise } from "../apis/ApiHandlers";
import { log } from "react-native-reanimated";

export default function Goals() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [allExerciseData, setAllExerciseData] = useState([]);

  const GetAllExercise = async () => {
    let result = await GetAllExercise();

    if (result?.status >= 200 && result?.status < 300) {
      //success
      console.log(result.data);
    } else {
      //catch
      console.log('Error:', result.statusText);
    }
  };


  useEffect(() => {
    GetAllExercise()
  }, []);


  useEffect(() => {
    MyExercise().then((response) => {
      setData(response.data.data);
      setIsLoaded(true);
    });
  }, []);



  useEffect(() => {
    getGoals().then((response) => {
      setItems(response);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <Loading />;
  }

  if (isLoaded) {
    return (
      <View style={{ marginVertical: 10, marginBottom: 20 }}>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ flexGrow: 1, paddingRight: 20 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {map(data, (item, index) => (
            // console.log('item ==> : ',item)
            <RenderItem key={index} item={item} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

function RenderItem(props) {
  const navigation = useNavigation();

  const onChangeScreen = (_id, title) => {
    navigation.navigate("singlegoal", {
      id: _id,
      title: title,
    });
  };

  const { item } = props;
  const { _id, title } = item;

  // console.log(item.image);

  return (
    <View style={Styles.card6_view}>
      <TouchableScale
        onPress={() => onChangeScreen(_id, title)}
        activeOpacity={1}
        activeScale={0.98}
        tension={100}
        friction={10}
      >
        <ImageBackground
          source={{
            uri: `${"https://wb-best-fit.herokuapp.com/"}${item?.image}`,
          }}
          style={Styles.card6_background}
          imageStyle={{ borderRadius: 8 }}
          resizeMode="cover" // or "contain"
        >
          <View style={Styles.card6_gradient}>
            <Text style={Styles.card6_title} numberOfLines={2}>
              {item?.title}
            </Text>
          </View>
        </ImageBackground>
      </TouchableScale>
    </View>
  );
}
