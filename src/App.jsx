import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home'
import RootLayout from './pages/Root'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import FAQ from './pages/FAQ'
import Communities from './pages/Communities'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children:
      [
        { path: '/', element: <HomePage /> },
        { path: '/communities', element: <Communities /> },
        { path: '/contact', element: <Contact /> },
        { path: '/faq', element: <FAQ /> },
        { path: '*', element: <NotFound /> },
      ]
  }
]);
function App()
{
  return <RouterProvider router={router} />
}

export default App
