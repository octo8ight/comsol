// import { createStore } from 'redux'
import {createSlice, configureStore} from '@reduxjs/toolkit';
import {AppState} from './store';
// import {composeWithDevTools} from "redux-devtools-extension";
import {rootReducer} from '../reducers';

// export const configureStore = (initialState: IRootState) => {
//     return createStore(rootReducer, initialState)
// }

export const auth = createSlice({
    name: 'auth',
    initialState: {
        auth: false,
        isAdmin: false,
        token: ""
    },
    reducers: {
        setAuthState(state, action) {
            state.auth = action.payload.auth;
            state.isAdmin = action.payload.isAdmin;
            state.token = action.payload.token
        }
    }
});

const store = configureStore({
    reducer: {
        auth: auth.reducer
    }
});

// export default store;
export const authState = (state: AppState) => state.auth;
export const { setAuthState } = auth.actions;
export default auth.reducer;