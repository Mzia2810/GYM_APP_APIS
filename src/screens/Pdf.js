import * as React from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { View, StyleSheet, Dimensions } from "react-native";
import Styles from "../config/Styles";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import { IconButton } from "react-native-paper";
import * as PDF from "react-native-pdf";

export default function Pdf(props) {
    const url = props.route.params.url;

    console.log('url  ======> : ',url);

    const source = { uri: url, cache: true };

    return (
        <View style={Styles.PdfViewContainer}>
            {url && url.includes("http") && url.includes(".pdf") ? (
                <PDF.default
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
                    style={Styles.PdfViewFull}
                />
            ) : (
                <View>No Document Found</View>
            )}
        </View>
    );
}
