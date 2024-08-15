import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'path/to/api/user/'}),

  endpoints: (builder) => ({
    userReg: builder.mutation({
      query: (user) => ({
        url: 'reg',
        method: 'POST',
        body: user,
        headers: {
          'Content-type': 'application/json',
        },
      }),
    }),
    userLogin: builder.mutation({
      query: (user) => ({
        url: 'login',
        method: 'POST',
        body: user,
        headers: {
          'Content-type': 'application/json',
        },
      }),
    }),

    getLoggedUser: builder.query({
      query: (session) => ({
        url: `/log-out`,
        method: 'GET',
        headers: {
          'Cookie': `session=${session}`, 
        },
      }),
    }),
  }),
});

export const {useUserRegMutation,useUserLoginMutation,useGetLoggedUserQuery} = authApi;


