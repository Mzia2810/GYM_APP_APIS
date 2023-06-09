import React, { useEffect } from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import Heading from '../components/Heading';
import LatestWorkouts from '../components/LatestWorkouts';
import ExercisesLibrary from '../components/ExercisesLibrary';
import Goals from '../components/Goals';
import Styles from '../config/Styles';
import Languages from '../languages';
import LanguageContext from '../languages/LanguageContext';
import Levels from '../components/Levels';
import LatestDiets from '../components/LatestDiets';
import { GetAllExerciseCategory } from '../apis/ApiHandlers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home(props) {

  const contextState = React.useContext(LanguageContext);
  const language = contextState.language;
  const Strings = Languages[language].texts;
  const [user, setUser] = React.useState({})
  console.log("🚀 ~ file: Home.js:21 ~ Home ~ user:", user)

  const onChangeScreen = (screen) => {
    GetAllExerciseCategory()
    props.navigation.navigate(screen);
  };

  // async function getData() {
  //   try {
  //     const response = await fetch('https://wb-best-fit.herokuapp.com/api/bodyPart/getAllBodyParts');
  //     const data = await response.json();
  //     console.log('This is api data =====>  :: ',data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  useEffect(() => {
    // getData()
    AsyncStorage.getItem("@user").then((value) => {
      if (value !== null) {

        setUser(JSON.parse(value));
      }
    });
    const Strings = Languages[language].texts;
  }, [])

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
    >

      <SafeAreaView>

        <View style={Styles.HomeScreen}>

          <Heading title={Strings.ST23} button={() => onChangeScreen('workouts')} />
          <LatestWorkouts />

          <Heading title={Strings.ST22} button={() => onChangeScreen('goals')} />
          <Goals />

          {/* <Heading title={Strings.ST24} button={() => onChangeScreen('levels')} />
          <Levels />

          <ExercisesLibrary /> */}

          <Heading title={Strings.ST47} button={() => onChangeScreen('diets')} />
          <LatestDiets />

        </View>
      </SafeAreaView>
    </ScrollView>

  );

}

