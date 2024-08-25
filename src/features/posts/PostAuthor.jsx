import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";

const PostAuthor = ( { userId }) => {

    // users data : 
    const users = useSelector ( selectAllUsers ) ; 

    // get the given post id author : 
    const postAuthor = users.find ( user => user.id == userId ) ; 

    return (
        <span>By { postAuthor ? postAuthor.name : "Unknown User" }</span>
    )
}


export default PostAuthor ; 