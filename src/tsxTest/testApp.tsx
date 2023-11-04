// testApp.tsx
import React from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'

console.log('Test App is running!')

const runTest = async () => {
  try {
    const renderedApp = renderToString(<App />)
    console.log(renderedApp)
  } catch (error) {
    // ハードウェアの接続やその他のエラーをキャッチする
    console.error('Failed to render the app:', error)
  }
}

runTest()
