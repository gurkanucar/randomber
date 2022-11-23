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
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    backgroundColor: "#009688",
    margin: 2,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
