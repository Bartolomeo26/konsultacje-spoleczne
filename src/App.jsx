import { useState, useEffect } from 'react'
import axios, { AxiosHeaders } from 'axios'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home'
import RootLayout from './pages/Root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children:
      [
        { path: '/', element: <HomePage /> },
      ]
  }
]);
function App()
{
  return <RouterProvider router={router} />
}

export default App
