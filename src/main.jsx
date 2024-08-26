import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './app/store' ; 
import { fetchUsers } from './features/users/usersSlice' ; 

import { BrowserRouter , Routes , Route } from 'react-router-dom' ; 
import { fetchPosts } from './features/posts/postsSlice.js'

// fetch users right when app loads :
store.dispatch ( fetchUsers () ) ; 
store.dispatch ( fetchPosts () ) ; 


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store = { store } >
          <BrowserRouter>
              <Routes>
                  <Route path = '/*' element = { <App /> } />
              </Routes>
          </BrowserRouter>
      </Provider>
  </StrictMode>,
)
