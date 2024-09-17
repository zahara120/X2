import { ActivityIndicator, Image, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/User";

export default function AddPostBtn() {
  const navigation = useNavigation();
  const { user, loadingUser, errorUser } = useUser();

  return (
    <>
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
        <Pressable
          onPress={() => {
            navigation.navigate("AddPost");
          }}
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
            style={{ width: 40, height: 40 }}
            source={{
              uri: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
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
              {user?.name}
            </Text>
            <Text
              style={{
                color: "#717171",
                flexShrink: 1,
              }}
            >
              What's new?
            </Text>
          </View>
        </Pressable>
      )}
    </>
  );
}
