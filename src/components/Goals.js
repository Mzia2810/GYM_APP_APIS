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
import { MyExercise,GetSpecificExercise } from "../apis/ApiHandlers";
import { log } from "react-native-reanimated";
import { IMAGE_URL } from "../apis/AxiosInstance";

export default function Goals() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [allExerciseData, setAllExerciseData] = useState([]);
  const [specific,setSpecificExercise] = useState([])





//  get Specific exercises
  const Get_Specific_Exercise = async (_id) => {
    try {
      let data = JSON.stringify({
        _id
      });
      const result = await AxiosInstance.post(`${GET_SPECIFIC_EXERCISE}`, data);
      if (result.status >= 200 && result.status < 300) {
        setSpecificExercise(result.data)
        
        console.log('this is my Specific exercises ====>  ',result.data);
      }
    } catch (error) {
      console.error("Error during Specific Exercise ==>:", error);
    }
  };
//  get all exercises
  const Get_All_Exercise = async (_id) => {
    try {
      let data = JSON.stringify({
        _id
      });
      const result = await AxiosInstance.post(`${GET_ALL_EXERCISE}`, data);
      if (result.status >= 200 && result.status < 300) {
        setAllExerciseData(result.data)
        
        // console.log('this is my all exercises ====>  ',result.data);
      }
    } catch (error) {
      console.error("Error during All Exercise ==>:", error);
    }
  };

 

  // console.log('allExerciseData ============> ',allExerciseData)


  useEffect(() => {
    MyExercise().then((response) => {
      setData(response.data.data);
      setIsLoaded(true);
    });
  }, []);
  // useEffect(() => {
  //   GetSpecificExercise('641d4d142a97307acb5e17b3').then((response) => {
  //     setSpecificExercise(response.data.data);
  //     setIsLoaded(true);
  //   });
  // }, []);

  useEffect(() => {
    // Get_Specific_Exercise('641d4d142a97307acb5e17b3')
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
            // console.log('item ==> : ',data)
            <RenderItem key={item._id} Get_All_Exercise={Get_All_Exercise}  allExerciseData={allExerciseData} item={item} />
          ))}
        </ScrollView>
      </View>
    );
  }
}

function RenderItem(props) {
  const navigation = useNavigation();
  const { allExerciseData } = props;
  const { item } = props;
 
  const { _id, title } = item;

  const onChangeScreen = (_id, title) => {
    props.Get_All_Exercise(_id);
    // console.log('allExerciseData ===> ',allExerciseData)
    navigation.navigate("singlegoal", {
      id: _id,
      title: title,
      allExerciseData:allExerciseData,
    });
  };

  

  // console.log('allExerciseData =================== ...=======> : ',allExerciseData);

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
    </View>
  );
}
