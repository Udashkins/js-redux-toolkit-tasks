import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { actions as usersActions } from "./usersSlice.js";
import { actions as postsActions } from "./postsSlice.js";

const commentsAdapter = createEntityAdapter();

const initialState = commentsAdapter.getInitialState();

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComments: commentsAdapter.addMany,
    addComment: commentsAdapter.addOne,
  },
  // BEGIN (write your solution here)
  extraReducers: (builder) => {
    // Удаление комментариев при удалении пользователя
    builder.addCase(usersActions.removeUser, (state, { payload }) => {
      const allComments = commentsAdapter.getSelectors().selectAll(state);
      const userCommentsIds = allComments
        .filter((comment) => comment.author === payload)
        .map((comment) => comment.id);
      
      commentsAdapter.removeMany(state, userCommentsIds);
    });
    
    // Удаление комментариев при удалении поста
    builder.addCase(postsActions.removePost, (state, { payload }) => {
      commentsAdapter.removeMany(state, payload.comments);
    });
  },
  // END
});

export const { actions } = commentsSlice;
export const selectors = commentsAdapter.getSelectors(
  (state) => state.comments
);
export default commentsSlice.reducer;
