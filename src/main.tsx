import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import './index.css'
import Router from './pages'
import { setAuthToken } from './api/instance'
import { setAuth } from './store/slices/authSlice'
import { setupAuthInterceptor } from './api/instance/authInterceptor'  // 이 줄을 추가

setupAuthInterceptor();

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
