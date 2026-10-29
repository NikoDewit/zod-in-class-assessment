import { FormInput } from "@/components/FormInput";
import { SignUpFormData, signUpSchema } from "@/lib/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { isValid, isSubmitting, dirtyFields },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onTouched",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  useEffect(() => {
    if (dirtyFields.confirmPassword) {
      trigger("confirmPassword");
    }
  }, [password]);

  const onSubmit = async (data: SignUpFormData) => {
    console.log("First Name: ", data.firstName);
    console.log("Last Name: ", data.lastName);
    console.log("Email: ", data.email);

    router.replace({
      pathname: "/confirmation",
      params: { name: data.firstName },
    });
  };

  const disabled = !isValid || isSubmitting;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <FormInput
          control={control}
          name="firstName"
          label="First Name"
          autoCorrect={false}
        />
        <FormInput
          control={control}
          name="lastName"
          label="Last Name"
          autoCorrect={false}
        />
        <FormInput
          control={control}
          name="email"
          label="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <FormInput
          control={control}
          name="password"
          label="Password"
          secureTextEntry
          autoCapitalize="none"
        />
        <FormInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          secureTextEntry
          autoCapitalize="none"
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#93c5fd" },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
