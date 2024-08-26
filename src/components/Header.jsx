import { Link } from "react-router-dom";

const Header = () => {
    return ( 
        <header className="Header">
            <Link to={'/'} style={{textDecoration : 'none' , color : 'white' }}><h1>Redux Blog</h1></Link>

            <nav>
                <ul>
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/post/new'}>New Post</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header ; 