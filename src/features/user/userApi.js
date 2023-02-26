import apiSlice from "../api/apiSlice";


const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addUser: builder.mutation({
            query: ({ data }) => ({
                url: `/users`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['user', 'newPeople']
        }),
        newPeople: builder.query({
            query: (email) => `/new-people?email=${email}`,
            providesTags: ['newPeople']
        }),
        findPeople: builder.query({
            query: (email) => `/find-people?email=${email}`,
        }),
        getUser: builder.query({
            query: (email) => `/user?email=${email}`,
            providesTags: ['user', 'profileImageUpdated']
        }),
        getUserByUsername: builder.query({
            query: (username) => `/profile?username=${username}`
        }),
        updateUserProfile: builder.mutation({
            query: ({ id, data }) => ({
                url: `/update-profile/${id}`,
                method: 'POST',
                body: data
            })
        }),
        updateUserProfilePhoto: builder.mutation({
            query: ({ id, data }) => ({
                url: `/update-profile-photo/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['profileImageUpdated']
        }),
        updateUserCoverPhoto: builder.mutation({
            query: ({ id, data }) => ({
                url: `/update-cover-photo/${id}`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['profileImageUpdated']
        }),
    })
})

export const { useAddUserMutation, useGetUserQuery, useUpdateUserProfileMutation, useUpdateUserProfilePhotoMutation, useFindPeopleQuery, useNewPeopleQuery, useGetUserByUsernameQuery, useUpdateUserCoverPhotoMutation } = userApi;