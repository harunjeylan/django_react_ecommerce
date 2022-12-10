import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createSlice } from "@reduxjs/toolkit";

//https://varkala-react-2.vercel.app/
//https://prium.github.io/phoenix/v1.6.0/
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints: (builder) => ({
    getAllusers: builder.query({ query: () => "users/" }),
    getusersDetailes: builder.query({
      query: ({ userId }) => `users/${userId}`,
    }),

    addUser: builder.mutation({
      query: ({ post }) => ({
        url: `users/add`,
        method: "POST",
        body: post,
      }),
    }),
  }),
});

export const {
  useGetAllusersQuery,
  useGetusersDetailesQuery,
  useAddUserMutation,
} = userApi;

const initialState = {
  user: [1],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: async (state, action) => {
      state.user = [...state.user, action.payload.product];
    },

    logout: (state, action) => {
      state.user = state.user.filter(
        (product) => product.id !== action.payload.product.id
      );
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
