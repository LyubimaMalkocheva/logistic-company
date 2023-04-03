import { API_STATES } from "../../common/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createEmployee, deleteEmployeeById, editEmployeeById, getAllEmployees, getEmployeeByEmail, getEmployeeDrivers } from "../../common/fetchFunctions/fetchEmployees";

const initialState = {
  allEmployeesData: [],
  status: API_STATES.IDLE,
};

export const getAllEmployeesAsync = createAsyncThunk(
  "fetchAllEmployees",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getAllEmployees();

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

export const getEmployeeDriversAsync = createAsyncThunk(
  "fetchAllDrivers",
  async (_, { rejectWithValue }) => {
    try {
      const result = await getEmployeeDrivers();

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

export const deleteEmployeeAsync = createAsyncThunk(
  "deleteEmployee",
  async (id, { rejectWithValue }) => {
    try {
      const result = await deleteEmployeeById(id);

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

export const editEmployeeAsync = createAsyncThunk(
  "editEmployee",
  async (updatedEmployee, { rejectWithValue }) => {
    try {
      const result = await editEmployeeById(updatedEmployee);

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

export const createEmployeeAsync = createAsyncThunk(
  "createEmployee",
  async (newEmployee, { rejectWithValue }) => {
    try {
      const result = await createEmployee(newEmployee);

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

const allEmployeesSlice = createSlice({
  name: "employeesData",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployeesAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        if (payload) {
          state.allEmployeesData = payload;
        }
      })
      .addCase(getAllEmployeesAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(getAllEmployeesAsync.rejected, (state) => {
        state.status = API_STATES.REJECTED;
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        
        console.log('payload', payload);
        console.log('state.logData', state.allEmployeesData);
        state.allEmployeesData = state.allEmployeesData.filter(
          (eachData) => eachData.id !== payload?.id
        );
        // updateTableIndexes(state.logData);
      })
      .addCase(deleteEmployeeAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(deleteEmployeeAsync.rejected, (state) => {
        state.status = API_STATES.REJECTED;
      })
      .addCase(editEmployeeAsync.fulfilled, (state, { payload }) => {
        state.status = API_STATES.FULFILLED;
        console.log('payload', payload);
        console.log('state.logData', state.allEmployeesData);
        if (payload) {
          state.allEmployeesData.splice(payload.dataIndex, 1, payload.updatedData);
        }
      })
      .addCase(editEmployeeAsync.pending, (state) => {
        state.status = API_STATES.PENDING;
      })
      .addCase(editEmployeeAsync.rejected, (state) => {
        state.status = API_STATES.REJECTED;
      });
  },
})
export const selectAllEmployees = (state) => state.employeesData.allEmployeesData;
export const selectAllEmployeesStatus = (state) => state.employeesData.status;

export default allEmployeesSlice.reducer;