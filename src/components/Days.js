import React, { useEffect, useState } from "react";
import { View, TextInput, I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { map } from "lodash";
import Styles from "../config/Styles";
import TouchableScale from "react-native-touchable-scale";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import { useNavigation } from "@react-navigation/native";

export default function Days(props) {
    const [dayNames, setDayNames] = useState(null);

    const contextState = React.useContext(LanguageContext);
    const language = contextState.language;
    const Strings = Languages[language].texts;

    const { Number, WorkoutId } = props;

    const rightIcon = I18nManager.isRTL ? "chevron-left" : "chevron-right";

    const totalDays = Array.from(Array(Number).keys());

    const navigation = useNavigation();
    const onChangeScreen = (id, day, title) => {
        navigation.navigate("singleday", { id, day, title });
        console.log(title, day, id);
    };

    function getDayNamesFromArray(array = []) {
        console.log(array);
        const result = [];
        for (let i = 0; i < totalDays.length; i++) {
            if (array && array.length > 0 && array[i]) {
                result[i] = array[i];
            } else {
                result[i] = Strings.ST90 + " " + (i + 1);
            }
        }
        setDayNames(result);
    }

    useEffect(() => {
        if (WorkoutId) {
            try {
                AsyncStorage.getItem("dayNames" + WorkoutId)
                    .then((value) => {
                        console.log(value);
                        const daysNameForWorkout = JSON.parse(value);
                        if (daysNameForWorkout && daysNameForWorkout.length > 0) {
                            getDayNamesFromArray(daysNameForWorkout);
                        } else {
                            getDayNamesFromArray([]);
                        }
                    })
                    .catch((err) => {
                        getDayNamesFromArray([]);
                    });
            } catch (err) {
                getDayNamesFromArray([]);
            }
        }
    }, []);

    const handleDayNameChange = (text, i) => {
        const newDayNames = [...dayNames];
        newDayNames[i] = text;
        setDayNames(newDayNames);
        AsyncStorage.setItem("dayNames" + WorkoutId, JSON.stringify(newDayNames));
    };

    return (
        <View style={{ marginVertical: 10, marginBottom: 40 }}>
            {map(dayNames, (dayName, i) => {
                return (
                    <View style={Styles.DayList}>
                        <TextInput value={dayName} onChangeText={(text) => handleDayNameChange(text, i)} style={Styles.DayListText}></TextInput>
                        <TouchableScale key={i} activeOpacity={1} onPress={() => {
                            onChangeScreen(WorkoutId, i + 1, dayName)
                            console.log('Where I clicked Let see ==== > : ', i)
                        }} activeScale={0.98} tension={100} friction={10}>
                            <Icon name={rightIcon} style={Styles.DayListIcon} />
                        </TouchableScale>
                    </View>
                );
            })}
        </View>
    );
}
