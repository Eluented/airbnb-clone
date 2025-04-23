import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Listings from "@/components/Listings";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface Props {
  listings: any[];
  category: string;
}

const ListingsBottomSheet = ({ listings, category }: Props) => {
  // Change index to 0 to start collapsed
  const snapPoints = useMemo(() => ["10%", "90%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [refresh, setRefresh] = useState<number>(0);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0} // Start collapsed
      snapPoints={snapPoints}
      enablePanDownToClose={false}
      handleIndicatorStyle={{
        backgroundColor: Colors.grey,
        width: 40,
        height: 4,
      }}
      style={styles.sheetContainer}
      backgroundComponent={({ style }) => (
        <View style={[style, styles.background]} />
      )}
    >
      <BottomSheetFlatList
        data={listings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Listings listings={[item]} category={category} />
        )}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <TouchableOpacity
            style={styles.btn}
            onPress={onShowMap}
            activeOpacity={0.8}
          >
            <Ionicons name="map-outline" size={24} color={Colors.dark} />
            <Text style={styles.btnText}>Show Map</Text>
          </TouchableOpacity>
        }
        ListFooterComponent={<View style={{ height: 50 }} />}
        keyboardShouldPersistTaps="handled"
      />
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 30,
    marginBottom: 16,
  },
  btnText: {
    marginLeft: 8,
    color: Colors.dark,
    fontFamily: "mon-sb",
  },
  sheetContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
  },
  background: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});

export default ListingsBottomSheet;
