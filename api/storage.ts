import * as SecureStore from "expo-secure-store";

const setToken = async (token: string) => {
  await SecureStore.setItemAsync("token", token);
};

const getToken = async () => {
  const token = await SecureStore.getItemAsync("token");
  return token;
};

const deleteToken = async () => {
  const token = await SecureStore.deleteItemAsync("token");
};

export { setToken, getToken, deleteToken };
