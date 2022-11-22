import { Alert } from "react-native";

export default (data) => {
  // const [state, dispatch] = useReducer(generateNumberReducer, {
  //     tempMin: 0,
  //     tempMax: 10,
  //     min: 0,
  //     max: 10,
  //     count: 5,
  //     uniqueNumbers: false,
  //     lessSign: "<",
  //     greaterSign: "<",
  //   });

  let { min, max, count, uniqueNumbers, lessSign, greaterSign } = data;
  min = parseInt(min);
  max = parseInt(max);
  count = parseInt(count);

  let tempMin = min,
    tempMax = max;

  const selectedNumbers = [];

  if (count <= 0) {
    return [];
  }

  if (max - min <= 1 && lessSign == "<" && greaterSign == "<") {
    Alert.alert("ERROR!", "You can not create values by given constraints :(");
    return selectedNumbers;
  }

  if (uniqueNumbers == false) {
    for (let i = 0; i < count; i++) {
      selectedNumbers.push(getRndInteger(min, max, lessSign, greaterSign));
    }
  } else {
    if (lessSign == "<") {
      tempMin = min + 1;
    }
    if (greaterSign == "<=") {
      tempMax = max + 1;
    }
    if (tempMax - tempMin < count) {
      Alert.alert(
        "ERROR!",
        "You can not create unique values by given constraints but we have created not unique values :)"
      );
      for (let i = 0; i < count; i++) {
        selectedNumbers.push(getRndInteger(min, max, lessSign, greaterSign));
      }
    } else {
      for (let i = 0; i < count; i++) {
        let temp = getRndInteger(min, max, lessSign, greaterSign);
        while (selectedNumbers.includes(temp)) {
          temp = getRndInteger(min, max, lessSign, greaterSign);
        }
        selectedNumbers.push(temp);
      }
    }
  }
  return selectedNumbers;
};

function getRndInteger(min, max, minBound, maxBound) {
  min = minBound == "<" ? 1 + min : min;
  console.log("get rnd", min, max);
  return (
    Math.floor(Math.random() * (max - min + (maxBound == "<=" ? 1 : 0))) + min
  );
}
