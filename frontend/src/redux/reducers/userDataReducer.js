import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_STATES } from "../../common/constants";
import { getCustomerByEmail } from "../../common/fetchFunctions/fetchCustomers";
import { getEmployeeByEmail } from "../../common/fetchFunctions/fetchEmployees";

const initialState = {
  value: {
    email: "",
    password: "",
    type: "",
  },
  errorMessage: "",
  loginStatus: API_STATES.IDLE,
};

export const getCustomerByEmailAsync = createAsyncThunk(
  "fetchCustomerByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const result = await getCustomerByEmail(email);

      if (result.error) {
        return rejectWithValue(result.error);
      } else {
        return result.response;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getEmployeeByEmailAsync = createAsyncThunk(
  "fetchEmployeeByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const result = await getEmployeeByEmail(email);

      if (result.error) {
        return rejectWithValue(result.error);
      } else {
        return result.response;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const userDataSlice = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {
    logout(state) {
      state.value = {
        email: "",
        password: "",
        type: "",
      };
      state.errorMessage = "";
      state.loginStatus = API_STATES.IDLE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerByEmailAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        state.errorMessage = "";

        console.log("payload.response", payload.response);
        console.log("payload", payload);
        state.value = {
          email: payload.email,
          password: payload.password,
          type: "customer",
        };
      })
      .addCase(getCustomerByEmailAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(getCustomerByEmailAsync.rejected, (state, { payload }) => {
        state.loginStatus = API_STATES.REJECTED;
        state.errorMessage = payload;
      })
      .addCase(getEmployeeByEmailAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        console.log("payload.response", payload);
        console.log("payload", payload);
        state.errorMessage = "";
        state.value = {
          email: payload.email,
          password: payload.password,
          type: "employee",
        };
      })
      .addCase(getEmployeeByEmailAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(getEmployeeByEmailAsync.rejected, (state, { payload }) => {
        state.loginStatus = API_STATES.REJECTED;
        state.errorMessage = payload;
      });
  },
});

export const selectUserData = (state) => state.userData.value;
export const selectLoginStatus = (state) => state.userData.loginStatus;

export const { logout } = userDataSlice.actions;

export default userDataSlice.reducer;
