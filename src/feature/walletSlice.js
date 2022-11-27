import { createSlice } from '@reduxjs/toolkit';

export const walletSlice = createSlice({
    name: 'wallet',
    initialState:{
        wallet:null,
    },
    reducers:{
        // login:(state,action)=>{
        //     state.user = action.payload
        // },
        // logout:(state)=>{
        //     state.user = null;
        // },
        // signup:(state,action)=>{
        //     state.user = [...state.user,action.payload];
        // },
        saveInfo: (state, action) => {
            state.wallet = action.payload
        }
    }
})

export const{ saveInfo } = walletSlice.actions;
export const selectWallet = (state) => state.wallet.wallet;
export default walletSlice.reducer