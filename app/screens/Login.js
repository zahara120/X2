import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { authStyles } from "../styles/auth";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";
import { gql, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { useUser } from "../context/User";
import { usePost } from "../context/Post";

export default function LoginScreen({ navigation }) {
  const { setIsLogin } = useContext(AuthContext);
  const { refetch } = useUser();
  const { refetchPostByAuthorId } = usePost();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const LOGIN = gql`
    mutation Mutation($email: String, $password: String) {
      login(email: $email, password: $password)
    }
  `;

  const [handleLogin, { loading, error }] = useMutation(LOGIN);

  const onChangeText = (value, field) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const result = await handleLogin({
        variables: { email: formData.email, password: formData.password },
      });
      // console.log(result.data.login);
      await SecureStore.setItemAsync("token", result.data.login);
      refetch();
      refetchPostByAuthorId();
      setIsLogin(true);
    } catch (error) {
      Alert.alert("Opps...", error.message, [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={authStyles.container}>
        <View style={authStyles.inputView}>
          <TextInput
            inputMode="email"
            style={authStyles.inputText}
            placeholder="Email"
            placeholderTextColor="#717171"
            value={formData.email}
            keyboardAppearance="dark"
            onChangeText={(value) => onChangeText(value, "email")}
          />
        </View>
        <View style={authStyles.inputView}>
          <TextInput
            style={authStyles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#717171"
            value={formData.password}
            keyboardAppearance="dark"
            onChangeText={(value) => onChangeText(value, "password")}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} style={authStyles.submitBtn}>
          <Text style={authStyles.submitText}>
            {loading ? (
              <ActivityIndicator size="small" color="#101010" />
            ) : (
              "Login"
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={authStyles.submitText}>
            Don't have an account?{" "}
            <Text style={authStyles.submitTextHighlight}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
