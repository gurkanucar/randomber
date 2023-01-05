import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { HistoryItemComponent } from "./HistoryItemComponent";

const HistoryComponent = (props) => {
  const { numberHistory } = props;

  const [dataSourceCords, setDataSourceCords] = useState([]);
  const [ref, setRef] = useState(null);

  const ItemView = (item, key) => {
    return (
      <View
        key={key}
        style={styles.item}
        onLayout={(event) => {
          const layout = event.nativeEvent.layout;
          dataSourceCords[key] = layout.y;
          setDataSourceCords(dataSourceCords);
        }}
      >
        <HistoryItemComponent numbers={item} />
        <ItemSeparatorView />
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return <View style={styles.itemSeparatorStyle} />;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView
          ref={(ref) => {
            setRef(ref);
          }}
        >
          {numberHistory.map(ItemView)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  itemStyle: {
    padding: 10,
  },
  itemSeparatorStyle: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#C8C8C8",
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#1e73be",
    padding: 5,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  searchButton: {
    padding: 15,
    backgroundColor: "#f4801e",
  },
  searchButtonText: {
    color: "#fff",
  },
});

export default HistoryComponent;
