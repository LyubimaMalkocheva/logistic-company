import { API_STATES } from "../../common/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCustomer, deleteCustomerById, editCustomerById, getAllCustomers, getCustomerByEmail } from "../../common/fetchFunctions/fetchCustomers";

const initialState = {
  allCustomersData: [],
  status: API_STATES.IDLE,
};

export const getAllCustomersAsync = createAsyncThunk(
  "fetchAllCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAllCustomers();

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

export const deleteCustomerAsync = createAsyncThunk(
  "deleteCustomer",
  async (id, { rejectWithValue }) => {
    try {
      const result = await deleteCustomerById(id);

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

export const editCustomerAsync = createAsyncThunk(
  "editCustomer",
  async (updatedCustomer, { rejectWithValue }) => {
    try {
      const result = await editCustomerById(updatedCustomer);

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

export const createCustomerAsync = createAsyncThunk(
  "createCustomer",
  async (newCustomer, { rejectWithValue }) => {
    try {
      const result = await createCustomer(newCustomer);

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

const allCustomersSlice = createSlice({
  name: "customersData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCustomersAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        if (payload) {
          state.allCustomersData = payload;
        }
      })
      .addCase(getAllCustomersAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(getAllCustomersAsync.rejected, (state) => {
        state.status = API_STATES.REJECTED;
      })
      .addCase(deleteCustomerAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        state.allCustomersData = state.allCustomersData.filter(
          (eachData) => eachData.id !== payload?.id
        );
        // updateTableIndexes(state.logData);
      })
      .addCase(deleteCustomerAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(deleteCustomerAsync.rejected, (state) => {
        state.status = API_STATES.REJECTED;
      })
      .addCase(editCustomerAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        console.log('payload', payload);
        console.log('state.logData', state.allCustomersData);
        if (payload) {
          state.allCustomersData.splice(payload.dataIndex, 1, payload.updatedData);
        }
      })
      .addCase(editCustomerAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(editCustomerAsync.rejected, (state) => {
        state.status = API_STATES.REJECTED;
      });
  },
})

export const selectAllCustomers = (state) => state.customersData.allCustomersData;
export const selectAllCustomersStatus = (state) => state.customersData.status;

export default allCustomersSlice.reducer;