import {
    View,
    Image,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import React from "react";
import SignUp from "../components/SignUp/SignUp";

const SignUpForm = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.imgContainer}>
                    <Image
                        source={require("../assets/instagram_color_logo.png")}
                        style={{ width: 100, height: 100 }}
                    />
                </View>
                <SignUp navigation={navigation} />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: 50,
        paddingHorizontal: 12,
    },
    imgContainer: {
        alignItems: "center",
        marginTop: 90,
    },
});

export default SignUpForm;
