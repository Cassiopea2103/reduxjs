import { useSelector } from "react-redux";
import { selectPostById  , selectAllPosts} from "./postsSlice";

import { useParams } from "react-router-dom";

import PostAuthor from "./PostAuthor" ; 
import PostCreationTime from "./PostCreationTime" ; 
import ReactionButtons from "./ReactionButtons" ; 

const SinglePostPage = () => {

    // retrieve post id from request params : 
    const { postId } = useParams () ; 

    // retrieve the given ID post : 
    const foundPost = useSelector ( state => selectPostById ( state ,  postId ) ) ; 
    
    // return a post not found content if foundPost does not exist : 
    if ( !foundPost ) {
        return ( 
            <section>
                <h2>Post not found !</h2>
            </section>
        )
    }

    // otherwise , return the single post content : 
    return (
        <article>
            <h2> { foundPost.title } </h2>
            <p> { foundPost.body } </p>
            <p className = "postCredit" >
                <PostAuthor userId = { foundPost.userId } />
                <PostCreationTime postDate = { foundPost.date } />
            </p>
            <ReactionButtons post = { foundPost } />
        </article>
    )
}


export default SinglePostPage ; 