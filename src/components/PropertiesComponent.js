import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { InputComponent } from './InputComponent';
import Checkbox from 'expo-checkbox';

export default function PropertiesComponent(props) {
    const {onChangeCount,state,dispatch} = props;
  return (
    <View>
       <View style={styles.countView}>
        <Text style={styles.text}>Number Count:</Text>
        <InputComponent
          isApproved={true}
          onChangeNumber={(value) => onChangeCount(value)}
          number={state.count.toString()}
          placeholder={state.count.toString()}
        />
      </View>
      <View style={styles.countView}>
        <Text style={styles.text}>Unique Numbers: </Text>
        <Checkbox
          value={state.uniqueNumbers}
          onValueChange={(value) =>
            dispatch({ type: "SET_UNIQUE_NUMBERS", value })
          }
          style={styles.checkbox}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  numbers: {
    textAlign: "center",
    margin: 20,
    fontSize: 30,
    color: "#2c6862",
    fontWeight: "bold",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  countView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 20,
    marginTop: 10,
  },
  text: {
    color: "#2c6862",
    fontSize: 25,
    fontWeight: "bold",
  },
  checkboxContainer: {
    borderColor: "#009688",
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    borderColor: "#009688",
    borderRadius: 5,
    width: 40,
    padding: 15,
    height: 40,
    alignSelf: "center",
  },
});
