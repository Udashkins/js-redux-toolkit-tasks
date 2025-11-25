import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// BEGIN (write your solution here)
export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => 'api/tasks',
      providesTags: ['Task'],
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: 'api/tasks',
        method: 'POST',
        body: { text: task.text },
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `api/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
// END
