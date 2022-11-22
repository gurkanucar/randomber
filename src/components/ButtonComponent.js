import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ButtonComponent = (props) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.appButtonContainer}
        onPress={props.onPress}
      >
        <Text style={styles.appButtonText}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
    marginLeft: 15,
    marginRight: 15,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
