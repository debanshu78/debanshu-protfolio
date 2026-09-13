import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Thunk to fetch all skills
export const fetchSkills = createAsyncThunk(
  "skills/fetchSkills",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/v1/skills/getAll");
      return response.data.skills;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch skills"
      );
    }
  }
);

// Thunk to upvote a skill
export const upvoteSkill = createAsyncThunk(
  "skills/upvoteSkill",
  async (skillId, thunkAPI) => {
    try {
      const response = await api.post("/api/v1/skills/upvote", { skillId });
      return response.data.skill;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Upvote failed"
      );
    }
  }
);

// Thunk to downvote a skill
export const downvoteSkill = createAsyncThunk(
  "skills/downvoteSkill",
  async (skillId, thunkAPI) => {
    try {
      const response = await api.post("/api/v1/skills/downvote", { skillId });
      return response.data.skill;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Downvote failed"
      );
    }
  }
);

const skillsSlice = createSlice({
  name: "skills",
  initialState: {
    skills: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(upvoteSkill.fulfilled, (state, action) => {
        const idx = state.skills.findIndex(s => s._id === action.payload._id);
        if (idx !== -1) state.skills[idx] = action.payload;
      })
      .addCase(upvoteSkill.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(downvoteSkill.fulfilled, (state, action) => {
        const idx = state.skills.findIndex(s => s._id === action.payload._id);
        if (idx !== -1) state.skills[idx] = action.payload;
      })
      .addCase(downvoteSkill.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default skillsSlice.reducer;