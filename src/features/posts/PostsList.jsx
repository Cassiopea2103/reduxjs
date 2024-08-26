import { useSelector , useDispatch } from 'react-redux' ; 
import { selectAllPosts , fetchPosts , getFetchPostsStatus , getFetchPostsError , selectPostIds } from './postsSlice' ; 
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
    const postsIds = useSelector ( selectPostIds ) ;   


    let content ; 

    if ( fetchPostsStatus == 'pending' ) {
        content = <p>Loading ...</p>
    }
    else if ( fetchPostsStatus == 'succeeded' ) {
        content = postsIds.map ( postId => <SinglePost key = { postId } postId = { postId } />)
         
    }
    else if ( fetchPostsStatus == 'failed' ) {
        content = <p>{ fetchPostsError }</p>
    }



    return (
        <section>
            { content  }
        </section>
    )
}

export default PostsList ; 