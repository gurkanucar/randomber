import Checkbox from "expo-checkbox";
import React, { useEffect, useReducer, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  BackHandler,
  Alert,
  Keyboard,
  ScrollView,
} from "react-native";
import { CustomErrors } from "../errors/CustomErrors";
import { generateNumberReducer } from "../reducer/GenerateNumberReducer";
import randomNumberGenerator from "../util/randomNumberGenerator";
import { ButtonComponent } from "./ButtonComponent";
import HistoryComponent from "./HistoryComponent";
import { InputComponent } from "./InputComponent";
import PropertiesComponent from "./PropertiesComponent";
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

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isMaxApproved, setIsMaxApproved] = useState(true);
  const [isMinApproved, setIsMinApproved] = useState(true);
  const [numbers, setNumbers] = useState([]);
  const [numberHistory, setNumberHistory] = useState([]);

  const onChangeCount = (value) => {
    dispatch({
      type: "SET_COUNT",
      value: value,
    });
  };

  useEffect(() => {
    if (numbers.length == 0) return;
    setNumberHistory([numbers, ...numberHistory]);
  }, [numbers]);

  useEffect(() => {
    if (!isMaxApproved || !isMinApproved) return;
    if (isMaxApproved) {
      dispatch({ type: "CHECK_CONSTRAINTS" });
      setIsMaxApproved(true);
    } else if (isMinApproved) {
      dispatch({ type: "CHECK_CONSTRAINTS" });
      setIsMinApproved(true);
    }
  }, [isMaxApproved, isMinApproved]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        setIsMinApproved(true);
        setIsMaxApproved(true);
        console.log("keyboard closed");
        // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const clearValues = () => {
    setNumberHistory([]);
    setNumbers([]);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const generateNumbers = () => {
    try {
      if (!isMaxApproved || !isMinApproved) {
        throw Error(CustomErrors.SubmitConstraintsError);
      }
      setNumbers(randomNumberGenerator(state));
    } catch (e) {
      Alert.alert("Ups!", e.message);
      if (e.message == CustomErrors.UniqueValuesError) {
        dispatch({ type: "SET_UNIQUE_NUMBERS", value: false });
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.root}>
        <InputComponent
          isApproved={isMinApproved}
          onEndEditing={() => {
            setIsMinApproved(true);
          }}
          onFocus={() => {
            console.log("focus");
            if (state.tempMin.toString() == "0") {
              dispatch({ type: "SET_TEMP_MIN", value: "" });
              setIsMinApproved(true);
              dispatch({ type: "CHECK_CONSTRAINTS" });
            }
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
          onFocus={() => {
            if (state.tempMax.toString() == "0") {
              dispatch({ type: "SET_TEMP_MAX", value: "" });
              setIsMaxApproved(true);
              dispatch({ type: "CHECK_CONSTRAINTS" });
            }
          }}
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

      <PropertiesComponent
        onChangeCount={onChangeCount}
        state={state}
        dispatch={dispatch}
      />

      <View style={styles.buttons}>
        <ButtonComponent
          text="Clear Values"
          color="#0097FF"
          onPress={clearValues}
        />
        <ButtonComponent text="Generate" onPress={generateNumbers} />
      </View>
      <View style={{ height: 80 }}>
        <ScrollView
          horizontal={true}
          contentContainerStyle={styles.numbersScrollView}
        >
          <Text style={styles.numbers}>{numbers.map((x) => x + " ")}</Text>
        </ScrollView>
      </View>
      <HistoryComponent numberHistory={numberHistory} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  numbersScrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
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
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  countView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginLeft: 20,
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
