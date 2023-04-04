import React, { useState, useEffect } from "react";
import { ScrollView, View, SafeAreaView, ImageBackground } from "react-native";
import Styles from "../config/Styles";
import Languages from "../languages";
import LanguageContext from "../languages/LanguageContext";
import usePreferences from "../hooks/usePreferences";
import { getExercisesById } from "../config/DataApp";
import AppLoading from "../components/InnerLoading";
import { Text, IconButton, List, Caption, Paragraph, Subheading, Button, MD3Colors } from "react-native-paper";
import { Col, Grid } from "react-native-easy-grid";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ColorsApp from "../config/ColorsApp";
import { HTMLStyles } from "../config/HTMLStyles";
import { HTMLStylesDark } from "../config/HTMLStylesDark";
import HTMLView from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import useFavourite from "../context/HeaderContext";
import Pdf from "react-native-pdf";
// import useWindowDimensions  from 'react-hooks-window-size'
export default function SingleExercise(props) {
    const { headerTitle } = useFavourite();
    console.log("Header Title :: ", headerTitle);

    const { width } = useWindowDimensions();
    const { route } = props;
    const { navigation } = props;
    const { id, title } = route.params;
    // console.log(('Here is my title :::::::::::::::::   ' , title));

    useEffect(() => {
        // console.log('I am Single Day Component :: ');
        navigation.setOptions(title);
        // console.log('single day title set  :::  ',title);
    }, []);
    const { theme } = usePreferences();

    const [showInfo, setShowInfo] = useState(false);
    const [showInst, setShowInst] = useState(false);
    const [showTips, setShowTips] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([]);

    const contextState = React.useContext(LanguageContext);
    const language = contextState.language;
    const Strings = Languages[language].texts;

    const pressShowInfo = () => setShowInfo(!showInfo);
    const pressShowInst = () => setShowInst(!showInst);
    const pressShowTips = () => setShowTips(!showTips);

    // console.log('Exercise Dtails   :::');
    const onPlay = (url, title) => {
        navigation.navigate("player", { url: url, title: title });
    };

    useEffect(() => {
        getExercisesById(id).then((response) => {
            setItem(response[0]);
            setIsLoaded(true);
        });
    }, []);

    const source = { uri: item?.pdf, cache: true };
    console.log("Item: ", item);
    console.log("Source: ", source);

    if (!isLoaded) {
        return <AppLoading />;
    } else {
        return (
            <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <SafeAreaView>
                    <View style={Styles.ModalScreen}>
                        {item?.pdf && item?.pdf?.includes("http") && item?.pdf?.includes(".pdf") ? (
                            <>
                                <View style={Styles.PdfViewContainer}>
                                    <Pdf
                                        trustAllCerts={false}
                                        fitWidth={true}
                                        fitPolicy={0}
                                        source={source}
                                        onLoadComplete={(numberOfPages, filePath) => {
                                            console.log(`Number of pages: ${numberOfPages}`);
                                        }}
                                        onPageChanged={(page, numberOfPages) => {
                                            console.log(`Current page: ${page}`);
                                        }}
                                        onError={(error) => {
                                            console.log(error);
                                        }}
                                        onPressLink={(uri) => {
                                            console.log(`Link pressed: ${uri}`);
                                        }}
                                        style={Styles.PdfView}
                                    />
                                </View>
                                <View style={{ justifyContent: "flex-end" }}>
                                    <IconButton
                                        style={{ position: "absolute", right: -15, top: -40 }}
                                        icon="arrow-expand-all"
                                        iconColor={MD3Colors.neutral0}
                                        size={25}
                                        onPress={() => {
                                            navigation.navigate("pdf", { url: item?.pdf, title: item?.title });
                                        }}
                                    />
                                </View>
                            </>
                        ) : (
                            <ImageBackground source={{ uri: item?.image }} style={Styles.ExerciseImage} resizeMode={"cover"} imageStyle={{ borderRadius: 8 }}>
                                <View style={Styles.ExerciseImageView}>
                                    <IconButton
                                        icon="play-circle"
                                        color={ColorsApp.PRIMARY}
                                        size={38}
                                        style={{
                                            marginLeft: 15,
                                            backgroundColor: "rgba(0,0,0,0.30)",
                                        }}
                                        onPress={() => onPlay(item?.video, item?.title)}
                                    />
                                </View>
                            </ImageBackground>
                        )}

                        <Text style={Styles.ExerciseSubTitle}></Text>

                        <View style={{ marginBottom: 10 }}>
                            <List.Accordion title={Strings.ST85} titleStyle={Styles.ExerciseAccordionTitle} expanded={showInst} style={Styles.ExerciseAccordion} onPress={pressShowInst}></List.Accordion>

                            {showInst ? (
                                <View style={Styles.ExerciseAccordionView}>
                                    <HTMLView
                                        source={{
                                            html: item?.instructions ? item?.instructions : `<p></p>`,
                                        }}
                                        contentWidth={width}
                                        tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark}
                                    />
                                </View>
                            ) : null}
                        </View>

                        <View style={{ marginBottom: 20 }}>
                            <List.Accordion title={Strings.ST86} titleStyle={Styles.ExerciseAccordionTitle} expanded={showTips} style={Styles.ExerciseAccordion} onPress={pressShowTips}></List.Accordion>

                            {showTips ? (
                                <View style={Styles.ExerciseAccordionView}>
                                    <HTMLView source={{ html: item?.tips ? item?.tips : `<p></p>` }} contentWidth={width} tagsStyles={theme === "light" ? HTMLStyles : HTMLStylesDark} />
                                </View>
                            ) : null}
                        </View>
                    </View>
                </SafeAreaView>
            </ScrollView>
        );
    }
}
