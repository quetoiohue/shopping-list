import store from "../store/createStore";
import * as actionTypes from "../store/action";

const axios = require("axios");
const host = "http://localhost:7000";

export const products = (offset, pagesize) => {
  return axios.post(host + "/products", {
    offset,
    pagesize
  });
};

export const getItems = (USER_ID, LIST_ID) => {
  return axios
    .get(host + "/get_items/" + USER_ID + "&" + LIST_ID)
    .then(res => {
      store.dispatch({
        type: actionTypes.FETCH_ITEMS_SUCCESS,
        listItem: res.data
      });
      store.dispatch({type: actionTypes.REFRESH_COUNT})
      return res.data;
    }).catch(err => store.dispatch({
      type: actionTypes.FETCH_ITEMS_FAILURE,
      error: err
    }));
};

export const createItem = (
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

export const deleteItem = ITEM_ID => {
  return axios
    .post(host + "/delete_item", {
      ITEM_ID
    })
    .then(res => store.dispatch({ type: actionTypes.REFRESH_STATE }));
};

export const updateItem = (
  ITEM_ID,
  ITEM_NAME,
  ITEM_QUANTITY,
  ITEM_NOTE,
  IS_CHECKED
) => {
  return axios
    .post(host + "/update_item", {
      ITEM_ID,
      ITEM_NAME,
      ITEM_QUANTITY,
      ITEM_NOTE,
      IS_CHECKED
    })
    .then(res => store.dispatch({ type: actionTypes.REFRESH_STATE }));
};

export const deleteFollowState = IS_CHECKED => {
  return axios
    .post(host + "/delete_all_item", {
      IS_CHECKED
    })
    .then(res => store.dispatch({ type: actionTypes.REFRESH_STATE }));
};

export const setStateAllOfItem = IS_CHECKED => {
  return axios
    .post(host + "/set_state_all_item", {
      IS_CHECKED
    })
    .then(res => store.dispatch({ type: actionTypes.REFRESH_STATE }));
};

export const getCategorys = () => {
  return axios.get(host + "/get_categorys");
};

export const createList = (USER_ID, LIST_NAME, IS_PRIMARY) => {
  return axios
    .post(host + "/create_list", {
      USER_ID,
      LIST_NAME,
      IS_PRIMARY
    })
    .then(res => {
      localStorage.setItem("LIST_ID", JSON.stringify(res.data));
      store.dispatch({ type: actionTypes.REFRESH_LISTS });
      store.dispatch({ type: actionTypes.SHOW_LIST, LIST_ID: res.data})
      store.dispatch({type: actionTypes.REFRESH_STATE });
    });
};

export const getLists = USER_ID => {
  return axios.get(host + "/get_lists/" + USER_ID).then(res => {
    store.dispatch({ type: actionTypes.FETCH_LISTS_SUCCESS, Lists: res.data });
  });
};

export const updateList = (LIST_ID, LIST_NAME, IS_PRIMARY) => {
  return axios.post(host + '/update_list' , {
    LIST_ID,
    LIST_NAME,
    IS_PRIMARY
  }).then( res => {
    store.dispatch({ type: actionTypes.REFRESH_LISTS })
  })
}

export const deleteList = (LIST_ID) => {
  return axios.post(host + '/delete_list' , {
    LIST_ID
  }).then( res => {
    store.dispatch({ type: actionTypes.REFRESH_LISTS })
  })
}

export const getListQuantity = (LIST_ID) => {
  return axios.get(host + '/get_list_quantity/' + LIST_ID);
}

export const resetListPrimary = () => {
  return axios.put(host + '/reset_list_primary')
}

export const getInfoAccount = (USER_ID) => {
  return axios.get(host + "/get_info_account/" + USER_ID);
}

export const setSelectedItem = (ITEM_ID, IS_SELECTED) => {
  return axios.post(host + '/set_selected_item', {
    ITEM_ID,
    IS_SELECTED
  }).then(res => {
    store.dispatch({type: actionTypes.REFRESH_STATE})
    // store.dispatch({type: actionTypes.REFRESH_COUNT})
  })
}

export const getCountSelected = (LIST_ID) => {
  return axios.post(host + '/get_count_selected', {
    LIST_ID
  }).then(res => {
    store.dispatch({ type: actionTypes.SET_COUNT, count: res.data[0]['COUNT(ITEM_ID)']});
  })
}

export const setSelectedAllItem = (IS_SELECTED, IS_CHECKED) => {
  return axios.post(host + '/set_selected_all_item', {
    IS_SELECTED,
    IS_CHECKED
  }).then(res => {
    store.dispatch({ type : actionTypes.REFRESH_STATE})
    store.dispatch({ type: actionTypes.REFRESH_COUNT})
  })
}

export const setChecked_ItemSelected = () => {
  return axios.post(host + '/set_state_item_selected').then(res => {
    store.dispatch({ type : actionTypes.REFRESH_STATE})
    store.dispatch({ type: actionTypes.REFRESH_COUNT})
  })
}

export const delete_ItemSelected = () => {
  return axios.post(host + '/delete_item_selected').then(res => {
    store.dispatch({ type : actionTypes.REFRESH_STATE})
    store.dispatch({ type: actionTypes.REFRESH_COUNT})
  })
}

export const rollback = () => {
  return axios.post(host +'/rollback').then(res => {
    store.dispatch({ type: actionTypes.REFRESH_STATE})
  })
}

export const start_transaction = () => {
  return axios.post(host +'/start_transaction');
}

export const commit = () => {
  return axios.post(host +'/commit').then(res => {
    store.dispatch({ type: actionTypes.REFRESH_STATE})
  })
}