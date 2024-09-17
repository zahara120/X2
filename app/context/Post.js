import { gql, useMutation, useQuery } from "@apollo/client";
import { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const PostContext = createContext();
export const PostProvider = ({ children }) => {
  const navigation = useNavigation();
  const [allPost, setAllPost] = useState([]);
  const [postByAuthorId, setPostByAuthorId] = useState([]);

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

  const GET_POST_BY_AUTHORID = gql`
    query Query {
      getPostByAuthorId {
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

  const CREATE_POST = gql`
    mutation Mutation($content: String!, $tags: [String], $imgUrl: String) {
      createPost(content: $content, tags: $tags, imgUrl: $imgUrl)
    }
  `;

  const {
    loading: loadingAllPost,
    error: errorAllPost,
    data: AllPost,
    refetch: refetchAllPost,
  } = useQuery(GET_POST);

  const {
    loading: loadingPostByAuthorId,
    error: errorPostByAuthorId,
    data: dataPostByAuthorId,
    refetch: refetchPostByAuthorId,
  } = useQuery(GET_POST_BY_AUTHORID);

  const [handleCreatePost] = useMutation(CREATE_POST);

  useEffect(() => {
    if (AllPost) {
      setAllPost(AllPost.getAllPosts);
    }
  }, [AllPost]);

  useEffect(() => {
    if (dataPostByAuthorId) {
      setPostByAuthorId(dataPostByAuthorId.getPostByAuthorId);
    }
  }, [dataPostByAuthorId]);

  const handleSubmitPost = async (formData) => {
    console.log(formData);
    try {
      await handleCreatePost({
        variables: { ...formData },
      });
      formData.content = "";
      formData.tags = "";
      formData.imgUrl = "";
      refetchAllPost();
      navigation.goBack();
    } catch (error) {
      Alert.alert("Opps...", error.message, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <PostContext.Provider
      value={{
        allPost,
        setAllPost,
        loadingAllPost,
        errorAllPost,
        refetchAllPost,
        handleSubmitPost,
        postByAuthorId,
        loadingPostByAuthorId,
        errorPostByAuthorId,
        refetchPostByAuthorId,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
