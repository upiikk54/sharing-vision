import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";
import axios from "axios";

const local_url = "http://localhost:8811";

// Thunk untuk mengambil semua kategori
export const getAllPosts = createAsyncThunk(
    'admin/getAllPosts',
    async ({ limit, offset }) => {
        try {
            const response = await axios({
                method: "GET",
                url: `${local_url}/article/${limit}/${offset}`,
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
                params: {
                    limit,
                    offset
                }
            })
            return response.data;
        } catch (error) {
            return {
                error: error.response ? error.response.data : 'Network error'
            }
        }
    }
);

// Thunk untuk mengambil posts berdasarkan ID
export const getPostById = createAsyncThunk(
    'admin/getPostById',
    async (id) => {
        try {
            const response = await axios({
                method: "GET",
                url: `${local_url}/article/${id}`,
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                }
            })
            return response.data;
        } catch (error) {
            return {
                error: error.response ? error.response.data : 'Network error'
            }
        }
    }
);

// Thunk Create Post
export const createPost = createAsyncThunk(
    'admin/Post',
    async (postPayload) => {
        try {
            const response = await axios({
                method: "POST",
                data: postPayload,
                url: `${local_url}/article/`,
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Access-Control-Allow-Credentials": true
                }
            })
            return response.data;
        } catch (error) {
            return error.response.data
        }
    }
);

//Thunk Update Posts
export const updatePost = createAsyncThunk(
    'admin/updatePost',
    async ({ postId, posts }) => {
        try {
            const response = await axios({
                method: "PUT",
                url: `${local_url}/article/${postId}`,
                data: posts,
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Access-Control-Allow-Credentials": true
                }
            })
            return response.data;
        } catch (error) {
            return error.response.data
        }
    }
);

//Thunk Delete Category
export const deletePostById = createAsyncThunk(
    'admin/deletePostById',
    async (postId) => {
        try {
            const response = await axios({
                method: "DELETE",
                url: `${local_url}/article/${postId}`,
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                    "Access-Control-Allow-Credentials": true
                }
            })
            return response.data;
        } catch (error) {
            return error.response.data
        }
    }
);

const initialState = {
    getDataPostAll: [],
    getDataPostById: null,
    error: null,
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    extraReducers: (builder) => {
        // Handle getAllCategory
        builder
            .addCase(getAllPosts.pending, (state) => {
                return {
                    ...state,
                    error: null // Reset error ketika loading dimulai
                };
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                return {
                    ...state,
                    getDataPostAll: action.payload?.data?.posts || []
                };
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                return {
                    ...state,
                    error: action.payload?.error || 'Failed to load Posts',
                };
            });

        // Handle getPostById
        builder
            .addCase(getPostById.pending, (state) => {
                return {
                    ...state,
                    error: null,
                };
            })
            .addCase(getPostById.fulfilled, (state, action) => {
                return {
                    ...state,
                    getDataPostById: action.payload.data ? action.payload.data.posts : null,
                };
            })
            .addCase(getPostById.rejected, (state, action) => {
                return {
                    ...state,
                    error: action.payload ?.error || 'Failed to fetch posts by ID',
                };
            });

        // Handle Create Posts
        builder
            .addCase(createPost.pending, (state) => {
                return {
                    ...state,
                };
            })
            .addCase(createPost.fulfilled, (state) => {
                return {
                    ...state,
                };
            })
            .addCase(createPost.rejected, (state) => {
                return {
                    ...state,
                };
            });

        // Handle Update Posts
        builder
            .addCase(updatePost.pending, (state) => {
                return {
                    ...state,
                };
            })
            .addCase(updatePost.fulfilled, (state) => {
                return {
                    ...state,
                };
            })
            .addCase(updatePost.rejected, (state) => {
                return {
                    ...state,
                };
            });

        // Handle Delete Posts
        builder
            .addCase(deletePostById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePostById.fulfilled, (state, action) => {
                state.loading = false; 
                state.getDataPostAll = state.getDataPostAll.filter(
                    post => post.id !== action.payload.id
                );
            })
            .addCase(deletePostById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Failed to delete post';
            });
    }
});

export default adminSlice.reducer;