import { useSelector } from 'react-redux' ; 
import { selectAllPosts } from './postsSlice' ; 

import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons' ; 
import PostCreationTime from './PostCreationTime';


const PostsList = () => {

    //  retrieve posts initial state data from store : 
    const postsData = useSelector ( selectAllPosts ).slice ().sort ( ( a , b ) => b.date.localeCompare ( a.date )) ; 

    // rendered posts component  : 
    const renderedPosts = postsData.map ( 
        ( post ) => {
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
    )

    return (
        <section>
            <h2>Posts</h2>
            { renderedPosts }
        </section>
    )
}

export default PostsList ; 