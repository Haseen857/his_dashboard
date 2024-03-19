// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk";
// import rootReducer from "./Reducers";

// const initStore = (initialState = {}) => {
//   return createStore(rootReducer, initialState, applyMiddleware(thunk));
// };

// export default initStore;

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./Reducers";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
