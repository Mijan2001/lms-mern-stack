import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    iaAuthenticated: false
};

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            console.log('first action : ', action);
            state.user = action.payload.user;
            state.iaAuthenticated = true;
        },
        userLoggedOut: state => {
            state.user = null;
            state.iaAuthenticated = false;
        }
    }
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
