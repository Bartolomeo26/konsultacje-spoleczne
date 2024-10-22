import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import HomePage from './pages/Home'
import RootLayout from './pages/Root'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import FAQ from './pages/FAQ'
import Communities from './pages/Communities'
import CommunityDetails from './pages/CommunityDetails'
import InformationClause from './pages/InformationClause'
import Rules from './pages/Rules'
import DiscussionDetails from './pages/DiscussionDetails'
import Test from './pages/Test'
import Test1 from './pages/Test1'
import Authentication from './pages/Authentication'
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children:
      [
        { path: '/', element: <HomePage /> },
        { path: '/signup', element: <Authentication /> },
        { path: '/test', element: <Test1 /> },
        { path: '/communities', element: <Communities /> },
        { path: '/communities/:id', element: <CommunityDetails /> },
        { path: '/communities/:id/:topic', element: <CommunityDetails /> },
        { path: '/communities/:id/discussions/:id', element: <DiscussionDetails /> },
        { path: '/contact', element: <Contact /> },
        { path: '/information-clause', element: <InformationClause /> },
        { path: '/rules', element: <Rules /> },
        { path: '/faq', element: <FAQ /> },
        { path: '*', element: <NotFound /> },
      ]
  }
]);
function App()
{
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>);
}

export default App
