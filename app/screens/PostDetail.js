import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Keyboard,
  Alert,
} from "react-native";
import { globalStyles } from "../styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import Comment from "../components/Comment";
import { useState } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";

export default function PostDetail({ route }) {
  const { id } = route.params;
  const [comment, setComment] = useState("");

  const GET_POST_BY_ID = gql`
    query Query($getPostByIdId: String!) {
      getPostById(id: $getPostByIdId) {
        _id
        content
        tags
        imgUrl
        authorId
        comments {
          content
          username
          createdAt
          updatedAt
        }
        likes {
          username
          createdAt
          updatedAt
        }
        author {
          _id
          name
          username
          email
        }
        createdAt
        updatedAt
      }
    }
  `;

  const ADD_COMMENT = gql`
    mutation Mutation($content: String, $postId: String) {
      addComment(content: $content, postId: $postId)
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_POST_BY_ID, {
    variables: { getPostByIdId: id },
  });

  const [handleComment, { loading: loadingComment }] = useMutation(ADD_COMMENT);

  const handleSubmit = async () => {
    try {
      await handleComment({
        variables: { content: comment, postId: id },
      });
      refetch();
      Keyboard.dismiss();
      setComment("");
    } catch (error) {
      Alert.alert("Opps...", error.message, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <>
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="small" color="#ffff" />
        </View>
      ) : (
        <View style={globalStyles.container}>
          <View
            style={{
              gap: 15,
              padding: 20,
              borderBottomWidth: 0.5,
              borderColor: "#323232",
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            {/* header */}
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Image
                style={{ width: 40, height: 40 }}
                source={{
                  uri: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
                }}
              />
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                {data.getPostById.author.name}
                <Text style={{ color: "#717171" }}>
                  {" "}
                  @{data.getPostById.author.username}
                </Text>
              </Text>
            </View>
            {/* content */}
            <View style={{ flexDirection: "column", gap: 10 }}>
              <Text
                style={{
                  color: "white",
                  flexShrink: 1,
                }}
              >
                {data.getPostById.content}
              </Text>
              {data.getPostById.imgUrl && (
                <Image
                  source={{ uri: data.getPostById.imgUrl }}
                  style={{ height: 200, width: "100%", borderRadius: 10 }}
                />
              )}
              {data.getPostById.tags.length > 0 && (
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {data.getPostById.tags.map((tag) => `#${tag} `)}
                </Text>
              )}
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
                >
                  <TouchableOpacity onPress={() => console.log("like")}>
                    <Ionicons name="heart-outline" size={20} color="white" />
                  </TouchableOpacity>
                  <Text style={{ color: "white" }}>
                    {data.getPostById.likes.length}
                  </Text>
                </View>
                <View
                  style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
                >
                  <TouchableOpacity onPress={() => console.log("comment")}>
                    <Ionicons
                      name="chatbubble-outline"
                      size={20}
                      color="white"
                    />
                  </TouchableOpacity>
                  <Text style={{ color: "white" }}>
                    {data.getPostById.comments.length}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {/* comment */}
          <View
            style={{
              paddingVertical: 20,
              paddingHorizontal: 10,
              borderBottomWidth: 0.5,
              borderColor: "#323232",
            }}
          >
            <Text style={{ color: "white" }}>Comments</Text>
          </View>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={90}
          >
            <FlatList
              data={data.getPostById.comments}
              renderItem={({ item }) => <Comment data={item} />}
              keyExtractor={(item, idx) => idx}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                paddingHorizontal: 5,
                borderRadius: 10,
                borderColor: "white",
                borderTopWidth: 1,
                height: 80,
              }}
            >
              <TextInput
                style={{
                  paddingHorizontal: 20,
                  color: "white",
                  flex: 1,
                  marginRight: 10,
                  borderRadius: 5,
                  width: "100%",
                  height: 40,
                }}
                placeholder="Comment"
                placeholderTextColor="#717171"
                value={comment}
                keyboardAppearance="dark"
                onChangeText={setComment}
              />
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}
                onPress={handleSubmit}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  {loadingComment ? "Sending..." : "Send"}
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      )}
    </>
  );
}
