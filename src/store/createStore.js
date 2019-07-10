import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import shoppingReducer from "./reducers/shoppingReducer";
import statesortReducer from "./reducers/statesortReducer";

const rootReducer = combineReducers({
  sort: statesortReducer,
  list: shoppingReducer
});

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const enhancer = composeEnhancers();
// applyMiddleware(...middleware),
// other store enhancers if any
const store = createStore(rootReducer, enhancer);
export default store;
