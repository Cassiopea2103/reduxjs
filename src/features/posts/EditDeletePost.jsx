import { useState } from "react";

import { useParams , useNavigate } from "react-router-dom";

import { useSelector , useDispatch } from "react-redux";
import { selectPostById ,  updatePost , deletePost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";


const EditDeletePost = () => {

    // retrieve post id from request params : 
    const { postId } = useParams () ; 
    const navigate = useNavigate () ; 
    const dispatch = useDispatch () ; 

    // find the given id post : 
    const foundPost = useSelector ( state => selectPostById (state , postId ) ) ; 
    // retrive users list : 
    const users = useSelector ( state => selectAllUsers ( state ) ) ; 


    // temporary state vars : 
    const [ userId , setUserId ] = useState ( foundPost.userId ) ; 
    const [ title , setTitle ] = useState ( foundPost.title ) ; 
    const [ body , setBody ] = useState ( foundPost.body ) ;
    const [ requestStatus , setRequestStatus ] = useState ( 'idle' ) ; 

    // handle events changes : 
    const onUserIdChange = e => setUserId ( e.target.value ) ; 
    const onTitleChange = e => setTitle ( e.target.value ) ; 
    const onBodyChange = e => setBody ( e.target.value ) ; 

    // condition to save the form : 
    const canSave = [ userId , title , body ].every ( Boolean ) && requestStatus === 'idle' ; 
    
    // function to update the post : 
    const onUpdatePostClicked = async () => {
        if ( canSave ) {
            try {
                // change request status : 
                setRequestStatus ( 'pending' ) ;
                // dispatch post update : 
                dispatch ( 
                    updatePost ( 
                        { id : postId , title , body , userId , reactions : foundPost.reactions}
                    )
                ).unwrap () ; 

                // reset states : 
                setTitle ( '' ) ; 
                setBody ( '' ) ; 
                setUserId ( '' ) ; 

                // navigate back to single post page : 
                navigate ( `/post/${ postId }` ) ;  
            }
            catch ( error ) {
                console.log ( error ) ; 
            }
            finally {
                setRequestStatus ( 'idle' ) ; 
            }
        }
    }

    // function to delete the post : 
    const onDeletePostClicked = () => {
        try {
            // change request status : 
            setRequestStatus ( 'pending' ) ;
            // dispatch post update : 
            dispatch ( deletePost ( {  id : postId }) ).unwrap () ; 

            // reset states : 
            setTitle ( '' ) ; 
            setBody ( '' ) ; 
            setUserId ( '' ) ; 

            // navigate back to posts list page : 
            navigate ( '/' ) ;  
        }
        catch ( error ) {
            console.log ( error ) ; 
        }
        finally {
            setRequestStatus ( 'idle' ) ; 
        }
    }

    // return a post not found message if foundPost does not exist : 
    if ( !foundPost ) {
        return <h1>Post not found !</h1>
    }

    // user options : 
    const userOptions = users.map ( 
        ( user ) => <option key = { user.id } value = { user.id }>
                        { user.name }
                    </option>
    )

    return (
        <section>
            <h2>Edit-Delete Post</h2> 

            <form>

                <label htmlFor="postAuthor">Author : </label>
                <select 
                    required 
                    name="userId" 
                    id="postAuthor" 
                    value={userId} 
                    onChange = { onUserIdChange }
                >
                    <option value="">Select post author</option>
                    { userOptions } 
                </select>

                <label htmlFor="postTitle">Post Title : </label>
                <input
                    type = "text" 
                    required 
                    id = "postTitle"
                    value = { title } 
                    onChange = { onTitleChange }
                />

                <label htmlFor="postBody">Post Body : </label>
                <textarea
                    type = "text" 
                    id = "postBody"
                    value = { body } 
                    onChange = { onBodyChange }
                />

                <button
                    disabled = { !canSave }
                    onClick={ onUpdatePostClicked }
                >
                    Save Post
                </button>
                <button
                    className="deleteButton"
                    onClick={ onDeletePostClicked }
                >
                    Delete Post
                </button>
            </form>
        </section>
    )

}

export default EditDeletePost ; 