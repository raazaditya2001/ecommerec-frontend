import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx';
import { Provider } from 'react-redux';
import store from "./Redux/store.js"
import "./Styles/global.css"


createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
    <AuthProvider>
       <App />
    </AuthProvider>
  </Provider>
)
