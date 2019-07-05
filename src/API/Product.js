import store from "../store/createStore";
import * as actionTypes from "../store/action";

const axios = require("axios");
const host = "http://localhost:7000";

export const products = async () => {
  return await axios.get(host + "/products");
};

export const getItems = async USER_ID => {
  return await axios.get(host + "/get_items/" + USER_ID).then(res => {
    store.dispatch({
      type: actionTypes.FETCH_ITEMS_SUCCESS,
      listItem: res.data
    });
    return res.data;
  });
};

export const createItem = async (
  LIST_ID,
  ITEM_NAME,
  ITEM_PICTURE,
  ITEM_NOTE,
  CATEGORY_ID
) => {
  return axios
    .post(host + "/create_item", {
      LIST_ID,
      ITEM_NAME,
      ITEM_PICTURE,
      ITEM_NOTE,
      CATEGORY_ID
    })
    .then(res => store.dispatch({ type: actionTypes.REFRESH_STATE }));
};

export const deleteItem = async ITEM_ID => {
  return await axios
    .post(host + "/delete_item", {
      ITEM_ID
    })
    .then(res => store.dispatch({ type: actionTypes.REFRESH_STATE }));
};

export const updateItem = async (
  ITEM_ID,
  ITEM_NAME,
  ITEM_QUANTITY,
  ITEM_NOTE,
  IS_CHECKED
) => {
  return await axios
    .post(host + "/update_item", {
      ITEM_ID,
      ITEM_NAME,
      ITEM_QUANTITY,
      ITEM_NOTE,
      IS_CHECKED
    })
    .then(res => store.dispatch({ type: actionTypes.REFRESH_STATE }));
};

export const deleteFollowState = async IS_CHECKED => {
  return await axios
    .post(host + "/delete_all_item", {
      IS_CHECKED
    })
    .then(res => store.dispatch({ type: actionTypes.REFRESH_STATE }));
};

export const setStateAllOfItem = async IS_CHECKED => {
  return await axios
    .post(host + "/set_state_all_item", {
      IS_CHECKED
    })
    .then(res => store.dispatch({ type: actionTypes.REFRESH_STATE }));
};
