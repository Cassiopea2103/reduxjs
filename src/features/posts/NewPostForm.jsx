import { useState } from 'react' ; 
import { useDispatch } from 'react-redux' ; 
import { addPost } from './postsSlice';
import { nanoid } from '@reduxjs/toolkit' ;

const NewPostForm = () => {

    const dispatch = useDispatch () ; 

    const [ title , setTitle ] = useState ( '' ) ; 
    const [ body , setBody ] = useState ( '' ) ; 

    const onTitleChange = e => setTitle ( e.target.value ) ; 
    const onBodyChange = e => setBody ( e.target.value ) ;
    const onCreatePostClick = () => {

        // check form data : 
        if ( title && body ) {
            // create a new post : 
            dispatch ( addPost ( title , body ) ) ; 


            // reset title and body states : 
            setTitle ( '' ) ; 
            setBody ( '' ) ; 
        }
    } 

    return ( 
        <section>

            <h2>Create New Post</h2> 

            <form action="">
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
                    onClick={ onCreatePostClick }
                >Create Post</button>
            </form>
        </section>
    )
}

export default NewPostForm ; 