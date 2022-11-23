import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { GeneratedNumbersComponent } from "../components/GeneratedNumbersComponent";

export const HomePage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GeneratedNumbersComponent />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
