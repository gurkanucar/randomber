import { Alert } from "react-native";
import { CustomErrors } from "../errors/CustomErrors";

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

  if (count == "" || count == "0") {
    throw Error(CustomErrors.NumberCountError);
  }
  if (max === "" || min === "") {
    throw Error(CustomErrors.ConstraintsError);
  }

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
    throw Error(CustomErrors.ConstraintsError);
  }
  if (Math.abs(tempMax - tempMin) < 2) {
    throw Error(CustomErrors.ConstraintsError);
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
      throw Error(CustomErrors.UniqueValuesError);
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
