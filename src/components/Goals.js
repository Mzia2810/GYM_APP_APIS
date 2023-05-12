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
import { MyExercise, GetSpecificExercise, getAllExercises, GetExerciseDrawerBodyParts } from "../apis/ApiHandlers";
import { log } from "react-native-reanimated";
import { IMAGE_URL } from "../apis/AxiosInstance";
import { GET_ALL_EXERCISE } from "../apis/ApisEndPoints";

export default function Goals() {
  const navigation = useNavigation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [iid, setId] = useState([]);
  const [data, setData] = useState([]);
  // console.log("🚀 ~ file: Goals.js:21 ~ Goals ~ data:", data)
  const [allExerciseData, setAllExerciseData] = useState([]);
  const [specific, setSpecificExercise] = useState([])





  // //  get Specific exercises
  // const Get_Specific_Exercise = async (_id) => {
  //   try {
  //     let data = JSON.stringify({
  //       _id
  //     });
  //     const result = await AxiosInstance.post(`${Get_Specific_Exercise}`, data);
  //     if (result.status >= 200 && result.status < 300) {
  //       setSpecificExercise(result.data)

  //       console.log('this is my Specific exercises ====>  ', result.data);
  //     }
  //   } catch (error) {
  //     console.error("Error during Specific Exercise ==>:", error);
  //   }
  // };
  const onChangeScreen = (_id, title) => {
    // console.log('allExerciseData ===> ',allExerciseData)
    navigation.navigate("singlegoal", {
      id: _id,
      title: title,
      allExerciseData: allExerciseData,
    });
  };



  useEffect(() => {
    setIsLoaded(false);
    GetExerciseDrawerBodyParts()
      .then((response) => {
        setData(response?.data?.data);
      });
    // MyExercise().then((response) => {
    //   setData(response.data.data);
    //   setIsLoaded(true);
    // });
    setIsLoaded(true);
  }, []);
  // useEffect(() => {
  //   GetSpecificExercise('641d4d142a97307acb5e17b3').then((response) => {
  //     setSpecificExercise(response.data.data);
  //     setIsLoaded(true);
  //   });
  // }, []);

  useEffect(() => {
    setIsLoaded(false);
    // Get_Specific_Exercise('641d4d142a97307acb5e17b3')
    getGoals().then((response) => {
      setItems(response);
      setItems(response);
      // setIsLoaded(true);
    });
    // getAllExercises()
    //   .then((response) => {
    //     setId(response.data);
    //     setIsLoaded(true);
    //     console.log("🚀 ~ file: Goals.js:20 ~ Goals ~ oood:", iid)

    //   });
    setIsLoaded(true);
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
            <TouchableScale
              onPress={() => onChangeScreen(item?._id, item?.title)}
              activeOpacity={1}
              activeScale={0.98}
              tension={100}
              friction={10}
              key={item?._id}
            >
              <ImageBackground
                source={{
                  uri: `${IMAGE_URL}/${item?.image}`,
                }}
                style={Styles.card6_background}
                imageStyle={{ borderRadius: 8 }}
                resizeMode="contain" // or "cover"
              >
                <View style={Styles.card6_gradient}>
                  <Text style={Styles.card6_title} numberOfLines={2}>
                    {item?.title}
                  </Text>
                </View>
              </ImageBackground>
            </TouchableScale>
          ))}
        </ScrollView>
      </View>
    );
  }
}


