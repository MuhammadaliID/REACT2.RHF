
import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// GET
export let userData = createAsyncThunk("users/userData",
    async () => {
        let { data } = await axios.get("https://6a56fbf4b17de7bebbdeaff0.mockapi.io/PEOPLE");
        return data;
    }
);

// DELETE
export let deleteUser = createAsyncThunk("users/deleteUser",
    async (id) => {
        await axios.delete(`https://6a56fbf4b17de7bebbdeaff0.mockapi.io/PEOPLE/${id}`);
        return id;
    }
);

// ADD
export let addUser = createAsyncThunk("users/addUser",
    async (user) => {
        let { data } = await axios.post("https://6a56fbf4b17de7bebbdeaff0.mockapi.io/PEOPLE", user);
        return data;
    }
);

let initialState = {
    data: [],
    loading: false
};

// SLICE
let userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            // GET
            .addCase(userData.pending, (state) => {
                state.loading = true;
            })
            .addCase(userData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(userData.rejected, (state) => {
                state.loading = false;
            })

            // DELETE
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.data = state.data.filter((elem) => elem.id !== action.payload);
            })

            // ADD
            .addCase(addUser.fulfilled, (state, action) => {
                state.data.push(action.payload);
            });
    },
});

// REDUCER
export default userSlice.reducer;

// STORE
export let store = configureStore({
    reducer: {
        users: userSlice.reducer
    }
});
