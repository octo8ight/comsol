interface IinitalState {
    auth: boolean,
    isAdmin: boolean
}

const initialState: IinitalState = {
    auth: false,
    isAdmin: false
}

export type AuthState = typeof initialState;

interface ItypeState {
    SIGN_ADDRESS: string,
    SIGN_OUT: string
}

export const type: ItypeState = {
    SIGN_ADDRESS: "SIGN_ADDRESS",
    SIGN_OUT: "SIGN_OUT"
}

export const AuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case type.SIGN_ADDRESS:
            return {
                ...state,
                auth: state.auth,
                isAdmin: state.isAdmin
            }
        case type.SIGN_OUT:
            return {
                ...state,
                auth: false,
                isAdmin: false
            }
        default:
            return state;
    }
}