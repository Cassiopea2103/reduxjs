import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

import { Link } from "react-router-dom";

const PostAuthor = ( { userId }) => {

    // users data : 
    const users = useSelector ( selectAllUsers ) ; 

    // get the given post id author : 
    const postAuthor = users.find ( user => user.id == userId ) ; 

    return (
        <span>
            By { postAuthor ? <Link to={`/users/${ userId }`}>{postAuthor.name}</Link> : "Unknown User" }
        </span>
    )
}


export default PostAuthor ; 