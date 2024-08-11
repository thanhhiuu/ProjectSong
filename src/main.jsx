import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import reduxConfig from './redux.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  Banner,
  Home,
  Login,
  Playlist,
  Public,
  Radio,
  WeekChart,
} from './pages/public';
import ErrorPages from './error-pages.jsx';
import path from './ultil/path.js';
import { PersistGate } from 'redux-persist/integration/react';

const { persistor, store } = reduxConfig();

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    errorElement: <ErrorPages />,
  },
  {
    path: path.PUBLIC,
    element: <Public />,
    children: [
      { index: true, element: <Home /> },
      { path: path.HOME, element: <Home /> },
      { path: path.HOME, element: <Home /> },
      { path: path.PLAYLIST__TITLE_PID, element: <Playlist /> },
      { path: path.MY_MUSIC, element: <Banner /> },
      { path: path.CHILL__TITLE_PID, element: <Playlist /> },
      { path: path.WEEKCHART_TITLE_PID, element: <WeekChart /> },
      { path: path.RADIO_TITLE_PID, element: <Radio /> },

      {
        path: path.LOGIN,
        element: <Login />,
        errorElement: <ErrorPages />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
