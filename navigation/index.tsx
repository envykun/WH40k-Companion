/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";
import { IconButton } from "react-native-paper";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ConfigScreen from "../screens/ConfigScreen";
import GameScreen from "../screens/GameScreen";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList, RootTabParamList, RootTabScreenProps } from "../types";

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Config"
        component={ConfigScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
