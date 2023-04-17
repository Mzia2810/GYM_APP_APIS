import React, { useState, useEffect } from "react";
import { ScrollView, View, ImageBackground, SafeAreaView } from "react-native";
import Styles from "../config/Styles";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import { getBodyparts } from "../config/DataApp";
import AppLoading from "../components/InnerLoading";
import TouchableScale from "react-native-touchable-scale";
import { Text, Button } from "react-native-paper";
import { FlatGrid } from "react-native-super-grid";
import { LinearGradient } from "expo-linear-gradient";
import { Grid, Col } from "react-native-easy-grid";
import axios from 'axios';
import {
  GetAllExerciseCategory,
  GetExerciseDrawerBodyParts,
} from "../apis/ApiHandlers";
import AxiosInstance, { IMAGE_URL } from "../apis/AxiosInstance";
import { GET_DRAWER_EXERCISE, GET_ALL_EXERCISE } from "../apis/ApisEndPoints";

export default function Exercises(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  const [allExercise, setAllExercise] = useState([]);

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;

  const onChangeScreen = (screen) => {
    props.navigation.navigate(screen);
  };



    //  get all exercises category
    const Get_Drawer_Exercise = async (_id) => {
      try {
        let data = JSON.stringify({
          _id
        });
        const result = await AxiosInstance.post(`${GET_DRAWER_EXERCISE}`, data);
        if (result.status >= 200 && result.status < 300) {
          setAllExercise(result.data.exercises)
          
          // console.log('this is my all drawer exercises ====>  ',result.data);
        }
      } catch (error) {
        console.error("Error during All Exercise ==>:", error);
      }
    };

    useEffect(() =>{
        
    },[])



  const onClickItem = (_id, title) => {
    setIsLoaded(true)
    Get_Drawer_Exercise(_id)
    setTimeout(() =>{

      props.navigation.navigate("singlemuscle", { _id, title ,allExercise});
    },2000)
  };

 


  useEffect(() => {
    GetExerciseDrawerBodyParts().then((response) => {
      setData(response.data.data);
      setIsLoaded(true);
    });
  }, []);


  useEffect(() => {
    
    getBodyparts().then((response) => {
      setItems(response);
      setIsLoaded(true);
    });
  }, []);

  // console.log('all exercises ===============',allExercise)


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
            {/* <Grid style={{marginBottom: 10, marginHorizontal: 5}}>
        <Col style={{margin: 5}}>
        <Button icon="dumbbell" mode="contained" labelStyle={{fontSize:15, letterSpacing:0}} uppercase={false} style={{elevation: 0}} contentStyle={{width:'100%'}} onPress={() => onChangeScreen('equipments')}>
          {Strings.ST57}
        </Button>
        </Col>
        </Grid> */}

            <FlatGrid
              itemDimension={130}
              data={data}
              renderItem={({ item }) => {
                // console.log('iiiiiiiiiiitem :::::',item._id)
                return (
                  <TouchableScale
                    activeOpacity={1}
                    onPress={() => onClickItem(item?._id, item?.title)}
                    activeScale={0.98}
                    tension={100}
                    friction={10}
                  >
                    <ImageBackground
                      source={{ uri: `${IMAGE_URL}/${item?.image}` }}
                      style={Styles.card5_background}
                      imageStyle={{ borderRadius: 8 }}
                    >
                      <LinearGradient
                        colors={["rgba(0,0,0,0.1)", "rgba(0,0,0,0.7)"]}
                        style={Styles.card5_gradient}
                      >
                        <Text numberOfLines={1} style={Styles.card5_title}>
                          {item?.title}{" "}
                          {/* {console.log("give me ttile :: ", item?.title)} */}
                        </Text>
                        <View style={Styles.card5_border}></View>
                      </LinearGradient>
                    </ImageBackground>
                  </TouchableScale>
                );
              }}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
