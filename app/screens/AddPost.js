import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "../context/User";
import { usePost } from "../context/Post";
import { gql, useMutation } from "@apollo/client";

const AddPost = ({ navigation }) => {
  const { user, loading: userLoading, error: userError } = useUser();
  const { refetchAllPost, refetchPostByAuthorId } = usePost();
  const [formData, setFormData] = useState({
    content: "",
    tags: "",
    imgUrl: "",
  });

  const onChangeText = (value, field) => {
    setFormData({ ...formData, [field]: value });
  };

  const CREATE_POST = gql`
    mutation Mutation($content: String!, $tags: [String], $imgUrl: String) {
      createPost(content: $content, tags: $tags, imgUrl: $imgUrl)
    }
  `;

  const [handleCreatePost, { loading }] = useMutation(CREATE_POST);

  const handleSubmit = async () => {
    console.log(formData);
    try {
      await handleCreatePost({
        variables: { ...formData },
      });
      formData.content = "";
      formData.tags = "";
      formData.imgUrl = "";
      refetchAllPost();
      refetchPostByAuthorId();
      navigation.goBack();
    } catch (error) {
      Alert.alert("Opps...", error.message, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };
  return (
    <SafeAreaView style={globalStyles.container}>
      <View
        style={{
          gap: 20,
        }}
      >
        {/* header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} title="Dismiss">
            <Text style={{ color: "white" }}>Cancel</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            New Post
          </Text>
          <TouchableOpacity>
            <Ionicons
              name="ellipsis-horizontal-circle-outline"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {/* content */}
        <View
          style={{
            color: "white",
            borderTopWidth: 0.5,
            borderColor: "#323232",
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "start",
              gap: 10,
            }}
          >
            <Image
              style={{ width: 40, height: 40 }}
              source={{
                uri: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
              }}
            />
            <View
              style={{
                flexDirection: "column",
                alignItems: "start",
                gap: 10,
                flex: 1,
              }}
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {user.name}
              </Text>
              <TextInput
                style={[globalStyles.inputView, globalStyles.inputViewContent]}
                placeholder="What's on your mind?"
                placeholderTextColor={globalStyles.placeholderTextColor}
                value={formData.content}
                keyboardAppearance="dark"
                onChangeText={(value) => onChangeText(value, "content")}
                multiline
                textAlignVertical="top"
              />

              <TextInput
                style={globalStyles.inputView}
                placeholder="Tags"
                placeholderTextColor={globalStyles.placeholderTextColor}
                value={formData.tags}
                keyboardAppearance="dark"
                onChangeText={(value) => onChangeText(value, "tags")}
              ></TextInput>
              <TextInput
                inputMode="url"
                style={globalStyles.inputView}
                placeholder="Image URL"
                placeholderTextColor={globalStyles.placeholderTextColor}
                value={formData.imgUrl}
                keyboardAppearance="dark"
                onChangeText={(value) => onChangeText(value, "imgUrl")}
                multiline
                textAlignVertical="top"
              ></TextInput>
              <TouchableOpacity
                style={{
                  width: "100%",
                  backgroundColor: "white",
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={handleSubmit}
              >
                <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                  {loading ? "Posting..." : "Post"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddPost;
