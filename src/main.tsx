import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './routes/Root';
import Hero from './components/shared/Hero';
import Checkout from './components/shared/Checkout';
import SignInPage from './routes/sign-in';
import SignUpPage from './routes/sign-up';
import ErrorPage from './error-page';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
        loader: function loader({ request }) {
          const url = new URL(request.url);
          const type = url.searchParams.get("type");
          return { type };
        },        
      },
      { path: "/sign-in/*", element: <SignInPage /> },
      { path: "/sign-up/*", element: <SignUpPage /> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)