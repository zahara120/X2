import {
  Text,
  View,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import { useState } from "react";
import UserList from "../components/UserList";
import Ionicons from "@expo/vector-icons/Ionicons";
import { gql, useQuery } from "@apollo/client";

export default function SearchScreen() {
  const [keyword, setKeyword] = useState("");
  const GET_ALL_USER = gql`
    query Query($keyword: String) {
      users(keyword: $keyword) {
        name
        username
        email
        _id
        following {
          name
          username
        }
        followers {
          name
          username
        }
      }
    }
  `;

  const { loading, error, data, refetch } = useQuery(GET_ALL_USER, {
    variables: { keyword: keyword },
  });
  return (
    <SafeAreaView style={globalStyles.container}>
      <>
        <View
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 30,
            padding: 20,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <View
            style={{
              width: "100%",
              gap: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 30 }}>
              Search
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#1E1E1E",
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            >
              <Ionicons name="search" size={20} color="#717171" />
              <TextInput
                style={{
                  flex: 1,
                  height: 40,
                  color: "white",
                  paddingLeft: 10,
                }}
                placeholder="Search"
                placeholderTextColor="#717171"
                keyboardAppearance="dark"
                value={keyword}
                onChangeText={setKeyword}
              />
            </View>
          </View>
          {loading ? (
            <ActivityIndicator size="small" color="#ffff" />
          ) : (
            <>
              {data.users.length === 0 && (
                <Text style={{ color: "white" }}>No user found</Text>
              )}
              <ScrollView style={{ width: "100%", marginBottom: 80 }}>
                {data.users.map((e) => (
                  <UserList key={e._id} user={e} refetch={refetch} />
                ))}
              </ScrollView>
            </>
          )}
        </View>
      </>
    </SafeAreaView>
  );
}
