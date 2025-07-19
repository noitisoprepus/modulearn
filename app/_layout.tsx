import { AnswersProvider } from "@/context/ContextProvider";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    GermaniaOne: require("@/assets/fonts/GermaniaOne-Regular.ttf"),
    KantumruyProRegular: require("@/assets/fonts/KantumruyPro-Regular.ttf"),
    KantumruyProBold: require("@/assets/fonts/KantumruyPro-Bold.ttf"),
    KantumruyProMedium: require("@/assets/fonts/KantumruyPro-Medium.ttf"),
    KantumruyProLightItalic: require("@/assets/fonts/KantumruyPro-LightItalic.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AnswersProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AnswersProvider>
  );
}
