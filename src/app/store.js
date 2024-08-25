import { configureStore } from '@reduxjs/toolkit' ; 

// reducers : 
import postsReducer from "../features/posts/postsSlice" ; 


export const store = configureStore (
    {
        reducer : {
            posts : postsReducer ,
        }
    }
)
