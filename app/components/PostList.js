import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { gql, useMutation } from "@apollo/client";

export default function PostList({ data, refetch }) {
  const navigation = useNavigation();
  const LIKE = gql`
    mutation Mutation($postId: String!) {
      likePost(postId: $postId)
    }
  `;
  const [handleLike] = useMutation(LIKE);
  return (
    <>
      <Pressable
        onPress={() => navigation.navigate("PostDetail", { id: data._id })}
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
          gap: 10,
          padding: 20,
          borderBottomWidth: 0.5,
          borderColor: "#323232",
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Image
          style={{ width: 40, height: 40 }}
          source={{
            uri: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
          }}
        />
        <View
          style={{
            flexDirection: "column",
            alignItems: "start",
            gap: 5,
            flex: 1,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {data.author.name}
            <Text style={{ color: "#717171" }}> @{data.author.username}</Text>
          </Text>
          <Text
            style={{
              color: "white",
              flexShrink: 1,
            }}
          >
            {data.content}
          </Text>
          {data.imgUrl && (
            <Image
              source={{ uri: data.imgUrl }}
              style={{ height: 200, width: "100%", borderRadius: 10 }}
            />
          )}
          {data.tags.length > 0 && (
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {data.tags.map((tag) => `#${tag} `)}
            </Text>
          )}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
            >
              <TouchableOpacity
                onPress={async () => {
                  await handleLike({ variables: { postId: data._id } });
                  refetch();
                }}
              >
                <Ionicons name="heart-outline" size={20} color="white" />
              </TouchableOpacity>
              <Text style={{ color: "white" }}>{data.likes.length}</Text>
            </View>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("PostDetail", { id: data._id })
                }
              >
                <Ionicons name="chatbubble-outline" size={20} color="white" />
              </TouchableOpacity>
              <Text style={{ color: "white" }}>{data.comments.length}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
}
