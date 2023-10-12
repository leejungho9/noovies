import React, { useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { useFonts } from "expo-font";
import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import Root from "./navigation/Root";
import { useColorScheme } from "react-native";
import { lightTheme } from "./styled";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts(Ionicons.font);
  const [assets] = useAssets(require("./damda.png"));
  const isDark = useColorScheme() === "dark";

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && assets) await SplashScreen.hideAsync();
  }, [fontsLoaded, assets]);

  if (!fontsLoaded || !assets) {
    return null;
  }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer onReady={onLayoutRootView}>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
