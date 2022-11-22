import React from "react";
import {  StyleSheet, Text, View } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
export const HistoryItemComponent = (props) => {
  const { numbers } = props;
  return (
    <View>
      <FlatList
        horizontal
        renderItem={({ item, idx }) => <Text style={styles.text}>{item}</Text>}
        data={numbers}
        keyExtractor={(item, idx) => idx}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 25,
  },
});
