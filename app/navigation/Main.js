import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../screens/Register";
import LoginScreen from "../screens/Login";
import Tab from "./Tab.";
import AddPost from "../screens/AddPost";
import PostDetail from "../screens/PostDetail";
import { globalStyles } from "../styles/global";
import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import { UserProvider } from "../context/User";
import { PostProvider } from "../context/Post";
import Followers from "../screens/Followers";
import Following from "../screens/Following";

export default function Main() {
  const Stack = createNativeStackNavigator();
  const { isLogin } = useContext(AuthContext);

  return (
    <PostProvider>
      <UserProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLogin ? (
            <>
              <Stack.Screen name="Tab" component={Tab} />
              <Stack.Screen
                options={{ presentation: "modal" }}
                name="AddPost"
                component={AddPost}
              />
              <Stack.Screen
                options={{ presentation: "modal" }}
                name="Followers"
                component={Followers}
              />
              <Stack.Screen
                options={{ presentation: "modal" }}
                name="Following"
                component={Following}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                  title: "Post",
                  headerStyle: {
                    backgroundColor: globalStyles.header.backgroundColors,
                  },
                  headerTintColor: "#fff",
                  headerTitleStyle: {
                    fontWeight: "bold",
                  },
                  headerBackTitle: "Back",
                }}
                name="PostDetail"
                component={PostDetail}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
            </>
          )}
        </Stack.Navigator>
      </UserProvider>
    </PostProvider>
  );
}
