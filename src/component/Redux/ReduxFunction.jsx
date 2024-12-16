import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import useAxios, { AxiosSource } from "../Hooks/useAxios";

const initialState = {
  user: null,
  token: null,
};

const CreateUser = createAsyncThunk("createUser", async ({ data }) => {
  const axiosLink = useAxios(AxiosSource);
  try {
    const res = await axiosLink.post("/users/register", data);
    return res.data;
  } catch (error) {
    console.log(error);
    const errMessage = error.response.data.message;
    throw errMessage;
  }
});

const LogInUser = createAsyncThunk("login", async ({ data }) => {
  const axiosLink = useAxios(AxiosSource);
  try {
    const res = await axiosLink.post("/auth/login", data);
    return res.data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError && error.response) {
      const errMessage = error.response.data.message;
      throw errMessage;
    }
  }
});

const GetUser = createAsyncThunk("getUser", async ({ rejectWithValue }) => {
  const axiosLink = useAxios(AxiosSource);
  try {
    const res = await axiosLink.get(`/auth/get-me`);
    return res.data;
  } catch (error) {
    console.log(error);
    const errMessage = error.response?.data?.message || "Something went wrong";
    return rejectWithValue(errMessage);
  }
});

export const userAuth = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: () => {},
});

export { CreateUser, LogInUser, GetUser };

export const { logOut, setUser, updateUser } = userAuth.actions;

export default userAuth.reducer;
