import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'
import Router from './pages'
import { setAuthToken } from './api/instance'
import { setAuth } from './store/slices/authSlice'

const token = localStorage.getItem('authToken');
if (token) {
  setAuthToken(token);
  store.dispatch(setAuth(token));
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </StrictMode>,
)