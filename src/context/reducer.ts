import { IData } from "./context"

const Reducer = (state: IData, action: { type: string, payload: any }) => {
    switch (action.type) {

        case 'LOGIN':
            state.userDetails = action.payload
            state.loading = false
            return { ...state }

        case 'LOGOUT':
            // state.userDetails = null
            state.loading = false
            return { ...state }

        case 'SET_LOADING':
            state.loading = action.payload
            return { ...state }

        default:
            return state
    }
}
export default Reducer