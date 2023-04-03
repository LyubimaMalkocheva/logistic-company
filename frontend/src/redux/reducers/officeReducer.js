import { API_STATES } from "../../common/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllOffices, getOfficeById } from "../../common/fetchFunctions/fetchOffice";

const initialState = {
  allOfficesData: [],
  status: API_STATES.IDLE,
};

export const getAllOfficesAsync = createAsyncThunk(
  "fetchAllOffices",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAllOffices();

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

export const getOfficeByIdAsync = createAsyncThunk(
  "fetchOfficeById",
  async (id, { rejectWithValue }) => {
    try {
      const result = await getOfficeById(id);

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


const allOfficesSlice = createSlice({
  name: "officesData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOfficesAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        
        console.log('payload', payload);
        console.log('state.logData', state.allOfficesData);
        if (payload) {
          state.allOfficesData = payload;
        }
      })
      .addCase(getAllOfficesAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(getAllOfficesAsync.rejected, (state) => {
        state.status = API_STATES.REJECTED;
      })
  },
})
export const selectAllOffices = (state) => state.officesData.allOfficesData;
export const selectAllOfficesStatus = (state) => state.officesData.status;

export default allOfficesSlice.reducer;