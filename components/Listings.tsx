import { View, Text, FlatList, ListRenderItem } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "expo-router";

interface Props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: Props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    console.log("RELOAD_LISTINGS");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);
  

  const renderRow: ListRenderItem<any> = ({ item }) => (
    <Link href={`/listing/${item.id}`}>Go there</Link>
  );
  return (
    <View>
      <FlatList
        renderItem={renderRow}
        ref={listRef}
        data={loading ? [] : items}
      />
    </View>
  );
};

export default Listings;
