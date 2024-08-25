import { useDispatch } from 'react-redux' ; 
import { addReaction } from './postsSlice';

const ReactionButtons = ( { post } ) => {

    const dispatch = useDispatch () ; 

    // reaction item : 
    const reaction ={
                        like : '👍' , 
                        love : '❤️' , 
                        funny : '😂' , 
                        insightful : '💡', 
                        congrats : '👏'
                    }

    
    return (
        <div>
            {
                Object.entries ( reaction ).map ( ( [ reactionName , reactionEmoji ] ) => {
                    return (
                        <button
                            key = { reactionName }
                            type='button'
                            className='reactionButton'
                            onClick = { () => dispatch ( addReaction ( { postId : post.id , reactionName : reactionName } ) ) }
                        >   
                            { reactionEmoji } { post.reactions[ reactionName ]}
                        </button>
                    )
                })
            }
        </div>
    ) 
}


export default ReactionButtons ; 