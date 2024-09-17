import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { authStyles } from "../styles/auth";
import { gql, useMutation } from "@apollo/client";
export default function RegisterScreen({ navigation }) {
  const REGISTER = gql`
    mutation Mutation(
      $name: String
      $username: String
      $email: String
      $password: String
    ) {
      register(
        name: $name
        username: $username
        email: $email
        password: $password
      )
    }
  `;

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const onChangeText = (value, field) => {
    setFormData({ ...formData, [field]: value });
  };

  const [handleRegister, { loading, error }] = useMutation(REGISTER);
  const handleSubmit = async () => {
    try {
      await handleRegister({
        variables: { ...formData },
      });
      formData.name = "";
      formData.username = "";
      formData.email = "";
      formData.password = "";

      navigation.navigate("Login");
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
            keyboardAppearance="dark"
            style={authStyles.inputText}
            placeholder="Name"
            placeholderTextColor="#717171"
            value={formData.name}
            onChangeText={(value) => onChangeText(value, "name")}
          />
        </View>
        <View style={authStyles.inputView}>
          <TextInput
            keyboardAppearance="dark"
            style={authStyles.inputText}
            placeholder="Username"
            placeholderTextColor="#717171"
            value={formData.username}
            onChangeText={(value) => onChangeText(value, "username")}
          />
        </View>
        <View style={authStyles.inputView}>
          <TextInput
            inputMode="email"
            keyboardAppearance="dark"
            style={authStyles.inputText}
            placeholder="Email"
            placeholderTextColor="#717171"
            value={formData.email}
            onChangeText={(value) => onChangeText(value, "email")}
          />
        </View>
        <View style={authStyles.inputView}>
          <TextInput
            keyboardAppearance="dark"
            style={authStyles.inputText}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#717171"
            value={formData.password}
            onChangeText={(value) => onChangeText(value, "password")}
          />
        </View>

        <TouchableOpacity onPress={handleSubmit} style={authStyles.submitBtn}>
          <Text style={authStyles.submitText}>
            {loading ? (
              <ActivityIndicator size="small" color="#101010" />
            ) : (
              "Register"
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={authStyles.submitText}>
            Already have an account?{" "}
            <Text style={authStyles.submitTextHighlight}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
