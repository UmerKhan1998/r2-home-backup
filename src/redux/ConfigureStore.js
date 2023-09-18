import { createStore, compose } from "redux";
import rootReducer from "./reducers/rootReducer";

export let store = createStore(
  rootReducer,
  typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    compose(window.__REDUX_DEVTOOLS_EXTENSION__())
);
