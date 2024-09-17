import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import Main from "./navigation/Main";
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/Auth";
import * as SecureStore from "expo-secure-store";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const checkToken = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) setIsLogin(true);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin }}>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <StatusBar animated={true} barStyle="light-content" />
          <NavigationContainer>
            <Main />
          </NavigationContainer>
        </SafeAreaProvider>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}

export default App;
