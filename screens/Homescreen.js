import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React from "react";
import Header from "../components/Home/Header";
import Stories from "../components/Home/Stories";
import Post from "../components/Home/Post";
import { POSTS } from "../data/Posts";
import BottomTabs from "../components/Home/BottomTabs";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const Homescreen = ({ navigation }) => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        db.collectionGroup("posts").onSnapshot((snapshop) => {
            setPosts(snapshop.docs.map((doc) => doc.data()));
        });
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories />
            <ScrollView>
                {posts.map((post, index) => (
                    <Post post={post} key={index} />
                ))}
            </ScrollView>
            <BottomTabs />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
        paddingTop: 35,
    },
});

export default Homescreen;
