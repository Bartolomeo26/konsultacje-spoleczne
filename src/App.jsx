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
import Test1 from './pages/Test1'
import Authentication from './pages/Authentication'
import UserProfile from './pages/UserProfile'
import { getToken } from './util/auth'
import ConfirmedMail from './pages/ConfirmedMail'
import { AuthProvider } from './util/AuthContext'
import NewCommunity from './pages/NewCommunity'
import EditCommunity from './pages/EditCommunity'

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    id: 'root',
    loader: getToken,
    children:
      [
        { path: '/', element: <HomePage /> },
        { path: '/signup', element: <Authentication /> },
        { path: '/signup/email-confirmed', element: <ConfirmedMail /> },
        { path: '/users/:id', element: <UserProfile /> },
        { path: '/test', element: <Test1 /> },
        { path: '/communities', element: <Communities /> },
        { path: '/communities/new', element: <NewCommunity /> },
        { path: '/communities/:id', element: <CommunityDetails /> },
        { path: '/communities/:id/edit', element: <EditCommunity /> },
        { path: '/communities/:id/:topic', element: <CommunityDetails /> },
        { path: '/communities/:id/consultations/:id', element: <DiscussionDetails /> },
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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>);
}

export default App
