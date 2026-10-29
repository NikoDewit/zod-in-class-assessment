import { router, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function ConfirmationScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Form submitted!</Text>
      <Text style={styles.message}>Account created for {name}</Text>

      <Pressable style={styles.button} onPress={() => router.replace("/")}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 8 },
  message: { fontSize: 18, marginBottom: 32, textAlign: "center" },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
