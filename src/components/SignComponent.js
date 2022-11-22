import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const SignComponent = (props) => {
  const { toggleSign, sign } = props;
  return (
    <TouchableOpacity style={styles.root} onPress={toggleSign}>
      <Text style={styles.text}>{sign}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#D5D5D5",
    margin: 2,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
