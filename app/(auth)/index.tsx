import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import colors from "../../data/styling/colors";
import { router } from "expo-router";
import { login } from "@/api/auth";
import {useMutation} from "@tanstack/react-query"
import { setToken } from "@/api/storage";
import AuthContext from "@/context/AuthContext";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthinticated, setIsAuthinticated}=useContext(AuthContext)

  const {mutate}=useMutation({
    mutationKey: ["login"],
    mutationFn: () => login({email: email, password: password}),
    onSuccess: async (data) => {
      console.log("success:", data)
      await setToken(data.token)
      router.push("/(tabs)/(home)/home");
      setIsAuthinticated(true)
    }
  })

  const handleLogin = async () => {
    console.log(email, password);
    mutate()
    
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.primary,
          padding: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", padding: 20 }}>
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Login to your account
          </Text>

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colors.black}
          />

          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            placeholderTextColor={colors.black}
          />

          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
            }}
            onPress={handleLogin}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ marginTop: 20, alignItems: "center" }}
            onPress={() => {
              router.push("/(auth)/Register");
            }}
          >
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Index;

const styles = StyleSheet.create({});
