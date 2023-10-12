import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const NativeStack = createStackNavigator();

const ScreenOne = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate("Two")}>
      <Text>하나</Text>
    </TouchableOpacity>
  );
};

const ScreenTwo = ({ navigation: { navigate } }) => {
  return (
    <TouchableOpacity onPress={() => navigate("Three")}>
      <Text>둘</Text>
    </TouchableOpacity>
  );
};

const ScreenThree = ({ navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.setOptions({ title: "Hello!" })}
    >
      <Text>Change title</Text>
    </TouchableOpacity>
  );
};

function Stack() {
  return (
    <NativeStack.Navigator>
      <NativeStack.Screen name="One" component={ScreenOne} />
      <NativeStack.Screen name="Two" component={ScreenTwo} />
      <NativeStack.Screen name="Three" component={ScreenThree} />
    </NativeStack.Navigator>
  );
}

export default Stack;
