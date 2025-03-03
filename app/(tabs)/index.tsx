import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Page = () => {
  return (
    <View>
      <Link href={"/(modals)/otp"}>Login</Link>
      <Link href={"/(modals)/booking"}>Bookings</Link>
      <Link href={"/listing/133"}>Listing details</Link>
    </View>
  );
};

export default Page;
