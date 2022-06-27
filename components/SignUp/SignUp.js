import {
    View,
    Text,
    TextInput,
    Pressable,
    TouchableOpacity,
    Alert,
} from "react-native";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";
import { firebase, db } from "../../firebase";

const signUpSchema = Yup.object().shape({
    email: Yup.string().email().required("Must be present"),
    username: Yup.string()
        .required()
        .min(2, "must not be less than 2 characters"),
    password: Yup.string()
        .min(5, "characters must not be less than 5")
        .required(),
});

const getRandomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
};

const SignUp = ({ navigation }) => {
    const onSignUp = async (email, username, password) => {
        try {
            const authUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, password);
            console.log("Firebase SignUp Successful", email, password);

            db.collection("users")
                .doc(authUser.user.email)
                .set({
                    owner_uid: authUser.user.uid,
                    username: username,
                    email: authUser.user.email,
                    profile_picture: await getRandomProfilePicture(),
                });
        } catch (error) {
            Alert.alert(`Hello ${email}`, error.message);
        }
    };

    return (
        <Formik
            initialValues={{ email: "", username: "", password: "" }}
            onSubmit={(values) => {
                onSignUp(values.email, values.username, values.password);
                // navigation.push("Homescreen");
            }}
            validationSchema={signUpSchema}
            validateOnMount={true}
        >
            {({ handleBlur, handleChange, handleSubmit, values, isValid }) => (
                <>
                    <View style={styles.wrapper}>
                        <View
                            style={[
                                styles.inputField,
                                {
                                    borderColor:
                                        values.email.length < 1 ||
                                        Validator.validate(values.email)
                                            ? "#ccc"
                                            : "red",
                                },
                            ]}
                        >
                            <TextInput
                                placeholder="Email, phone number"
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                textContentType="emailAddress"
                                // autoFocus={true}
                                onChangeText={handleChange("email")}
                                onBlur={handleBlur("email")}
                                value={values.email}
                            />
                        </View>

                        <View
                            style={[
                                styles.inputField,
                                {
                                    borderColor:
                                        values.username.length > 2
                                            ? "#ccc"
                                            : "red",
                                },
                            ]}
                        >
                            <TextInput
                                placeholder="Username"
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                                keyboardType="default"
                                textContentType="username"
                                onChangeText={handleChange("username")}
                                onBlur={handleBlur("username")}
                                value={values.username}
                            />
                        </View>

                        <View
                            style={[
                                styles.inputField,
                                {
                                    borderColor:
                                        1 > values.password.length ||
                                        values.password.length >= 6
                                            ? "#ccc"
                                            : "red",
                                },
                            ]}
                        >
                            <TextInput
                                placeholder="Password"
                                placeholderTextColor="gray"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry={true}
                                textContentType="password"
                                onChangeText={handleChange("password")}
                                onBlur={handleBlur("password")}
                                value={values.password}
                            />
                        </View>
                        {/* <View
                            style={{ alignItems: "flex-end", marginBottom: 30 }}
                        >
                            <Text style={{ color: "#6BB0F5" }}>
                                Forgot Password?
                            </Text>
                        </View> */}

                        <Pressable
                            titleSize={20}
                            style={styles.button(isValid)}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </Pressable>

                        <View style={styles.signUpContainer}>
                            <Text>Already have an account?</Text>
                            <TouchableOpacity
                                onPress={() => navigation.push("LoginForm")}
                            >
                                <Text style={{ color: "#6BB0F5" }}>
                                    {" "}
                                    Log In
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </>
            )}
        </Formik>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 50,
        padding: 10,
    },
    inputField: {
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: "#FAFAFA",
        padding: 12,
        marginBottom: 10,
    },
    button: (isValid) => ({
        backgroundColor: isValid ? "#0096F6" : "#9ACAF7",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 42,
        borderRadius: 4,
        marginTop: 20,
    }),
    buttonText: {
        fontWeight: "600",
        color: "#fff",
        fontSize: 20,
    },
    signUpContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "center",
        marginTop: 50,
    },
});

export default SignUp;
