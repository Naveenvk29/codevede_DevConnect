import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constant";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/register`,
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
    fetchUserProfile: builder.query({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateUserProfile: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/profile`,
        method: "PUT",
        body: userData,
        credentials: "include",
      }),
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: `${USER_URL}/profile`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    verifyEmail: builder.query({
      query: () => ({
        url: `${USER_URL}/verify-email`,
        method: "GET",
        credentials: "include",
      }),
    }),
    forgetPassword: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/forgot-password`,
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
    resetPassword: builder.mutation({
      query: (userData) => ({
        url: `${USER_URL}/reset-password`,
        method: "POST",
        body: userData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useFetchUserProfileQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
  useVerifyEmailQuery,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = userApi;
