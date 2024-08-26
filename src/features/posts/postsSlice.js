import { createSlice , createSelector , createAsyncThunk , createEntityAdapter} from '@reduxjs/toolkit' ; 
import axios from 'axios';
import { sub } from 'date-fns' ; 


const postsAdapter = createEntityAdapter ( 
    {
        sortComparer : ( a , b ) => b.date.localeCompare ( a.date ) 
    }
)

const initialState = postsAdapter.getInitialState (
    {
        status : 'idle' , // idle | pending | success | failed 
        error : null , 
        count : 0 
    }
)

// API URL : 
const POSTS_URL = "https://jsonplaceholder.typicode.com/posts"

// function to fetch posts data : 
export const fetchPosts = createAsyncThunk ( "posts/fetchPosts" , async ( ) => {
    try {
        const response = await axios.get ( POSTS_URL ) ; 
        return  response.data  ;

    }
    catch ( error ) {
        console.log ( error ) ; 
    }
})

// create a new post : 
export const createPost = createAsyncThunk ( "posts/createPost" , async ( requestData ) => {
    const response = await axios.post ( POSTS_URL , requestData ) ; 
    return response.data  ; 
})

// update a post : 
export const updatePost = createAsyncThunk ( "posts/updatePost" , async ( requestData ) => {
    // retrieve the id from the request data : 
    const { id } = requestData ; 

    try {
        const response = await axios.put ( `${POSTS_URL}/${id}` , requestData ) ; 
        return response.data ;
    }
    catch ( error ) {
        console.log ( error ) ; 
    }
})


// delete a post : 
export const deletePost = createAsyncThunk ( "posts/deletePost" , async ( requestData ) => {
    // retrieve the id from the request data : 
    const { id } = requestData ; 

    const response = await axios.delete ( `${POSTS_URL}/${id}` ) ; 
    if ( response?.status == 200 ) {
        return requestData ;
    }
    else {
        return `${ response?.status } : ${ response?.statusText }`
    }
  
})


const postsSlice = createSlice (
    {
        name : "posts" , 
        initialState , 
        reducers : {

            // counter reducer : 
            increaseCount ( state , action ) {
                state.count += 1 ;
            },
            decreaseCount ( state , action ) {
                state.count -= 1 ; 
            },

            // add a new post : 
            addPost : {
                prepare ( userId , title , body ) {
                    return {
                        payload : {
                            id  , 
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
                    state.posts.push ( action.payload ) ; 
                }                 
            } ,

            addReaction ( state , action ) {
                // retrieve postId and reaction  from payload : 
                const { postId , reactionName } = action.payload ; 

                // find the given id post : 
                const foundPost = state.entities [ postId ] ; 

                // update found post reaction count : 
                if ( foundPost ) {
                    foundPost.reactions [ reactionName ]++ ; 
                }
            }
        } , 

        // handling posts fetch cases : 
        extraReducers ( builder ) {
            builder
                // pending request : 
                .addCase (
                    fetchPosts.pending , 
                    ( state , action ) => {
                        // set status : 
                        state.status = 'pending'  ;
                    }
                )
                .addCase ( 
                    fetchPosts.fulfilled  , 
                    ( state , action ) => {
                        // set status to succeeded : 
                        state.status = 'succeeded' ; 

                        // loop through fetched data :  
                        let min = 1 ; 
                        const fetchedData = action.payload.map ( 
                            fetchedPost => {

                                // append date field : 
                                fetchedPost.date = sub ( new Date () ,  { minutes : min ++ } ).toISOString () ; 
                                // append reactions to fetched data : 
                                fetchedPost.reactions = {
                                    like : 0 , 
                                    love : 0 , 
                                    funny : 0 , 
                                    insightful : 0, 
                                    congrats : 0
                                }

                                // return transformed post data : 
                                return fetchedPost ; 
                            }
                        )

                        // add fetched posts transformed data to the initial state : 
                        postsAdapter.upsertMany ( state , fetchedData ) ;  
                    }
                )
                .addCase (
                    fetchPosts.rejected , 
                    ( state , action ) => {
                        state.status = "failed" ; 
                        state.error = action.error.message ; 
                    }
                ) 

                .addCase ( 
                    createPost.fulfilled , 
                    ( state , action ) => {
                        // convert the user id to Number : 
                        action.payload.userId = Number ( action.payload.userId ) ; 
                        // append date to post : 
                        action.payload.date = new Date ().toISOString () ; 
                        // append reactions to new post : 
                        action.payload.reactions = {
                            like : 0 , 
                            love : 0 , 
                            funny : 0 , 
                            insightful : 0, 
                            congrats : 0
                        }

                        // add the new posts to the initial array : 
                        postsAdapter.addOne ( state , action.payload ) ; 
                    }
                )

                .addCase (
                    updatePost.fulfilled , 
                    ( state , action ) => {
                        if ( !action.payload.id ) {
                            console.log ( "Update  could not complete" ) ; 
                            return ;
                        }

                        // retrieve id from response : 
                        const { id } = action.payload ; 
                        // set date for post : 
                        action.payload.date = new Date().toISOString () ; 
                        // update the post and add it to the posts list : 
                        postsAdapter.upsertOne ( state , action.payload ) ;
                    }
                )
                .addCase (
                    deletePost.fulfilled , 
                    ( state , action ) => {
                        if ( !action.payload.id ) {
                            console.log ( "Update  could not complete" ) ; 
                            return ;
                        }

                        // retrieve id from response : 
                        const { id } = action.payload ; 
                        // remove it :
                        postsAdapter.removeOne ( state , id ) ; 
                        
                    }
                )
        }
    }
)

// export count selection : 
export const getCount = state => state.posts.count ; 



//  fetching posts status : 
export const getFetchPostsStatus = state => state.posts.status ; 
// fetch posts error : 
export const getFetchPostsError = state => state.posts.error ; 

// export reducer actions : 
export const { addPost , addReaction  , increaseCount , decreaseCount } = postsSlice.actions 

// export selectors for posts : 
export const {
    selectAll : selectAllPosts , 
    selectById : selectPostById , 
    selectIds : selectPostIds 
} = postsAdapter.getSelectors ( state => state.posts ) ;

// select post by user Id ( memoized ) : 
export const selectPostsByUserId = createSelector ( 
    [ selectAllPosts , ( state , userId ) => userId ] , 
    ( posts , userId ) => posts.filter ( post => post.userId == userId )
)


//  export the posts slice reducer : 
export default postsSlice.reducer ;  