import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
      },
      prepare: (title) => {
        return {
          payload: {
            id: Date.now(),
            title,
            status: 'new',
            createAt: new Date().toISOString(),
          },
        };
      },
    },
  },
});

export const { addTodo } = todoSlice.actions;
export default todoSlice.reducer;
