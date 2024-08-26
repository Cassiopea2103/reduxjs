import { Link } from "react-router-dom";

import { useSelector , useDispatch } from "react-redux";
import { increaseCount, getCount } from "../features/posts/postsSlice";

const Header = () => {
    const dispatch = useDispatch () ;

    const count = useSelector ( state => getCount ( state ) ) ;
    return ( 
        <header className="Header">
            <Link to={'/'} style={{textDecoration : 'none' , color : 'white' }}><h1>Redux Blog</h1></Link>

            <nav>
                <ul>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/post/new'}>New Post</Link></li>
                    <li><Link to={'/users'}>Users</Link></li>
                    <button onClick={() => dispatch ( increaseCount () )}>{ count }</button>
                </ul>
            </nav>
        </header>
    )
}

export default Header ; 