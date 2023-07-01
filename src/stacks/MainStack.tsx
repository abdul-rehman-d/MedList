import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";

import Home from "../screens/Home";
import Export from "../screens/Export";
import EditProfile from "../screens/EditProfile";
import Register from "../screens/Register";
import { RootStackParamList } from "../types";
import AdvancedOptions from "../screens/AdvancedOptions";
import About from "../screens/About";

const Stack = createNativeStackNavigator<RootStackParamList>();

function MainStack() {
  const isSignedIn = useSelector((state: RootState) => Boolean(state.user.user));

  return (
    <Stack.Navigator>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Export"
            component={Export}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AdvancedOptions"
            component={AdvancedOptions}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  )
}

export default MainStack;
