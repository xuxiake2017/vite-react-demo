import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
} from "react-router-dom";
import { Provider } from 'react-redux'

import App from './App'
import './index.less'
import store from './store'

const main = async () => {
  const root = ReactDOM.createRoot(document.getElementById('root')!)
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  )
}
main()
