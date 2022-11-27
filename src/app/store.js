import {configureStore} from "@reduxjs/toolkit"
import userReducer from '../feature/userSlice'
import walletReducer from '../feature/walletSlice'

export default configureStore({
    reducer: {
        user: userReducer,
        wallet: walletReducer,
    },
});