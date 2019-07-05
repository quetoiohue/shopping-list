import { createStore, combineReducers } from "redux";
import shoppingReducer from "./reducers/shoppingReducer";
import statesortReducer from "./reducers/statesortReducer";

const rootReducer = combineReducers({
  sort: statesortReducer,
  list: shoppingReducer,
});

const store = createStore(rootReducer, {});
console.log(store.getState());
export default store;