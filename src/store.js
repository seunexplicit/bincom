import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { FetchedDataReducer } from "./reducer/polling.reducer";
import { LGADataReducer } from "./reducer/lga.reducer";

const initialState = {};

const reducer = combineReducers({
	pollingReducer: FetchedDataReducer,
	LGADataReducer: LGADataReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
