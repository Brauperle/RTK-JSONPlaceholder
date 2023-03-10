import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import './main.css'

import { store } from './store'

import App from './components/App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
