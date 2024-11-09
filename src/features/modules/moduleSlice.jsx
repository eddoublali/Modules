import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3003/modules';

// Fetch modules from JSON Server
export const fetchModules = createAsyncThunk('modules/fetchModules', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

// Add a new module to JSON Server
export const addModule = createAsyncThunk('modules/addModule', async (newModule) => {
  const response = await axios.post(API_URL, newModule);
  return response.data;
});

// Delete a module from JSON Server
export const deleteModule = createAsyncThunk('modules/deleteModule', async (moduleId) => {
  await axios.delete(`${API_URL}/${moduleId}`);
  return moduleId; // Return the id of the deleted module
});

// Update an existing module
export const updateModule = createAsyncThunk('modules/updateModule', async (updatedModule) => {
  const response = await axios.put(`${API_URL}/${updatedModule.id}`, updatedModule);
  return response.data;
});

const moduleSlice = createSlice({
  name: 'modules',
  initialState: { modules: [], status: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchModules.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.modules = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchModules.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addModule.fulfilled, (state, action) => {
        state.modules.push(action.payload);
      })
      .addCase(deleteModule.fulfilled, (state, action) => {
        // Remove the deleted module from the state
        state.modules = state.modules.filter((module) => module.id !== action.payload);
      })
      .addCase(updateModule.fulfilled, (state, action) => {
        // Update the module in the state with the updated data
        const index = state.modules.findIndex((module) => module.id === action.payload.id);
        if (index !== -1) {
          state.modules[index] = action.payload;
        }
      });
  },
});

export default moduleSlice.reducer;
