import { useState } from 'react' ; 
import { useDispatch } from 'react-redux' ; 
import { createPost } from './postsSlice';

import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice' ; 

import { useNavigate } from "react-router-dom";



const NewPostForm = () => {

    const navigate = useNavigate () ; 

    // users data : 
    const usersData = useSelector ( selectAllUsers ) ; 

    const dispatch = useDispatch () ; 

    const [ userId , setUserId ] = useState ( '' ) ; 
    const [ title , setTitle ] = useState ( '' ) ; 
    const [ body , setBody ] = useState ( '' ) ; 
    const [ status , setStatus ] = useState ( 'idle' ) ; 

    const onUserIdChange = e => setUserId ( e.target.value ) ; 
    const onTitleChange = e => setTitle ( e.target.value ) ; 
    const onBodyChange = e => setBody ( e.target.value ) ;

    const canSave =  [ title , body , userId ].every ( Boolean ) &&  status === 'idle' ; 

    const onCreatePostClick = () => {

        // check form data : 
        if ( canSave ) {
            try {
                // change request status : 
                setStatus ( 'pending' ) ; 
                // create a new post : 
                dispatch ( createPost ( {userId , title , body} ) ).unwrap() ; 


                // reset title and body states : 
                setUserId ( '' ) ; 
                setTitle ( '' ) ; 
                setBody ( '' ) ; 

                // back to home page : 
                navigate ( '/' ) ;
            }

            catch ( error ) {
                console.log ( error.message ) 
            }
            finally {
                setStatus ( 'idle' ) ; 
            }
        }
    } 

    // user options : 
    const userOptions = usersData.map ( 
        ( user ) => {
            return ( 
                <option key = { user.id } value={user.id}>
                    { user.name }
                </option>
            )
        }
    )

    return ( 
        <section>

            <h2>Create New Post</h2> 

            <form action="">

                <label htmlFor="postAuthor">User ID : </label>
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
                    onClick={ onCreatePostClick }
                >
                    Create Post
                </button>
            </form>
        </section>
    )
}

export default NewPostForm ; 