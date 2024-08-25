import PostsList from './features/posts/PostsList' ; 
import NewPostForm from './features/posts/NewPostForm';

const App = () => {
    
    return (
        <main className = "App" >
            <NewPostForm />
            <PostsList />
        </main>
    )
}

export default App ; 