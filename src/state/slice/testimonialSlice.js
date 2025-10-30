import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

// Thunk to create a testimonial
export const createTestimonial = createAsyncThunk(
  "testimonial/createTestimonial",
  async (data, thunkAPI) => {
    try {
      const response = await api.post("/api/v1/testimonials/create", data);
      return response.data.testimonial;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to submit testimonial"
      );
    }
  }
);

// Thunk to fetch latest testimonials per user
export const fetchLatestTestimonialsPerUser = createAsyncThunk(
  "testimonial/fetchLatestTestimonialsPerUser",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/v1/testimonials/getLatestPerUser");
      return response.data.testimonials;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to fetch testimonials"
      );
    }
  }
);

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    testimonials: [],
    status: "idle",
    error: null,
    success: false,
  },
  reducers: {
    resetTestimonialState: (state) => {
      state.testimonials = [];
      state.status = "idle";
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTestimonial.pending, (state) => {
        state.status = "loading";
        state.error = null;
        state.success = false;
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.testimonials.push(action.payload);
        state.success = true;
      })
      .addCase(createTestimonial.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.success = false;
      })
      .addCase(fetchLatestTestimonialsPerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchLatestTestimonialsPerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.testimonials = action.payload;
      })
      .addCase(fetchLatestTestimonialsPerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetTestimonialState } = testimonialSlice.actions;
export default testimonialSlice.reducer;