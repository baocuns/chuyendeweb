import { createSlice } from '@reduxjs/toolkit'

const apiSlice = createSlice({
    name: 'api',
    initialState: {
        api: {
            currentApi: null,
            isFetching: false,
            error: false,
        }
    },
    reducers: {
        callApiStart: (state) => {
            state.api.isFetching = true
        },
        callApiSuccess: (state, action) => {
            state.api.isFetching = false
            state.api.currentApi = action.payload
            state.api.error = false
        },
        callApiFailed: (state, action) => {
            state.api.isFetching = false
            state.api.currentApi = action.payload
            state.api.error = true
        },
        callApiClear: (state) => {
            state.api.isFetching = false
            state.api.currentApi = null
            state.api.error = false
        }
    }
})

export const {
    callApiStart,
    callApiSuccess,
    callApiFailed,
    callApiClear,
} = apiSlice.actions

export default apiSlice.reducer