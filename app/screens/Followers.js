import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/global";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUser } from "../context/User";
import UserList from "../components/UserList";

const Followers = ({ navigation }) => {
  const { user, loadingUser, errorUser } = useUser();
  return (
    <SafeAreaView style={globalStyles.container}>
      <View
        style={{
          gap: 20,
        }}
      >
        {/* header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()} title="Dismiss">
            <Text style={{ color: "white" }}>Cancel</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Followers
          </Text>
          <TouchableOpacity>
            <Ionicons
              name="ellipsis-horizontal-circle-outline"
              size={24}
              color="white"
            />
          </TouchableOpacity>
        </View>

        {/* content */}
        {/* <Text style={{ color: "white" }}>{JSON.stringify(user.followers)}</Text> */}
        {user.followers.length === 0 && (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={{ color: "white" }}>You don't have any followers</Text>
          </View>
        )}
        <ScrollView style={{ width: "100%", marginBottom: 80 }}>
          {user.followers.map((e, idx) => (
            <UserList key={idx} user={e} status="off" />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Followers;
