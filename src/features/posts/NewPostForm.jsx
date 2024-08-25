import { useState } from 'react' ; 
import { useDispatch } from 'react-redux' ; 
import { addPost } from './postsSlice';

import { useSelector } from 'react-redux';
import { selectAllUsers } from '../users/usersSlice' ; 


const NewPostForm = () => {

    // users data : 
    const usersData = useSelector ( selectAllUsers ) ; 

    const dispatch = useDispatch () ; 

    const [ userId , setUserId ] = useState ( '' ) ; 
    const [ title , setTitle ] = useState ( '' ) ; 
    const [ body , setBody ] = useState ( '' ) ; 

    const onUserIdChange = e => setUserId ( e.target.value ) ; 
    const onTitleChange = e => setTitle ( e.target.value ) ; 
    const onBodyChange = e => setBody ( e.target.value ) ;

    const onCreatePostClick = () => {

        // check form data : 
        if ( title && body ) {
            // create a new post : 
            dispatch ( addPost ( userId , title , body ) ) ; 


            // reset title and body states : 
            setUserId ( '' ) ; 
            setTitle ( '' ) ; 
            setBody ( '' ) ; 
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

    const canSave = Boolean ( title ) && Boolean ( body ) && Boolean ( userId ) ; 

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