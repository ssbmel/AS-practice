import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      {/* <Stack.Screen
        name="login"
        options={{
          headerTitle: "로그인",
          headerShown: false,

        }}
      /> */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
    </Stack>
  );
}
