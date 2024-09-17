import { View, Text, Image } from "react-native";
export default function Comment({ data }) {
  return (
    <View
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
          {data.username}
        </Text>
        <Text
          style={{
            color: "white",
            flexShrink: 1,
          }}
        >
          {data.content}
        </Text>
      </View>
    </View>
  );
}
