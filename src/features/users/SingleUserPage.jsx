import { useSelector } from 'react-redux' ; 
import { selectUserById } from './usersSlice' ; 
import { selectPostsByUserId } from '../posts/postsSlice' ; 

import { Link , useParams } from 'react-router-dom' ; 

const SingleUserPage = () => {

    // retrieve ID from request params : 
    const { userId } = useParams () ; 
    // find user with given id : 
    const foundUser = useSelector ( state => selectUserById ( state ,userId ) ) ; 

    // retrieve posts of the user : 
    const userPosts = useSelector ( state => selectPostsByUserId ( state , userId ) ) ; 

    // render post title : 
    const postTitles = userPosts.map (
        post => (
            <li key = { post.id } >
                <Link to = {`/post/${post.id}`}> { post.title } </Link>
            </li>
        )
    )


    return (
        <section>
            <h2>{foundUser?.name}</h2>
            <ol>{ postTitles }</ol>
        </section>
    )
}

export default SingleUserPage ; 