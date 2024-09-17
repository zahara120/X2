import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import PostList from "../components/PostList";
import { AuthContext } from "../context/Auth";
import * as SecureStore from "expo-secure-store";
import { useUser } from "../context/User";
import { usePost } from "../context/Post";
import { useNavigation } from "@react-navigation/native";

const UserProfile = () => {
  const { user: data, loadingUser, errorUser } = useUser();
  const navigation = useNavigation();
  const {
    postByAuthorId,
    loadingPostByAuthorId,
    errorPostByAuthorId,
    refetchPostByAuthorId,
  } = usePost();

  const { setIsLogin } = useContext(AuthContext);
  return (
    <SafeAreaView style={globalStyles.container}>
      {loadingUser ? (
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
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 30,
            padding: 20,
            paddingLeft: 10,
            paddingRight: 10,
            width: "100%",
          }}
        >
          <View
            style={{
              width: "100%",
              gap: 10,
              flexDirection: "column",
              alignItems: "center",
              borderBottomWidth: 0.5,
              borderColor: "#323232",
              paddingBottom: 20,
            }}
          >
            <Image
              style={{ width: 80, height: 80 }}
              source={{
                uri: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
              }}
            />
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
              {data.name}
            </Text>
            <Text style={{ color: "white" }}>@{data.username}</Text>
            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Followers");
                }}
                style={{
                  borderWidth: 0.5,
                  borderColor: "white",
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>
                  {data.followers?.length} followers
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Following");
                }}
                style={{
                  borderWidth: 0.5,
                  borderColor: "white",
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white" }}>
                  {data.following?.length} following
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={async () => {
                await SecureStore.deleteItemAsync("token");
                setIsLogin(false);
              }}
            >
              <Text style={{ color: "red" }}>Logout</Text>
            </TouchableOpacity>
          </View>
          {loadingPostByAuthorId ? (
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
            <FlatList
              data={postByAuthorId}
              renderItem={({ item }) => (
                <PostList data={item} refetch={refetchPostByAuthorId} />
              )}
              keyExtractor={(item) => item._id}
              style={{ width: "100%", marginBottom: 200 }}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default UserProfile;
