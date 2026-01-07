import { Redirect, Stack } from "expo-router";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function AuthLayout() {
  const {isAuthinticated} = useContext(AuthContext)
   if(isAuthinticated){
    return <Redirect href={"/(tabs)/(home)/home"}/>
   }else{
    return <Stack screenOptions={{ headerShown: false }} />;
   }

  
}
