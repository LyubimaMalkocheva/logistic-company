import { API_STATES } from "../../common/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPackage, deletePackageById, editPackageById, getAllPackages } from "../../common/fetchFunctions/fetchPackages";

const initialState = {
  allPackagesData: [],
  status: API_STATES.IDLE,
};

export const getAllPackagesAsync = createAsyncThunk(
  "fetchAllPackages",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAllPackages();

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

export const deletePackageAsync = createAsyncThunk(
  "deletePackage",
  async (id, { rejectWithValue }) => {
    try {
      const result = await deletePackageById(id);

      if (result.error) {
        console.log("error", result.error);
        return rejectWithValue(result.error);
      } else {
        console.log("delete package", result.response);
        return result.response;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editPackageAsync = createAsyncThunk(
  "editPackage",
  async (updatedPackage, { rejectWithValue }) => {
    try {
      const result = await editPackageById(updatedPackage);

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

export const createPackageAsync = createAsyncThunk(
  "createPackage",
  async (newPackage, { rejectWithValue }) => {
    try {
      const result = await createPackage(newPackage);

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

const allPackagesSlice = createSlice({
  name: "packagesData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllPackagesAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        
        console.log('payload', payload);
        console.log('state.logData', state.allPackagesData);
        if (payload) {
          state.allPackagesData = payload;
        }
      })
      .addCase(getAllPackagesAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(getAllPackagesAsync.rejected, (state) => {
        state.status = API_STATES.REJECTED;
      })
      .addCase(deletePackageAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        
        console.log('payload', payload);
        console.log('state.logData', state.allPackagesData);
        state.allPackagesData = state.allPackagesData.filter(
          (eachData) => eachData.id !== payload?.id
        );
        // updateTableIndexes(state.logData);
      })
      .addCase(deletePackageAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(deletePackageAsync.rejected, (state) => {
        state.status = API_STATES.REJECTED;
      })
      .addCase(editPackageAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        console.log('payload', payload);
        console.log('state.logData', state.allPackagesData);
        // if (payload) {
        //   state.logData.splice(payload.dataIndex, 1, payload.updatedData);
        // }
      })
      .addCase(editPackageAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(editPackageAsync.rejected, (state) => {
        state.status = API_STATES.REJECTED;
      });
  },
})

export const selectAllPackages = (state) => state.packagesData.allPackagesData;
export const selectAllPackagesStatus = (state) => state.packagesData.status;

export default allPackagesSlice.reducer;