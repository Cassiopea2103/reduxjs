import { Routes , Route } from 'react-router-dom' ; 

import Layout from './components/Layout'

import PostsList from './features/posts/PostsList' ; 
import SinglePostPage from './features/posts/SinglePostPage' ; 
import NewPostForm from './features/posts/NewPostForm';

const App = () => {
    
    return (
        <Routes>
            <Route path = '/' element = { <Layout/> } >

                <Route index element = { <PostsList/> } />

                <Route path = 'post'>
                    <Route path = ':postId' element = { <SinglePostPage /> } />
                    <Route path = 'new' element = { <NewPostForm /> } />
                </Route>
            </Route>
        </Routes>
    )
}

export default App ; 