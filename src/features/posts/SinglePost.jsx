import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons' ; 
import PostCreationTime from './PostCreationTime';


const SinglePost = ( { post } ) => {
    

    return ( 
        <article key = { post.id } >
            <h3> { post.title } </h3>
            <p> { post.body.substring ( 0 , 100 ) } </p>
            <p className='postCredit'>
                <PostAuthor userId = { post.userId } />
            </p>
            <PostCreationTime postDate = { post.date } />
            <ReactionButtons post = { post } />
        </article>
    )
}

export default SinglePost ; 