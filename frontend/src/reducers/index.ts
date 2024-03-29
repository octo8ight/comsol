import { combineReducers } from 'redux';
import { AuthReducer, AuthState } from './auth.reducer';

export interface IRootState {
    auth: AuthState
}

export const rootReducer = combineReducers({
    auth: AuthReducer
})