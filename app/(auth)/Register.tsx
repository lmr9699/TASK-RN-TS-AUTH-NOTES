import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Image
} from "react-native";
import React, { useContext, useState } from "react";
import colors from "../../data/styling/colors";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/api/auth";
import AuthContext from "@/context/AuthContext";
import { router } from "expo-router";
import { setToken } from "@/api/storage";
import * as ImagePicker from 'expo-image-picker';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState<string>("");
  const {setIsAuthinticated} = useContext(AuthContext)

  const {mutate} = useMutation({
    mutationKey: ["register"],
    mutationFn:() => register({email, password, name, image})
    ,
    onSuccess: async (data) => {
      console.log(data)
      await setToken(data.token)
      router.push("/(tabs)/(home)/home");
      setIsAuthinticated(true)},
      onError: (err) => {
        console.log(err)
      }
  })

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library.
    // Manually request permissions for videos on iOS when `allowsEditing` is set to `false`
    // and `videoExportPreset` is `'Passthrough'` (the default), ideally before launching the picker
    // so the app users aren't surprised by a system dialog after picking a video.
    // See "Invoke permissions for videos" sub section for more details.
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission required', 'Permission to access the media library is required.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = async () => {
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
          <Text
            style={{
              color: colors.white,
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Register
          </Text>
          <Text style={{ color: colors.white, fontSize: 16 }}>
            Create your account
          </Text>
          <TextInput
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            keyboardType="default"
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

          <TouchableOpacity onPress={pickImage} style={{ marginTop: 20 }}>
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Upload Profile Image
            </Text>
            {image && (<Image 
            source={{uri: image}}
            style={{width: 200, height:200, margin:10}}/>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: colors.white,
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
              alignItems: "center",
            }}
            onPress={handleRegister}
          >
            <Text
              style={{
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginTop: 20, alignItems: "center" }}>
            <Text style={{ color: colors.white, fontSize: 16 }}>
              Already have an account?{" "}
              <Text style={{ color: colors.white, fontWeight: "bold" }}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Register;

const styles = StyleSheet.create({});
