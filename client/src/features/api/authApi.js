import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn, userLoggedOut } from '../authSlice';
const VITE_API = import.meta.env.VITE_API;

const USER_API = `${VITE_API}/user/`;

console.log('usser_api ==== ', USER_API);

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include'
    }),
    endpoints: builder => ({
        registerUser: builder.mutation({
            query: inputData => ({
                url: 'register',
                method: 'POST',
                body: inputData
            })
        }),
        loginUser: builder.mutation({
            query: inputData => ({
                url: 'login',
                method: 'POST',
                body: inputData
            }),
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.log(error);
                }
            }
        }),

        logoutUser: builder.mutation({
            query: () => {
                return {
                    url: 'logout',
                    method: 'GET'
                };
            },
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        loadUser: builder.query({
            query: () => {
                return {
                    url: 'profile',
                    method: 'GET'
                };
            },
            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({ user: result.data.user }));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser: builder.mutation({
            query: fromData => {
                return {
                    url: 'profile/update',
                    method: 'PUT',
                    body: fromData,
                    credentials: 'include'
                };
            }
        })
    })
});

export const {
    useRegisterUserMutation,
    useLoadUserQuery,
    useLoginUserMutation,
    useLogoutUserMutation,
    useUpdateUserMutation
} = authApi;
