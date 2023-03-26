import {applyMiddleware, combineReducers, compose, legacy_createStore} from "redux";
import { reducer } from "./reducer";
import {persistStore,persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig={
    key:"Task_Planner",storage
}
const composeEnhancers=window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_||compose;
const rootReducer=combineReducers({reducer});
const persistedReducer=persistReducer(persistConfig,rootReducer);

const store=legacy_createStore(persistedReducer);
export{store};

const persistor=persistStore(store);
export{persistor};
