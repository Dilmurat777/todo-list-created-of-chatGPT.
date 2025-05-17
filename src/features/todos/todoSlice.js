import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('tasks');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
    return undefined;
  }
};

const initialState = {
  tasks: loadFromLocalStorage() || [],
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.tasks.push(action.payload);
      },
      prepare: (title, priority = 'medium') => {
        return {
          payload: {
            id: Date.now(),
            title,
            status: 'new',
            createAt: new Date().toISOString(),
            priority,
          },
        };
      },
    },
    updateTodo: (state, action) => {
      const { id, title } = action.payload;
      const existingTask = state.tasks.find((task) => task.id === id);
      if (existingTask) {
        existingTask.title = title;
      }
    },
    deleteTodo: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleStatus: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        if (task.status === 'new') task.status = 'inProgress';
        else if (task.status === 'inProgress') task.status = 'completed';
        else task.status = 'new';
      }
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, toggleStatus } = todoSlice.actions;
export default todoSlice.reducer;
