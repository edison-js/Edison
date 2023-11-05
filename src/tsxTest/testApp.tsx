// testApp.tsx

import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

const runTest = async () => {
  try {
    const renderedApp = renderToString(<App />)
    //console.log(renderedApp)
  } catch (error) {
    console.error('Failed to run the test app:', error)
  }
}

runTest()
