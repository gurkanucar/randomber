import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";

export const InputComponent = (props) => {
  const { onChangeNumber, number, placeholder, onEndEditing, isApproved } =
    props;
  return (
    <SafeAreaView style={styles.root}>
      <TextInput
        style={[
          styles.input,
          !isApproved
            ? { color: "red", borderColor: "red" }
            : { color: "#009688", borderColor: "#009688" },
        ]}
        onEndEditing={onEndEditing}
        onChangeText={onChangeNumber}
        value={number}
        placeholder={placeholder}
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 45,
    margin: 5,
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
});
