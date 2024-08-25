import { createSlice , nanoid } from '@reduxjs/toolkit' ; 


const initialState = [
    {
        id : 1 , 
        title : "Learning Redux js toolkit" , 
        body : "I have heard good things"
    } , 
    {
        id : 2 , 
        title : "Slices..." , 
        body : "The more I hear slices , the more I want pizza"
    }
]


const postsSlice = createSlice (
    {
        name : "posts" , 
        initialState , 
        reducers : {

            // add a new post : 
            addPost : {
                prepare ( title , body ) {
                    return {
                        payload : {
                            id : nanoid () , 
                            title , 
                            body 
                        }
                    }
                } ,

                reducer ( state , action ) {
                    state.push ( action.payload ) ; 
                }                 
            } ,

            
        }
    }
)

// export psots data state : 
export const  selectAllPosts = state => state.posts ;

// export reducer actions : 
export const { addPost } = postsSlice.actions 

//  export the posts slice reducer : 
export default postsSlice.reducer ;  