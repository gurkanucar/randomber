import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ButtonComponent = (props) => {
  const color = props.color;

  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={[
          styles.appButtonContainer,
          {
            backgroundColor: color || "#009688",
          },
        ]}
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
    marginTop: 25,
    marginLeft: 15,
    marginRight: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
