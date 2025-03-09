import { View, Text } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import ExploreHeader from "@/components/ExploreHeader";
import Listings from "@/components/Listings";

const Page = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ header: () => <ExploreHeader /> }} />
      <Listings />
      {/* <Link href={"/(modals)/otp"}>Login</Link>
      <Link href={"/(modals)/booking"}>Bookings</Link>
      <Link href={"/listing/133"}>Listing details</Link> */}
    </View>
  );
};

export default Page;
