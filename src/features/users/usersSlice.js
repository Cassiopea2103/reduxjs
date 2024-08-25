import { createSlice } from '@reduxjs/toolkit' ; 


// initial state data : 
const initialState = [
    { id : 1 , name : "Lamine THIAW" } , 
    { id : 2 , name : "Serigne Saliou WADE" } , 
]


const usersSlice = createSlice ( 
    {
        name : "users" , 
        initialState , 
        reducers : {

        }
    }
)


// export data state : 
export const selectAllUsers = state => state.users ; 

// export reducer : 
export default usersSlice.reducer ; 