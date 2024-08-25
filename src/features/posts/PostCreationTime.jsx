import { parseISO , formatDistanceToNow  } from 'date-fns' ; 

const PostCreationTime = ( { postDate } ) => {

    let timeAgo = '' ; 

    if ( postDate ) {
        timeAgo = formatDistanceToNow ( parseISO ( postDate ) ) ; 
    }

    return  <span title='timestamp'>
                <i> { timeAgo } ago</i>
            </span>
}

export default PostCreationTime ; 