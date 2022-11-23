import Checkbox from "expo-checkbox";
import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  Button,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { generateNumberReducer } from "../reducer/GenerateNumberReducer";
import randomNumberGenerator from "../util/randomNumberGenerator";
import { ButtonComponent } from "./ButtonComponent";
import HistoryComponent from "./HistoryComponent";
import { InputComponent } from "./InputComponent";
import { SignComponent } from "./SignComponent";

export const GeneratedNumbersComponent = () => {
  const [state, dispatch] = useReducer(generateNumberReducer, {
    tempMin: 0,
    tempMax: 10,
    min: 0,
    max: 10,
    count: 5,
    uniqueNumbers: false,
    lessSign: "<",
    greaterSign: "<",
  });

  const [isMaxApproved, setIsMaxApproved] = useState(true);
  const [isMinApproved, setIsMinApproved] = useState(true);

  const [numbers, setNumbers] = useState([]);

  const [numberHistory, setNumberHistory] = useState([]);

  const onChangeCount = (value) => {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < value.length; i++) {
      if (numbers.indexOf(value[i]) > -1) {
        newText = newText + value[i];
      }
    }
    dispatch({
      type: "SET_COUNT",
      value: newText,
    });
  };

  useEffect(() => {
    if (numbers.length == 0) return;
    setNumberHistory([numbers, ...numberHistory]);
  }, [numbers]);

  useEffect(() => {
    if (!isMaxApproved) return;
    dispatch({ type: "CHECK_CONSTRAINTS" });
    setIsMaxApproved(true);
  }, [isMaxApproved]);

  useEffect(() => {
    if (!isMinApproved) return;
    dispatch({ type: "CHECK_CONSTRAINTS" });
    setIsMinApproved(true);
  }, [isMinApproved]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.root}>
        <InputComponent
          isApproved={isMinApproved}
          onEndEditing={() => {
            setIsMinApproved(true);
          }}
          onChangeNumber={(value) => {
            dispatch({ type: "SET_TEMP_MIN", value: value });
            setIsMinApproved(false);
          }}
          number={state.tempMin.toString()}
          placeholder={state.tempMin.toString()}
        />
        <SignComponent
          sign={state.lessSign}
          toggleSign={() => dispatch({ type: "TOGGLE_LESS_SIGN" })}
        />
        <Text style={styles.text}>Numbers</Text>
        <SignComponent
          sign={state.greaterSign}
          toggleSign={() => dispatch({ type: "TOGGLE_GREATER_SIGN" })}
        />
        <InputComponent
          isApproved={isMaxApproved}
          onEndEditing={() => {
            setIsMaxApproved(true);
          }}
          onChangeNumber={(value) => {
            dispatch({ type: "SET_TEMP_MAX", value: value });
            setIsMaxApproved(false);
          }}
          number={state.tempMax.toString()}
          placeholder={state.tempMax.toString()}
        />
      </View>
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
      <ButtonComponent
        text="Generate"
        onPress={() => {
          if (state.count == "") {
            dispatch({
              type: "SET_COUNT",
              value: 0,
            });
          }
          setNumbers(randomNumberGenerator(state));
        }}
      />
      <Text style={styles.numbers}>{numbers.map((x) => x + " ")}</Text>
      <HistoryComponent numberHistory={numberHistory} />
    </SafeAreaView>
  );
};

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
