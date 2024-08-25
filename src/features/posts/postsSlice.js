import { createSlice , nanoid } from '@reduxjs/toolkit' ; 
import { sub } from 'date-fns' ; 

const initialState = [
    {
        id : 1 , 
        title : "Learning Redux js toolkit" , 
        body : "I have heard good things" , 
        date : sub ( new Date () , { minutes : 13 } ).toISOString () ,
        reactions : {
                        like : 0 , 
                        love : 0 , 
                        funny : 0 , 
                        insightful : 0, 
                        congrats : 0
                    }
    } , 
    {
        id : 2 , 
        title : "Slices..." , 
        body : "The more I hear slices , the more I want pizza" , 
        date : sub ( new Date () , { minutes : 7 } ).toISOString () ,
        reactions : {
                        like : 0, 
                        love : 0 , 
                        funny : 0 , 
                        insightful : 0, 
                        congrats : 0
                    }
    }
]


const postsSlice = createSlice (
    {
        name : "posts" , 
        initialState , 
        reducers : {

            // add a new post : 
            addPost : {
                prepare ( userId , title , body ) {
                    return {
                        payload : {
                            id : nanoid () , 
                            userId , 
                            title , 
                            body , 
                            date : new Date ().toISOString () ,
                            reactions : {
                                like : 0 , 
                                love : 0 , 
                                funny : 0 , 
                                insightful : 0, 
                                congrats : 0
                            }
                        }
                    }
                } ,

                reducer ( state , action ) {
                    state.push ( action.payload ) ; 
                }                 
            } ,

            addReaction ( state , action ) {
                // retrieve postId and reaction  from payload : 
                const { postId , reactionName } = action.payload ; 

                // find the given id post : 
                const foundPost = state.find ( post => post.id == postId ) ; 

                // update found post reaction count : 
                if ( foundPost ) {
                    foundPost.reactions [ reactionName ]++ ; 
                }
            }
        }
    }
)

// export psots data state : 
export const  selectAllPosts = state => state.posts ;

// export reducer actions : 
export const { addPost , addReaction } = postsSlice.actions 

//  export the posts slice reducer : 
export default postsSlice.reducer ;  