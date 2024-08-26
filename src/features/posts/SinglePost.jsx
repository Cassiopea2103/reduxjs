import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons' ; 
import PostCreationTime from './PostCreationTime';

import { Link } from 'react-router-dom';


const SinglePost = ( { post } ) => {
    

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