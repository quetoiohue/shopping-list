import * as actionTypes from "../action";
import { getItems } from "../../API/Product";

var initialState = {
  listItem: [],
  isLoading: false,
  error: null
};

const shoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ITEMS_BEGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case actionTypes.FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        listItem: action.listItem,
        error: null
      };
    case actionTypes.FETCH_ITEMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error,
        listItem: []
      };
    case actionTypes.REFRESH_STATE:
      const USER_ID = JSON.parse(localStorage.getItem("USER_ID"));
      getItems(USER_ID);
      return {
        ...state
      };
    default:
      return state;
  }
};

export default shoppingReducer;
