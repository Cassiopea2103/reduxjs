import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons' ; 
import PostCreationTime from './PostCreationTime';
import { selectPostById } from './postsSlice';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const SinglePost = ( { postId } ) => {

    const post = useSelector ( state => selectPostById ( state , postId ) ) ; 
    

    return ( 
        <article>
            <h3> { post.title } </h3>
            <p className='postExcerpt'> { post.body.substring ( 0 , 50 ) }... </p>
            <p className='postCredit'>
                <Link to={`post/${ post.id }`} >View Post</Link>
                <PostAuthor userId = { post.userId } />
                <PostCreationTime postDate = { post.date } />
            </p>
            <ReactionButtons post = { post } />
        </article>
    )
}

export default SinglePost ; 