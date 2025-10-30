// features/auth/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios"; // Adjust path if needed

// 1. Send OTP
export const sendOtp = createAsyncThunk(
  "auth/sendOtp",
  async (email, thunkAPI) => {
    try {
      const response = await api.post("/api/v1/auth/otp/request", { email });
      return response.data;
    } catch (error) {
      console.error("Error sending OTP:", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to send OTP",
      );
    }
  },
);

// 2. Verify OTP
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, thunkAPI) => {
    try {
      const response = await api.post("/api/v1/auth/otp/verify", {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  },
);

// 3. Register after OTP verified
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, thunkAPI) => {
    try {
      const response = await api.post("/api/v1/auth/signup", {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

// 4. Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await api.post("/api/v1/auth/signin", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);

// Fetch current user (/me)
export const fetchMe = createAsyncThunk(
  "auth/fetchMe",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/api/v1/user/me", { withCredentials: true });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch user"
      );
    }
  }
);

// Logout thunk
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await api.post("/api/v1/auth/logout");
      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

// Upload Avatar
export const uploadAvatar = createAsyncThunk(
  "auth/uploadAvatar",
  async (file, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await api.post("/api/v1/user/upload-avatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data.url;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.error || "Failed to upload avatar"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "Not Available",
    isAuthenticated: false,
    error: null,
    otpSent: false,
    otpVerified: false,
    avatarUploadUrl: "",
    avatarUploadStatus: "idle",
    avatarUploadError: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    resetAuthStatus: (state) => {
      state.status = "Not Available";
      state.error = null;
      state.otpSent = false;
      state.otpVerified = false;
    },
    resetError: (state) => {
      state.error = null;
    },
    resetAvatarUpload: (state) => {
      state.avatarUploadUrl = "";
      state.avatarUploadStatus = "idle";
      state.avatarUploadError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // OTP Sending
      .addCase(sendOtp.fulfilled, (state) => {
        state.otpSent = true;
        state.error = null;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.otpSent = false;
        state.error = action.payload;
      })

      // OTP Verification
      .addCase(verifyOtp.fulfilled, (state) => {
        state.otpVerified = true;
        state.error = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpVerified = false;
        state.error = action.payload;
      })

      // Registration
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Login
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // Fetch current user
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        // state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Avatar Upload
      .addCase(uploadAvatar.pending, (state) => {
        state.avatarUploadStatus = "loading";
        state.avatarUploadError = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.avatarUploadStatus = "succeeded";
        state.avatarUploadUrl = action.payload;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.avatarUploadStatus = "failed";
        state.avatarUploadError = action.payload;
      });
  },
});

export const { logout, resetAuthStatus, resetError, resetAvatarUpload } = authSlice.actions;
export default authSlice.reducer;
