import { useSelector , useDispatch } from 'react-redux' ; 
import { selectAllPosts , fetchPosts , getFetchPostsStatus , getFetchPostsError } from './postsSlice' ; 
import { useEffect } from 'react';

import SinglePost from './SinglePost';


const PostsList = () => {

    const dispatch = useDispatch () ; 

    const fetchPostsStatus = useSelector ( getFetchPostsStatus ) ;
    const fetchPostsError = useSelector ( getFetchPostsError ) ; 

    // fetch all posts at application start : 
    useEffect ( 
        () => {
            if ( fetchPostsStatus === 'idle' ) {
                dispatch ( fetchPosts () ) ; 
            }
        } , 
        [ fetchPostsStatus , dispatch ]
    )
    

    //  retrieve posts initial state data from store : 
    const postsData = useSelector ( selectAllPosts ) ;  


    let content ; 

    if ( fetchPostsStatus == 'pending' ) {
        content = <p>Loading ...</p>
    }
    else if ( fetchPostsStatus == 'succeeded' ) {
        const orderedPosts = postsData.slice ().sort ( ( a , b ) => b.date.localeCompare ( a.date ) ) 
        content = orderedPosts.map ( post => <SinglePost key = { post.id } post = { post } /> );
    }
    else if ( fetchPostsStatus == 'failed' ) {
        content = <p>{ fetchPostsError }</p>
    }



    return (
        <section>
            <h2>Posts List</h2>
            { content  }
        </section>
    )
}

export default PostsList ; 