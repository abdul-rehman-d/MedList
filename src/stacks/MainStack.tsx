import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";

import Home from "../screens/Home";
import Export from "../screens/Export";
import AddNewMedicine from "../screens/AddNewMedicine";
import Register from "../screens/Register";

const Stack = createNativeStackNavigator();

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
            name="AddNewMedicine"
            component={AddNewMedicine}
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
