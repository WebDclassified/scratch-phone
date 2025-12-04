import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { Provider } from "react-redux";
import { cardFeature } from './feature/cardFeature.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider cardFeature= {cardFeature} >
      <App />
    </Provider>
  </StrictMode>,
)
