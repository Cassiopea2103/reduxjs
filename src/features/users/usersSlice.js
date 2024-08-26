import { createSlice , createAsyncThunk } from '@reduxjs/toolkit' ; 
import axios from 'axios' ; 

// initial state data : 
const initialState = []
const USERS_URL = 'https://jsonplaceholder.typicode.com/users' ;

// fetch users thunk : 
export const fetchUsers = createAsyncThunk ( "users/fetchUsers" , async () => {
    
    try {
        const response = await axios.get ( USERS_URL ) ; 
        return response.data ; 
    }
    catch ( error ) {
        console.log ( error ) ; 
    }
})


const usersSlice = createSlice ( 
    {
        name : "users" , 
        initialState , 
        reducers : {

        } , 

        extraReducers ( builder ) {
            builder
                .addCase ( 
                    fetchUsers.fulfilled , 
                    ( state , action ) => {
                        return action.payload  
                    }
                 )
        }
    }
)


// export data state : 
export const selectAllUsers = state => state.users ; 

// get a user by ID : 
export const selectUserById = ( state , userId ) => state.users.find ( 
    user=> user.id == userId 
)

// export reducer : 
export default usersSlice.reducer ; 