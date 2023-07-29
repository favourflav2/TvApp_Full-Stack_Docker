import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get_Liked_Tv, google_Sign, like_Tv, log_In, sign_Up } from "../api/authApi";

interface User {
  user_id: number;
  [key: string]: any;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: any;
  likedTv:Array<any> 
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: "",
  likedTv:[]
};

export const signUp = createAsyncThunk(
  "signup",
  async ({ formData, toast, navigate }: any, { rejectWithValue }) => {
    try {
      const res = await sign_Up(formData);

      toast.success("Signed up successfully");
      navigate("/");

      return res.data;
    } catch (e: any) {
      return rejectWithValue(e.response.data.msg);
    }
  }
);

export const logIn = createAsyncThunk(
  "login",
  async ({ formData, toast, navigate }: any, { rejectWithValue }) => {
    try {
      const res = await log_In(formData);

      toast.success("Logged In successfully");
      navigate("/");

      return res.data
    } catch (e: any) {
      return rejectWithValue(e.response.data.msg);
    }
  }
);

export const googleSignIn = createAsyncThunk(
    "google",
    async ({ formData, toast, navigate }: any, { rejectWithValue }) => {
        try{
            const res = await google_Sign(formData)

            toast.success("Logged In successfully");
            navigate("/");
      
            return res.data

        }catch(e:any){
            return rejectWithValue(e.response.data.msg);
        }
    }
)

export const likeTv = createAsyncThunk(
    "like",
    async ({ name, showId, imgPath }: any, { rejectWithValue }) => {
        try{
            const res = await like_Tv({name,showId,imgPath})

            
            return res.data

        }catch(e:any){
            return rejectWithValue(e.response.data.msg);
        }
    }
)

export const getLikedTv = createAsyncThunk(
    "getLike",
    async (_, { rejectWithValue }) => {
        try{
            const res = await get_Liked_Tv()

            return res.data

        }catch(e:any){
            return rejectWithValue(e.response.data.msg);
        }
    }
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setError: (state) => {
      state.error = "";
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder

      // SIGN UP
      .addCase(signUp.pending, (state) => {
        state.loading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUp.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })


      // Login
      .addCase(logIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(logIn.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(googleSignIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(googleSignIn.fulfilled, (state, action) => {
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleSignIn.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })


      // Like Tv
      .addCase(likeTv.pending, (state) => {
        state.loading = true;
      })
      .addCase(likeTv.fulfilled, (state, action) => {
        state.loading = false;
        state.likedTv = action.payload;
      })
      .addCase(likeTv.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })

      // get Like Tv
      .addCase(getLikedTv.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikedTv.fulfilled, (state, action) => {
        state.loading = false;
        state.likedTv = action.payload;
      })
      .addCase(getLikedTv.rejected, (state, action) => {
        //console.log(action);
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default authSlice.reducer;

export const { setError, setUser, setLogout } = authSlice.actions;
