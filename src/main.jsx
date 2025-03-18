import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {persistor} from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter } from 'react-router-dom'
import store from './store'

ReactDOM.createRoot(document.getElementById('root')).render(
 <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </PersistGate>
 </Provider>
)
