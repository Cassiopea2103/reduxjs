import { useSelector } from 'react-redux' ; 
import { selectAllPosts } from './postsSlice' ; 


const PostsList = () => {

    //  retrieve posts initial state data from store : 
    const postsData = useSelector ( selectAllPosts ) ; 
    console.log ( postsData ) ; 

    // rendered posts component  : 
    const renderedPosts = postsData.map ( 
        ( post ) => {
            return ( 
                <article key = { post.id } >
                    <h3> { post.title } </h3>
                    <p> { post.content } </p>
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