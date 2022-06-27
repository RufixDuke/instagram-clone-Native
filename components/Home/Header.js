import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { firebase } from "../../firebase";

const Header = ({ navigation }) => {
    const handleSignOut = async () => {
        try {
            await firebase
                .auth()
                .signOut()
                .then(() => console.log("Signed Out Successfully!!"));
        } catch (error) {}
    };
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <Image
                    style={styles.logo}
                    source={require("../../assets/instagram.png")}
                />
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.push("NewPost")}>
                    <Image
                        style={styles.icon}
                        source={require("../../assets/plus.png")}
                        // source={{
                        //     uri: "https://icons8.com/icon/83326/home",
                        // }}
                        // source={require("../../assets/search.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.onReadBadge}>
                        <Text style={styles.onReadBadgeText}>11</Text>
                    </View>
                    <Image
                        style={styles.icon}
                        source={require("../../assets/messenger.png")}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSignOut}>
                    <Image
                        style={styles.icon}
                        source={require("../../assets/signout.png")}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginHorizontal: 20,
    },
    iconsContainer: {
        flexDirection: "row",
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: "contain",
    },
    yo: {
        backgroundColor: "white",
    },
    icon: {
        width: 25,
        height: 25,
        marginLeft: 10,
        resizeMode: "contain",
    },
    onReadBadge: {
        backgroundColor: "#FF3250",
        position: "absolute",
        left: 20,
        bottom: 14,
        width: 20,
        height: 18,
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
    },
    onReadBadgeText: {
        color: "white",
        fontWeight: "600",
    },
});

export default Header;
