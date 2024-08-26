import { Routes , Route , Navigate } from 'react-router-dom' ; 

import Layout from './components/Layout'

import PostsList from './features/posts/PostsList' ; 
import SinglePostPage from './features/posts/SinglePostPage' ; 
import NewPostForm from './features/posts/NewPostForm';
import EditDeletePost from './features/posts/EditDeletePost';

import UsersList from './features/users/UsersList' ; 
import SingleUserPage from './features/users/SingleUserPage';

const App = () => {
    
    return (
        <Routes>
            <Route path = '/' element = { <Layout/> } >

                <Route index element = { <PostsList/> } />

                <Route path = 'post'>
                    <Route path = ':postId' >
                        <Route index element = { <SinglePostPage /> } />
                        <Route path = 'edit' element = { <EditDeletePost /> } />
                    </Route>
                    <Route path = 'new' element = { <NewPostForm /> } />
                </Route>

                <Route path = '/users'>
                    <Route index element = { <UsersList/> } /> 
                    <Route path = ':userId' element = { <SingleUserPage /> } />
                </Route>

                {/* Redirection to homepage -  */}
                <Route path = '*' element = { <Navigate to={'/'} replace /> } />
            </Route>
        </Routes>
    )
}

export default App ; 