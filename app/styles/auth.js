import { StyleSheet } from "react-native";

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101010",
    alignItems: "center",
    justifyContent: "center",
  },
  inputView: {
    width: "80%",
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    height: 50,
    marginBottom: 10,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "white",
  },
  submitBtn: {
    width: "80%",
    backgroundColor: "#ffff",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 15,
  },
  submitText: {
    color: "#717171",
    fontWeight: "bold",
  },
  submitTextHighlight: {
    color: "#ffff",
    fontWeight: "bold",
  },
});
