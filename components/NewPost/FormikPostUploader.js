import { View, Text, Image, TextInput, Button } from "react-native";
import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { db, firebase } from "../../firebase";
// import validUrl from "valid-url";

// const placeholderImg = require("../../assets/place.jpg");
const placeholderImg =
    "https://th.bing.com/th/id/OIP.Jxd5N7z41mb1U68ZAh6TuAD6D6?pid=ImgDet&w=177&h=177&c=7";

const uploadPostSchema = Yup.object().shape({
    imgURL: Yup.string().url().required("A URL is required"),
    caption: Yup.string().max(2200, "Caption has reached the character limit."),
});

const FormikPostUploader = ({ navigation }) => {
    const [thumbnailURL, setThumbnailURL] = useState(placeholderImg);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

    const getUserName = () => {
        const user = firebase.auth().currentUser;
        const unsubscribe = db
            .collection("users")
            .where("owner_uid", "==", user.uid)
            .limit(1)
            .onSnapshot((snapshot) =>
                snapshot.docs.map((doc) => {
                    setCurrentLoggedInUser({
                        username: doc.data().username,
                        profilePicture: doc.data().profile_picture,
                    });
                })
            );
        return unsubscribe;
    };

    useEffect(() => {
        getUserName();
    }, []);

    const uploadPostToFirebase = (imgURL, caption) => {
        const unsubscribe = db
            .collection("users")
            .doc(firebase.auth().currentUser.email)
            .collection("posts")
            .add({
                imageUrl: imgURL,
                user: currentLoggedInUser.username,
                profile_picture: currentLoggedInUser.profilePicture,
                owner_uid: firebase.auth().currentUser.uid,
                owner_email: firebase.auth().currentUser.email,
                caption: caption,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                // likes: 0,
                likes_by_users: [],
                comments: [],
            })
            .then(() => navigation.goBack());

        return unsubscribe;
    };
    return (
        <Formik
            initialValues={{ caption: "", imgURL: "" }}
            onSubmit={(values) => {
                uploadPostToFirebase(values.imgURL, values.caption);
                // navigation.push("Homescreen");
            }}
            validationSchema={uploadPostSchema}
            // validateOnMount={true}
        >
            {({
                handleBlur,
                handleChange,
                handleSubmit,
                values,
                errors,
                isValid,
            }) => (
                <>
                    <View
                        style={{
                            margin: 20,
                            justifyContent: "flex-start",
                            flexDirection: "row",
                            alignItems: "flex-start",
                        }}
                    >
                        <Image
                            source={{
                                uri: thumbnailURL
                                    ? thumbnailURL
                                    : placeholderImg,
                            }}
                            style={{ width: 100, height: 100, marginRight: 10 }}
                        />

                        <TextInput
                            style={{ color: "white", fontSize: 20 }}
                            placeholder="Enter caption"
                            placeholderTextColor="gray"
                            multiline={true}
                            onChangeText={handleChange("caption")}
                            onBlur={handleBlur("caption")}
                            value={values.caption}
                        />
                    </View>

                    <TextInput
                        onChange={(e) => setThumbnailURL(e.nativeEvent.text)}
                        style={{ color: "white", fontSize: 18 }}
                        placeholder="Enter Image Url"
                        placeholderTextColor="gray"
                        onChangeText={handleChange("imgURL")}
                        onBlur={handleBlur("imgURL")}
                        value={values.imgURL}
                    />

                    {errors.imgURL && (
                        <Text style={{ color: "red", fontSize: 18 }}>
                            {errors.imgURL}
                        </Text>
                    )}

                    <Button
                        onPress={handleSubmit}
                        title="Share"
                        disabled={!isValid}
                    />
                </>
            )}
        </Formik>
    );
};

export default FormikPostUploader;
