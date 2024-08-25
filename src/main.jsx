import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { store } from './app/store' ; 
import { fetchUsers } from './features/users/usersSlice' ; 

// fetch users right when app loads :
store.dispatch ( fetchUsers () ) ; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Provider store = { store } >
          <App />
      </Provider>
  </StrictMode>,
)
