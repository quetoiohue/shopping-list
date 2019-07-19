import * as actionTypes from "../action";
import * as fetch from "../../API/Product";
import { stat } from "fs";

var initialState = {
  listItem: [],
  Lists: [],
  LIST_ID: JSON.parse(localStorage.getItem("LIST_ID")) || 1,
  isLoading: false,
  error: null,
  count: 0,
  isSelected : false,
  openSnackBar: false,
  txtSnackBar: ""
};

const shoppingReducer = (state = initialState, action) => {
  const USER_ID = JSON.parse(localStorage.getItem("USER_ID"));

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
        fetch.getItems(USER_ID, state.LIST_ID);
      return {
        ...state,
      };
    case actionTypes.FETCH_LISTS_SUCCESS:
      return {
        ...state,
        Lists: action.Lists,
      };
    case actionTypes.REFRESH_LISTS:
        fetch.getLists(USER_ID);   
      return {
        ...state
      };
    case actionTypes.SHOW_LIST:
      return {
        ...state,
      LIST_ID: action.LIST_ID 
      }
    // selected item
    case actionTypes.SET_COUNT: 
    return {
        ...state,
        count: action.count
    }
    case actionTypes.SET_SELECTED:
      return {
        ...state,
        isSelected: action.isSelected
      }
    case actionTypes.REFRESH_COUNT:
      fetch.getCountSelected(state.LIST_ID);
      return {
        ...state
      } 
    case actionTypes.SET_OPEN_SNACKBAR:
      return{
        ...state,
        openSnackBar: action.openSnackBar
      }   
    case actionTypes.SET_TEXT_SNACKBAR:
      return {
        ...state,
        txtSnackBar: action.txtSnackBar
      }  
    default:
      return state;
  }
};

export default shoppingReducer;
