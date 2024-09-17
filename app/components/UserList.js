import { gql, useMutation } from "@apollo/client";
import { View, Text, Image, TouchableOpacity, Alert } from "react-native";

export default function UserList({ user, refetch, status }) {
  const FOLLOW = gql`
    mutation Following($followingId: String!) {
      following(followingId: $followingId)
    }
  `;
  const UNFOLLOW = gql`
    mutation Mutation($followingId: String!) {
      unfollowing(followingId: $followingId)
    }
  `;
  const [handleFollow] = useMutation(FOLLOW);
  const [handleUnfollow] = useMutation(UNFOLLOW);

  const follow = async (id) => {
    try {
      await handleFollow({ variables: { followingId: id } });
      refetch();
    } catch (error) {
      Alert.alert("Opps...", error.message, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
        {
          text: "Unfollow",
          style: "destructive",
          onPress: async () => {
            await handleUnfollow({
              variables: { followingId: id },
            });
            refetch();
          },
        },
      ]);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        padding: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth: 0.5,
        borderColor: "#323232",
      }}
    >
      <Image
        style={{ width: 40, height: 40, borderRadius: 20 }}
        source={{
          uri: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
        }}
      />

      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {user.name}
          </Text>
          <Text style={{ color: "#727272" }}>@{user.username}</Text>
          {status !== "off" && (
            <>
              <View style={{ flexDirection: "row", gap: 10 }}>
                <Text style={{ fontSize: 12, color: "white" }}>
                  {user.followers ? user.followers.length : 0} followers
                </Text>
                <Text style={{ fontSize: 12, color: "white" }}>
                  {user.following ? user.following.length : 0} following
                </Text>
              </View>
            </>
          )}
        </View>
        {status !== "off" && (
          <TouchableOpacity
            style={{
              borderColor: "#727272",
              borderWidth: 0.5,
              paddingHorizontal: 20,
              paddingVertical: 8,
              borderRadius: 5,
            }}
            onPress={() => follow(user._id)}
          >
            <Text style={{ color: "white" }}>Follow</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
