import { createSlice } from '@reduxjs/toolkit' ; 


const initialState = [
    {
        id : 1 , 
        title : "Learning Redux js toolkit" , 
        content : "I have heard good things"
    } , 
    {
        id : 2 , 
        title : "Slices..." , 
        content : "The more I hear slices , the more I want pizza"
    }
]


const postsSlice = createSlice (
    {
        name : "posts" , 
        initialState , 
        reducers : {

        }
    }
)

// export psots data state : 
export const  selectAllPosts = state => state.posts ;

//  export the posts slice reducer : 
export default postsSlice.reducer ;  