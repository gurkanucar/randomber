export const generateNumberReducer = (state, action) => {
  switch (action.type) {
    case "SET_MIN": {
      return {
        ...state,
        min: parseInt(action.value),
      };
    }
    case "SET_MAX": {
      return {
        ...state,
        max: parseInt(action.value),
      };
    }
    case "SET_TEMP_MIN": {
      return {
        ...state,
        tempMin:
          action.value == "0"
            ? "0"
            : action.value.replace(/\D/g, "").replace(/^0+/, ""),
      };
    }
    case "SET_TEMP_MAX": {
      return {
        ...state,
        tempMax:
          action.value == "0"
            ? "0"
            : action.value.replace(/\D/g, "").replace(/^0+/, ""),
      };
    }
    case "SET_COUNT": {
      return {
        ...state,
        count: action.value.replace(/\D/g, "").replace(/^0+/, ""),
      };
    }
    case "TOGGLE_LESS_SIGN": {
      return {
        ...state,
        lessSign: "<" == state.lessSign ? "<=" : "<",
      };
    }
    case "SET_UNIQUE_NUMBERS": {
      return {
        ...state,
        uniqueNumbers: action.value,
      };
    }
    case "TOGGLE_GREATER_SIGN": {
      return {
        ...state,
        greaterSign: "<" == state.greaterSign ? "<=" : "<",
      };
    }
    case "CHECK_CONSTRAINTS": {
      if (parseInt(state.tempMax) < parseInt(state.tempMin)) {
        return {
          ...state,
          min: state.tempMax,
          max: state.tempMin,
          tempMin: state.tempMax,
          tempMax: state.tempMin,
        };
      } else {
        return {
          ...state,
          max: state.tempMax,
          min: state.tempMin,
        };
      }
    }
  }
};
