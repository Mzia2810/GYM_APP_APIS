import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Image,
  SafeAreaView,
  I18nManager,
} from "react-native";
import Styles from "../config/Styles";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import { getExercisesByMuscle } from "../config/DataApp";
import { map } from "lodash";
import AppLoading from "../components/InnerLoading";
import TouchableScale from "react-native-touchable-scale";
import { List } from "react-native-paper";
import LoadMoreButton from "../components/LoadMoreButton";
import ColorsApp from "../config/ColorsApp";
import NoContentFound from "../components/NoContentFound";
import { GET_ALL_EXERCISE, GET_WORKOUT_DETAILS } from "../apis/ApisEndPoints";
import AxiosInstance, { IMAGE_URL } from "../apis/AxiosInstance";

export default function SingleMuscle(props) {
  const { route } = props;
  const { navigation } = props;
  const { id, title, allExercise } = route.params;

  // console.log("Single muslce ============== > ", allExercise);

  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [workoutDetails, setWorkoutDetails] = useState([]);
  const [showButton, setshowButton] = useState(true);
  const [loading, setLoading] = useState(false);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

  const onClickItem = (_id, title,item) => {

    console.log('item ==================::::::::::::::::;',item)
    navigation.navigate("exercisedetails", { _id, title ,item});
  };

  //  get all exercises category
  // const Get_Workout_Details = async (_id) => {
  //   try {
  //     let data = JSON.stringify({
  //       _id
  //     });
  //     const result = await AxiosInstance.post(`${GET_WORKOUT_DETAILS}`, data);
  //     if (result.status >= 200 && result.status < 300) {
  //       setWorkoutDetails(result.data.result)
        
  //       // console.log('this Workout Details exercises from single muscle screen ====>  ',result.data.result);
  //     }
  //   } catch (error) {
  //     console.error("Error during All Exercise ==>:", error);
  //   }
  // };



  const loadMore = () => {
    setLoading(true);
    setPage(page + 1);

    getExercisesByMuscle(id, page + 1).then((response) => {
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
      <View style={{ marginTop: 30 }}>
        <LoadMoreButton
          Indicator={loading}
          showButton={showButton}
          Items={items}
          Num={8}
          Click={() => loadMore()}
        />
      </View>
    );
  };

  useEffect(() => {
    props.navigation.setOptions({
      title: title,
    });
  }, []);

  useEffect(() => {
    getExercisesByMuscle(id).then((response) => {
      setItems(response);
      setIsLoaded(true);
    });
  }, []);

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <SafeAreaView>
          <View style={Styles.ContentScreen}>
            {map(allExercise, (item, i) => {
              // console.log('tite===================',item?.image)
              return (
                <TouchableScale
                  key={i}
                  activeOpacity={1}
                  onPress={() => onClickItem(item?._id, item?.title,item)}
                  activeScale={0.98}
                  tension={100}
                  friction={10}
                >
                  <List.Item
                    key={item?._id}
                    title={item?.title}
                    titleStyle={{
                      fontWeight: "bold",
                      fontSize: 15,
                      marginBottom: 3,
                    }}
                    description={item.level}
                    activeOpacity={1}
                    titleNumberOfLines={2}
                    underlayColor="transparent"
                    rippleColor="transparent"
                    left={(props) => (
                      <View style={Styles.itemListView2}>
                        <Image
                          source={{ uri:`${IMAGE_URL}/${item?.image}` }}
                          style={Styles.itemListImage2}
                          resizeMode={"center"}
                        />
                      </View>
                    )}
                    right={(props) => (
                      <List.Icon
                        {...props}
                        icon={rightIcon}
                        style={{ alignSelf: "center" }}
                        color={ColorsApp.PRIMARY}
                      />
                    )}
                  />
                </TouchableScale>
              );
            })}

            {renderButton()}

            <NoContentFound data={items} />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
