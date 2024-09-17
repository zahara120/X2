import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import PostList from "../components/PostList";
import AddPostBtn from "../components/AddPostBtn";
import { gql, useQuery } from "@apollo/client";
export default function HomeScreen() {
  const GET_POST = gql`
    query Query {
      getAllPosts {
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
          followers {
            name
            username
          }
          following {
            name
            username
          }
        }
        createdAt
        updatedAt
      }
    }
  `;
  const { loading, data, refetch } = useQuery(GET_POST);

  return (
    <>
      <SafeAreaView style={globalStyles.container}>
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
          <>
            <AddPostBtn />
            {data.length === 0 && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text style={{ color: "white" }}>No Post</Text>
              </View>
            )}
            <FlatList
              data={data.getAllPosts}
              renderItem={({ item }) => (
                <PostList data={item} refetch={refetch} />
              )}
              keyExtractor={(item) => item._id}
            />
          </>
        )}
      </SafeAreaView>
    </>
  );
}
