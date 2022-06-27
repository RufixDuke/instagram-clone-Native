import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { db, firebase } from "../../firebase";
// import { Divider } from "@rneui/themed";

const PostFooters = [
    {
        name: "Like",
        imageUrl: require("../../assets/heart.png"),
        // "https://img.icons8.com/material-outlined/24/undefined/like--v1.png",
        likedImageUrl: "https://img.icons8.com/emoji/344/heart-suit.png",
    },
    {
        name: "Comment",
        imageUrl: require("../../assets/icons8-speech-24.png"),
    },
    {
        name: "Share",
        imageUrl: require("../../assets/icons8-email-send-24.png"),
    },
    {
        name: "Save",
        imageUrl: require("../../assets/icons8-bookmark-24.png"),
        // "https://img.icons8.com/material-outlined/24/undefined/bookmark-ribbon--v1.png",
    },
];
const Post = ({ post }) => {
    const handleLike = (post) => {
        const currentLikeStatus = !post.likes_by_users.includes(
            firebase.auth().currentUser.email
        );

        db.collection("users")
            .doc(post.owner_email)
            .collection("posts")
            .doc(post.id)
            .update({
                likes_by_users: currentLikeStatus
                    ? firebase.firestore.FieldValue.arrayUnion(
                          firebase.auth().currentUser.email
                      )
                    : firebase.firestore.FieldValue.arrayRemove(
                          firebase.auth().currentUser.email
                      ),
            })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    };
    return (
        <View
            style={{
                marginBottom: 30,
                marginBottom: 15,
            }}
        >
            {/* <Divider width={1} orientation="vertical" /> */}
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{ marginHorizontal: 15, marginTop: 10 }}>
                <PostFooter post={post} handleLike={handleLike} />
            </View>
        </View>
    );
};

const PostHeader = ({ post }) => {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                margin: 5,
                alignItems: "center",
                // marginBottom: 10,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Image
                    source={{ uri: post.profile_picture }}
                    style={styles.story}
                />
                <Text
                    style={{ color: "white", marginLeft: 5, fontWeight: "700" }}
                >
                    {post.user}
                </Text>
            </View>

            <View>
                <Image source={require("../../assets/link.png")} />
            </View>
        </View>
    );
};

const PostImage = ({ post }) => (
    <View
        style={{
            width: "100%",
            height: 350,
        }}
    >
        <Image
            source={{ uri: post.imageURL }}
            style={{ height: 350, resizeMode: "cover" }}
        />
    </View>
);

const PostFooter = ({ handleLike, post }) => {
    return (
        <View>
            <View
                style={{
                    // flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ flexDirection: "row", width: "32%" }}>
                    <LikeIcon
                        imgStyle={[styles.footerIcon, styles.like]}
                        imgUrl={PostFooters[0].imageUrl}
                        handleLike={handleLike}
                        post={post}
                    />
                    <ShareIcon
                        imgStyle={[styles.footerIcon, styles.like]}
                        imgUrl={PostFooters[1].imageUrl}
                    />
                    <ShareIcon
                        imgStyle={[styles.footerIcon, styles.like]}
                        imgUrl={PostFooters[2].imageUrl}
                    />
                </View>

                <View>
                    <ShareIcon
                        imgStyle={[styles.footerIcon, styles.like]}
                        imgUrl={PostFooters[3].imageUrl}
                    />
                </View>
            </View>

            <View>
                <Text
                    style={{ color: "white", marginTop: 5, fontWeight: "600" }}
                >
                    {post.likes_by_users.length.toLocaleString("en")} likes
                    {/* {likes} likes */}
                </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
                <Text>
                    <Text style={{ color: "white", fontWeight: "600" }}>
                        {post.user}{" "}
                    </Text>{" "}
                    <Text style={{ color: "white" }}>{post.caption}</Text>
                </Text>
            </View>

            <View>
                <TouchableOpacity>
                    <View style={{ marginTop: 5 }}>
                        {!!post.comments.length && (
                            <Text
                                style={{ color: "#8F8F8F", fontWeight: "900" }}
                            >
                                View {post.comments.length > 1 ? "all" : ""}{" "}
                                {post.comments.length}{" "}
                                {post.comments.length > 1
                                    ? "comments"
                                    : "comment"}
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
            <PostComments post={post} />
        </View>
    );
};

const PostComments = ({ post }) => {
    return (
        <View>
            {post.comments.map((comment, index) => {
                return (
                    <View key={index} style={{ width: "100%" }}>
                        <Text>
                            <Text style={{ color: "white", fontWeight: "700" }}>
                                {comment.user}{" "}
                            </Text>{" "}
                            <Text
                                style={{
                                    color: "white",
                                    fontWeight: "100",
                                    marginLeft: 15,
                                }}
                            >
                                {comment.comment}
                            </Text>
                        </Text>
                    </View>
                );
            })}
        </View>
    );
};

const LikeIcon = ({ imgStyle, imgUrl, handleLike, post }) => (
    <TouchableOpacity onPress={() => handleLike(post)}>
        <Image style={imgStyle} source={imgUrl} />
    </TouchableOpacity>
);

const ShareIcon = ({ imgStyle, imgUrl }) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={imgUrl} />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    story: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginLeft: 7,
        borderWidth: 1.6,
        borderColor: "#ff8501",
    },
    footerIcon: {
        width: 30,
        height: 30,
        marginRight: 5,
        // color: "white",
        backgroundColor: "white",
    },
    like: {
        backgroundColor: "black",
    },
});

export default Post;
